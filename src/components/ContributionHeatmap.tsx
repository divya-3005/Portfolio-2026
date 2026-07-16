'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ContributionHeatmap() {
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch('/api/github/contributions');
        const data = await res.json();
        if (data.totalContributions) {
          setTotalContributions(data.totalContributions);
        }
      } catch {
        console.error('Failed to fetch contributions');
      }
    }
    fetchContributions();
  }, []);

  return (
    <section className="relative bg-[var(--bg-secondary)] pb-12 pt-4">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Contribution Activity
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              {totalContributions > 0 ? `${totalContributions} contributions in the last year` : 'Loading contributions...'}
            </p>
          </div>

          <div className="w-full overflow-hidden flex justify-center items-center rounded-xl bg-transparent p-4">
            {/* The legendary GitHub Snake */}
            <img 
              src="https://raw.githubusercontent.com/divya-3005/divya-3005/output/github-contribution-grid-snake-dark.svg?v=3" 
              alt="GitHub Snake Contribution Graph" 
              className="w-full max-w-4xl mx-auto h-auto mix-blend-screen opacity-90 hover:opacity-100 transition-opacity"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.snake-fallback')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'snake-fallback text-sm text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] p-8 rounded-xl text-center w-full max-w-2xl mx-auto';
                  fallback.innerHTML = `
                    <p class="mb-2 font-bold text-[var(--text-primary)]">🐍 Snake Animation Not Found</p>
                    <p>To see the snake eating your graph, you need to set up the <strong>Platane/snk</strong> GitHub Action in your <code>divya-3005/divya-3005</code> repository.</p>
                    <a href="https://github.com/Platane/snk" target="_blank" class="text-[var(--accent-cyan)] hover:underline mt-2 inline-block">View Setup Guide →</a>
                  `;
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
