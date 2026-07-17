import { NextResponse } from 'next/server';

export const revalidate = 21600; // 6 hour cache

const GITHUB_USERNAME = 'divya-3005';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

export async function GET() {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json({
        totalContributions: 190, // Fallback if no token is provided
        message: 'No GITHUB_TOKEN provided. Serving fallback data.'
      });
    }

    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`GitHub GraphQL API responded with status ${res.status}`);
    }

    const json = await res.json();
    
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    const total = json.data.user.contributionsCollection.contributionCalendar.totalContributions;

    return NextResponse.json({
      totalContributions: total,
    });
  } catch (error: any) {
    console.error('GitHub Contributions Error:', error);
    return NextResponse.json(
      { totalContributions: 190, error: 'Failed to fetch contributions', message: error.message },
      { status: 200 } // Return 200 with fallback so the UI doesn't break
    );
  }
}
