'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';

type Tab = 'leetcode' | 'codeforces' | 'codechef';

interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  ranking: number;
  isLive: boolean;
}

interface CodeforcesData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contestCount: number;
  ratingHistory: { contestName: string; newRating: number; oldRating: number; date: string; rank: number }[];
  isLive: boolean;
}

const LC_COLORS = {
  Easy: '#06d6a0',
  Medium: '#f59e0b',
  Hard: '#ef4444',
};

function getRankColor(rank: string) {
  const map: Record<string, string> = {
    newbie: '#808080',
    pupil: '#008000',
    specialist: '#03a89e',
    expert: '#0000ff',
    'candidate master': '#aa00aa',
    master: '#ff8c00',
    'international master': '#ff8c00',
    grandmaster: '#ff0000',
    'international grandmaster': '#ff0000',
    'legendary grandmaster': '#ff0000',
  };
  return map[rank.toLowerCase()] || '#808080';
}

export default function CompetitiveProgramming() {
  const [activeTab, setActiveTab] = useState<Tab>('leetcode');
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [cfData, setCfData] = useState<CodeforcesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [lcRes, cfRes] = await Promise.allSettled([
        fetch('/api/leetcode').then(r => r.json()),
        fetch('/api/codeforces').then(r => r.json()),
      ]);
      if (lcRes.status === 'fulfilled') setLcData(lcRes.value);
      if (cfRes.status === 'fulfilled') setCfData(cfRes.value);
      setLoading(false);
    }
    fetchData();
  }, []);

  const tabs: { key: Tab; label: string; color: string }[] = [
    { key: 'leetcode', label: 'LeetCode', color: '#f59e0b' },
    { key: 'codeforces', label: 'Codeforces', color: '#3b82f6' },
    { key: 'codechef', label: 'CodeChef', color: '#ec4899' },
  ];

  return (
    <section id="competitive" className="relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 mb-20"
        >
          <div className="border-b border-[var(--border-subtle)] pb-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              <span className="gradient-text">Competitive Programming</span>
            </h2>
          </div>
          
          <p className="text-[var(--text-secondary)] text-lg font-medium">
            500+ problems solved across platforms — live stats
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-4" style={{ marginBottom: '3rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
                activeTab === tab.key
                  ? 'text-white shadow-xl scale-105'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:scale-105'
              }`}
              style={
                activeTab === tab.key
                  ? { backgroundColor: tab.color, padding: '0.75rem 2rem' }
                  : { padding: '0.75rem 2rem' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl"
          style={{ padding: '3rem', marginTop: '2rem' }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="skeleton h-48 w-48 rounded-full" />
            </div>
          ) : activeTab === 'leetcode' && lcData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Donut chart */}
              <div className="flex justify-center">
                <div className="relative w-56 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Easy', value: lcData.easySolved },
                          { name: 'Medium', value: lcData.mediumSolved },
                          { name: 'Hard', value: lcData.hardSolved },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                      >
                        {Object.entries(LC_COLORS).map(([key, color]) => (
                          <Cell key={key} fill={color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[var(--text-primary)]">{lcData.totalSolved}</span>
                    <span className="text-xs text-[var(--text-muted)]">Solved</span>
                  </div>
                </div>
              </div>
              {/* Stats breakdown */}
              <div className="space-y-4">
                {[
                  { label: 'Easy', solved: lcData.easySolved, total: lcData.easyTotal, color: LC_COLORS.Easy },
                  { label: 'Medium', solved: lcData.mediumSolved, total: lcData.mediumTotal, color: LC_COLORS.Medium },
                  { label: 'Hard', solved: lcData.hardSolved, total: lcData.hardTotal, color: LC_COLORS.Hard },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: item.color }} className="font-medium">{item.label}</span>
                      <span className="text-[var(--text-muted)]">{item.solved} / {item.total}</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${(item.solved / item.total) * 100}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
                {lcData.ranking > 0 && (
                  <p className="text-sm text-[var(--text-muted)] mt-4">
                    Global Ranking: <span className="text-[var(--text-primary)] font-semibold">#{lcData.ranking.toLocaleString()}</span>
                  </p>
                )}
                {!lcData.isLive && (
                  <p className="text-xs text-[var(--text-muted)] italic mt-2">
                    ⓘ Showing cached data — LeetCode API may be rate-limited
                  </p>
                )}
              </div>
            </div>
          ) : activeTab === 'codeforces' && cfData ? (
            <div className="space-y-6">
              {/* Rating info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-[var(--border-subtle)]">
                <div>
                  <p className="text-sm font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Current</p>
                  <p className="text-5xl font-black tracking-tighter" style={{ color: getRankColor(cfData.rank) }}>
                    {cfData.rating}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Max Rating</p>
                  <p className="text-3xl font-bold text-[var(--text-primary)] mt-3">{cfData.maxRating}</p>
                </div>
                <div>
                  <p className="text-sm font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Rank</p>
                  <p className="text-xl font-bold capitalize mt-4" style={{ color: getRankColor(cfData.rank) }}>
                    {cfData.rank}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Contests</p>
                  <p className="text-3xl font-bold text-[var(--text-primary)] mt-3">{cfData.contestCount}</p>
                </div>
              </div>

              {/* Rating chart */}
              {cfData.ratingHistory.length > 0 && (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cfData.ratingHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                        stroke="var(--border-subtle)"
                      />
                      <YAxis
                        tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                        stroke="var(--border-subtle)"
                        domain={[0, 'auto']}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '12px',
                        }}
                        formatter={(value) => [String(value), 'Rating']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="newRating"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: 'var(--bg-secondary)' }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          ) : activeTab === 'codechef' ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <p className="text-sm text-[var(--text-muted)] mb-1">Current Rating</p>
                  <p className="text-4xl font-bold text-[#1E7D22]">1503</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[var(--text-muted)] mb-1">Rank</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">2★ (Div 3)</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[var(--text-muted)] mb-1">Problems Solved</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">96</p>
                </div>
              </div>
              
              <a 
                href="https://www.codechef.com/users/easy_trust_71" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 px-6 py-2.5 rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--accent-pink)] hover:text-white transition-all text-sm font-medium border border-[var(--border-subtle)] hover:border-transparent flex items-center gap-2"
              >
                View Profile 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
