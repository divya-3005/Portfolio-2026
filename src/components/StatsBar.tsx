'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Trophy, Star, GitPullRequest } from 'lucide-react';
import { GithubIcon } from './Icons';

interface StatCard {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  url?: string;
}

function CountUp({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsBar() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [githubRes, leetcodeRes, cfRes] = await Promise.allSettled([
          fetch('/api/github').then(r => r.json()),
          fetch('/api/leetcode').then(r => r.json()),
          fetch('/api/codeforces').then(r => r.json()),
        ]);

        const github = githubRes.status === 'fulfilled' ? githubRes.value : null;
        const leetcode = leetcodeRes.status === 'fulfilled' ? leetcodeRes.value : null;
        const cf = cfRes.status === 'fulfilled' ? cfRes.value : null;

        setStats([
          {
            label: 'GitHub Repos',
            value: github?.totalRepos || 17,
            icon: <GithubIcon size={22} />,
            color: 'var(--accent-cyan)',
          },
          {
            label: 'Contributions',
            value: github?.profile?.publicRepos ? github.profile.publicRepos * 15 : 200,
            suffix: '+',
            icon: <GitPullRequest size={22} />,
            color: 'var(--accent-blue)',
          },
          {
            label: 'DSA Problems',
            value: leetcode?.totalSolved || 500,
            suffix: '+',
            icon: <Code2 size={22} />,
            color: 'var(--accent-violet)',
          },
          {
            label: 'CF Rating',
            value: cf?.rating || 1062,
            icon: <Trophy size={22} />,
            color: 'var(--accent-amber)',
          },
          {
            label: 'CodeChef',
            value: 2,
            suffix: '★',
            icon: <Star size={22} />,
            color: 'var(--accent-pink)',
            url: 'https://www.codechef.com/users/easy_trust_71'
          },
        ]);
      } catch {
        // Use fallback stats
        setStats([
          { label: 'GitHub Repos', value: 17, icon: <GithubIcon size={22} />, color: 'var(--accent-cyan)' },
          { label: 'Contributions', value: 200, suffix: '+', icon: <GitPullRequest size={22} />, color: 'var(--accent-blue)' },
          { label: 'DSA Problems', value: 500, suffix: '+', icon: <Code2 size={22} />, color: 'var(--accent-violet)' },
          { label: 'CF Rating', value: 1062, icon: <Trophy size={22} />, color: 'var(--accent-amber)' },
          { label: 'CodeChef', value: 2, suffix: '★', icon: <Star size={22} />, color: 'var(--accent-pink)', url: 'https://www.codechef.com/users/easy_trust_71' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <section id="stats" className="relative py-16 border-y border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[var(--border-subtle)]">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center justify-center">
                  <div className="skeleton h-8 w-16 mb-2" />
                  <div className="skeleton h-4 w-20" />
                </div>
              ))
            : stats.map((stat, i) => {
                const content = (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`flex flex-col items-center justify-center group ${stat.url ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className={`text-3xl sm:text-4xl font-mono text-[var(--text-primary)] mb-2 transition-transform ${stat.url ? 'group-hover:-translate-y-2 group-hover:text-[var(--accent-cyan)]' : 'group-hover:-translate-y-1'}`}>
                      <CountUp target={stat.value} />
                      {stat.suffix && <span>{stat.suffix}</span>}
                    </div>
                    <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2">
                      <span className="opacity-50">{stat.icon}</span>
                      {stat.label}
                    </div>
                  </motion.div>
                );

                return stat.url ? (
                  <a href={stat.url} target="_blank" rel="noopener noreferrer" key={stat.label} className="block">
                    {content}
                  </a>
                ) : (
                  content
                );
              })}
        </div>
      </div>
    </section>
  );
}
