'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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

  const tabs: { key: Tab; label: string; color: string; url: string }[] = [
    { key: 'leetcode', label: 'LeetCode', color: '#f59e0b', url: 'https://leetcode.com/divya_singh22' },
    { key: 'codeforces', label: 'Codeforces', color: '#3b82f6', url: 'https://codeforces.com/profile/divyasingh22' },
    { key: 'codechef', label: 'CodeChef', color: '#ec4899', url: 'https://www.codechef.com/users/easy_trust_71' },
  ];

  const currentTabInfo = tabs.find(t => t.key === activeTab)!;

  return (
    <section id="competitive" className="relative py-24 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <h2 className="text-sm font-mono text-[var(--text-muted)] tracking-widest uppercase mb-2">{`// 04`} &nbsp; Competitive Programming</h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed mt-6">
            Consistent practice across competitive platforms — reflecting strong algorithmic thinking and problem-solving under constraints.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center mb-8" style={{ gap: '1rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="text-sm font-bold tracking-wide transition-all duration-300 rounded-lg border"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === tab.key ? `${tab.color}15` : 'transparent',
                color: activeTab === tab.key ? tab.color : 'var(--text-muted)',
                borderColor: activeTab === tab.key ? tab.color : 'var(--border-subtle)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div 
          className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl relative overflow-hidden flex flex-col p-6 md:p-10"
          style={{ minHeight: '400px' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-grow"
            >
              {loading ? (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="skeleton h-48 w-48 rounded-full" />
                </div>
              ) : activeTab === 'leetcode' && lcData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="flex justify-center relative">
                    <div className="relative w-64 h-64">
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
                            innerRadius={75}
                            outerRadius={110}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                          >
                            {Object.entries(LC_COLORS).map(([key, color]) => (
                              <Cell key={key} fill={color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-4xl font-black text-[var(--text-primary)]">{lcData.totalSolved}</span>
                        <span className="text-sm text-[var(--text-muted)] font-mono tracking-widest uppercase mt-1">Solved</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-6">
                    {[
                      { label: 'Easy', solved: lcData.easySolved, total: lcData.easyTotal, color: LC_COLORS.Easy },
                      { label: 'Medium', solved: lcData.mediumSolved, total: lcData.mediumTotal, color: LC_COLORS.Medium },
                      { label: 'Hard', solved: lcData.hardSolved, total: lcData.hardTotal, color: LC_COLORS.Hard },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span style={{ color: item.color }} className="font-bold tracking-wide">{item.label}</span>
                          <span className="text-[var(--text-muted)] font-mono">{item.solved} <span className="opacity-40">/ {item.total}</span></span>
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
                      <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                        <p className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-widest">
                          Global Ranking
                        </p>
                        <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">
                          #{lcData.ranking.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : activeTab === 'codeforces' && cfData ? (
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-[var(--border-subtle)]">
                    <div>
                      <p className="text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Current</p>
                      <p className="text-4xl font-black tracking-tighter" style={{ color: getRankColor(cfData.rank) }}>
                        {cfData.rating}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Max Rating</p>
                      <p className="text-3xl font-bold text-[var(--text-primary)]">{cfData.maxRating}</p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Rank</p>
                      <p className="text-xl font-bold capitalize" style={{ color: getRankColor(cfData.rank) }}>
                        {cfData.rank}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[var(--text-muted)] mb-2 uppercase tracking-widest">Contests</p>
                      <p className="text-3xl font-bold text-[var(--text-primary)]">{cfData.contestCount}</p>
                    </div>
                  </div>

                  {cfData.ratingHistory.length > 0 && (
                    <div style={{ height: '280px', width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cfData.ratingHistory}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                          <XAxis
                            dataKey="date"
                            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                            stroke="var(--border-subtle)"
                            tickMargin={10}
                          />
                          <YAxis
                            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                            stroke="transparent"
                            domain={['dataMin - 100', 'dataMax + 100']}
                            width={40}
                          />
                          <Tooltip
                            contentStyle={{
                              background: 'var(--bg-tertiary)',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: '8px',
                              color: 'var(--text-primary)',
                              fontSize: '12px',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                            }}
                            itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                            formatter={(value) => [String(value), 'Rating']}
                            labelFormatter={(label) => `Date: ${label}`}
                          />
                          <Line
                            type="monotone"
                            dataKey="newRating"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: 'var(--bg-secondary)' }}
                            activeDot={{ r: 6, stroke: 'var(--bg-secondary)', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              ) : activeTab === 'codechef' ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                  <div className="flex flex-wrap items-center justify-center gap-12">
                    <div className="text-center">
                      <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-3">Current Rating</p>
                      <p className="text-5xl font-black text-[#1E7D22]">1503</p>
                    </div>
                    <div className="hidden md:block w-px h-16 bg-[var(--border-subtle)]" />
                    <div className="text-center">
                      <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-3">Rank</p>
                      <p className="text-3xl font-bold text-[var(--text-primary)]">2★ <span className="text-lg text-[var(--text-muted)] font-normal ml-1">(Div 3)</span></p>
                    </div>
                    <div className="hidden md:block w-px h-16 bg-[var(--border-subtle)]" />
                    <div className="text-center">
                      <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-3">Solved</p>
                      <p className="text-3xl font-bold text-[var(--text-primary)]">96</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          {/* Unified Footer Link */}
          {!loading && (
            <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex justify-end">
              <a 
                href={currentTabInfo.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-mono uppercase tracking-widest transition-colors"
                style={{ color: currentTabInfo.color }}
              >
                View {currentTabInfo.label} Profile
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
