import { NextResponse } from 'next/server';

export const revalidate = 3600; // 1 hour cache

const CF_HANDLE = 'divyasingh22';

export async function GET() {
  try {
    // Fetch user info
    const infoRes = await fetch(
      `https://codeforces.com/api/user.info?handles=${CF_HANDLE}`,
      { next: { revalidate: 3600 } }
    );
    const infoData = await infoRes.json();

    // Fetch rating history
    const ratingRes = await fetch(
      `https://codeforces.com/api/user.rating?handle=${CF_HANDLE}`,
      { next: { revalidate: 3600 } }
    );
    const ratingData = await ratingRes.json();

    if (infoData.status !== 'OK') {
      throw new Error('Codeforces API error');
    }

    const user = infoData.result[0];
    const ratingHistory = ratingData.status === 'OK'
      ? ratingData.result.map((r: any) => ({
          contestName: r.contestName,
          rank: r.rank,
          oldRating: r.oldRating,
          newRating: r.newRating,
          date: new Date(r.ratingUpdateTimeSeconds * 1000).toISOString().split('T')[0],
        }))
      : [];

    return NextResponse.json({
      handle: user.handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || 'unrated',
      maxRank: user.maxRank || 'unrated',
      contribution: user.contribution || 0,
      friendOfCount: user.friendOfCount || 0,
      ratingHistory,
      contestCount: ratingHistory.length,
      isLive: true,
    });
  } catch (error: any) {
    console.error('Codeforces API Error:', error);
    // Fallback with verified data
    return NextResponse.json({
      handle: CF_HANDLE,
      rating: 1062,
      maxRating: 1062,
      rank: 'newbie',
      maxRank: 'newbie',
      contribution: 0,
      friendOfCount: 2,
      ratingHistory: [
        { contestName: 'Hello 2026', rank: 15032, oldRating: 0, newRating: 402, date: '2025-01-07' },
        { contestName: 'Codeforces Round 1108 (Div. 2)', rank: 1342, oldRating: 402, newRating: 867, date: '2026-07-11' },
        { contestName: 'Codeforces Round 1109 (Div. 3)', rank: 6775, oldRating: 867, newRating: 1062, date: '2026-07-13' },
      ],
      contestCount: 3,
      isLive: false,
    });
  }
}
