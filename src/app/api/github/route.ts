import { NextResponse } from 'next/server';

export const revalidate = 3600; // 1 hour cache

const GITHUB_USERNAME = 'divya-3005';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

async function githubFetch(url: string) {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'divya-portfolio',
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }
  const res = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function GET() {
  try {
    // Fetch all repos
    const repos = await githubFetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );

    // Filter and enrich repos
    const enrichedRepos = await Promise.all(
      repos
        .filter((repo: any) => repo.name !== GITHUB_USERNAME) // Skip profile README repo
        .map(async (repo: any) => {
          // Fetch language breakdown
          let languages = {};
          try {
            languages = await githubFetch(repo.languages_url);
          } catch {
            // Language fetch failed, use primary language only
          }

          return {
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            languages,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            openIssues: repo.open_issues_count,
            isFork: repo.fork,
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
            size: repo.size,
          };
        })
    );

    // Separate owned vs forked
    const owned = enrichedRepos.filter((r: any) => !r.isFork);
    const forked = enrichedRepos.filter((r: any) => r.isFork);

    // Fetch user profile
    const profile = await githubFetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`
    );

    return NextResponse.json({
      profile: {
        name: profile.name,
        avatar: profile.avatar_url,
        bio: profile.bio,
        publicRepos: profile.public_repos,
        followers: profile.followers,
        following: profile.following,
      },
      owned,
      forked,
      totalRepos: enrichedRepos.length,
    });
  } catch (error: any) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data', message: error.message },
      { status: 500 }
    );
  }
}
