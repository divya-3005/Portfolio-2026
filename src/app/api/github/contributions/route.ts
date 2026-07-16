import { NextResponse } from 'next/server';

export const revalidate = 21600; // 6 hour cache

const GITHUB_USERNAME = 'divya-3005';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

export async function GET() {
  try {
    // Fetch contribution data from GitHub events API
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'divya-portfolio',
    };
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    // Fetch multiple pages of events to build contribution data
    const allEvents: any[] = [];
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100&page=${page}`,
        { headers, next: { revalidate: 21600 } }
      );
      if (!res.ok) break;
      const events = await res.json();
      if (events.length === 0) break;
      allEvents.push(...events);
    }

    // Build contribution heatmap from events
    const contributionMap: Record<string, number> = {};
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    // Initialize all days in the past year with 0
    for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
      contributionMap[d.toISOString().split('T')[0]] = 0;
    }

    // Count push events and other contribution-like events
    const contributionEvents = ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'PullRequestReviewEvent'];
    allEvents.forEach((event: any) => {
      if (contributionEvents.includes(event.type)) {
        const date = event.created_at.split('T')[0];
        if (contributionMap[date] !== undefined) {
          if (event.type === 'PushEvent') {
            contributionMap[date] += event.payload?.commits?.length || 1;
          } else {
            contributionMap[date] += 1;
          }
        }
      }
    });

    // Convert to array format for the heatmap
    const contributions = Object.entries(contributionMap).map(([date, count]) => ({
      date,
      count,
    }));

    const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0);

    return NextResponse.json({
      contributions,
      totalContributions,
      startDate: oneYearAgo.toISOString().split('T')[0],
      endDate: now.toISOString().split('T')[0],
    });
  } catch (error: any) {
    console.error('GitHub Contributions Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributions', message: error.message },
      { status: 500 }
    );
  }
}
