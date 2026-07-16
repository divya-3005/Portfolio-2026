import { NextResponse } from 'next/server';

export const revalidate = 3600; // 1 hour cache

const LEETCODE_USERNAME = 'divya_singh22';

// Static fallback data from resume
const FALLBACK_DATA = {
  totalSolved: 500,
  easySolved: 200,
  mediumSolved: 220,
  hardSolved: 80,
  totalQuestions: 3400,
  easyTotal: 850,
  mediumTotal: 1775,
  hardTotal: 775,
  acceptanceRate: 65.2,
  ranking: 150000,
  isLive: false,
};

export async function GET() {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `;

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn('LeetCode API returned non-OK status, using fallback');
      return NextResponse.json(FALLBACK_DATA);
    }

    const data = await res.json();

    if (!data.data?.matchedUser) {
      console.warn('LeetCode user not found, using fallback');
      return NextResponse.json(FALLBACK_DATA);
    }

    const stats = data.data.matchedUser.submitStatsGlobal.acSubmissionNum;
    const allQuestions = data.data.allQuestionsCount;
    const ranking = data.data.matchedUser.profile.ranking;

    const getCount = (arr: any[], diff: string) =>
      arr.find((s: any) => s.difficulty === diff)?.count || 0;

    return NextResponse.json({
      totalSolved: getCount(stats, 'All'),
      easySolved: getCount(stats, 'Easy'),
      mediumSolved: getCount(stats, 'Medium'),
      hardSolved: getCount(stats, 'Hard'),
      totalQuestions: getCount(allQuestions, 'All'),
      easyTotal: getCount(allQuestions, 'Easy'),
      mediumTotal: getCount(allQuestions, 'Medium'),
      hardTotal: getCount(allQuestions, 'Hard'),
      acceptanceRate: 0, // Not directly available from this query
      ranking,
      isLive: true,
    });
  } catch (error: any) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json(FALLBACK_DATA);
  }
}
