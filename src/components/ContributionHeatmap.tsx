import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, GitMerge, GitCommit } from 'lucide-react';

export default function ContributionHeatmap() {
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ total: number } | null>(null);

  useEffect(() => {
    async function fetchTotalContributions() {
      try {
        const res = await fetch('/api/github/contributions');
        const json = await res.json();
        if (json.totalContributions !== undefined) {
          setData({ total: json.totalContributions });
        }
      } catch (err) {
        console.error("Failed to fetch contributions total", err);
      }
    }

    async function fetchAndColorizeSnake() {
      try {
        const timestamp = new Date().getTime();
        const res = await fetch(`https://raw.githubusercontent.com/divya-3005/divya-3005/output/github-contribution-grid-snake-dark.svg?t=${timestamp}`, { cache: 'no-store' });
        const text = await res.text();
        
        // The default dark snake uses a grey palette: --c1:#333333;--c2:#555555;--c3:#777777;--c4:#999999
        // We replace it with the classic GitHub Green palette!
        const greenSvg = text.replace(
          /:root{[^}]+}/,
          ":root{--cb:#1b1f230a;--cs:white;--ce:#161b22;--c0:#161b22;--c1:#0e4429;--c2:#006d32;--c3:#26a641;--c4:#39d353}"
        );
        
        const b64 = btoa(unescape(encodeURIComponent(greenSvg)));
        setSvgUrl(`data:image/svg+xml;base64,${b64}`);
      } catch (err) {
        console.error("Failed to fetch snake SVG", err);
        // Fallback to original url
        setSvgUrl("https://raw.githubusercontent.com/divya-3005/divya-3005/output/github-contribution-grid-snake-dark.svg?v=3");
      } finally {
        setLoading(false);
      }
    }
    
    fetchTotalContributions();
    fetchAndColorizeSnake();
  }, []);

  return (
    <section className="relative bg-[var(--bg-primary)] py-24 border-y border-[var(--border-subtle)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col items-center justify-center text-center" style={{ marginBottom: '2rem' }}>
            <h2 className="text-sm font-mono text-[var(--text-muted)] tracking-widest uppercase mb-4">{`// 05`} &nbsp; Open Source</h2>
            <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
              Contribution Activity
            </h3>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
              <span className="text-[var(--accent-cyan)] font-bold">{data ? data.total : '...'}</span> contributions in the last year across personal and open-source projects.
            </p>
          </div>

          <div className="w-full max-w-5xl mx-auto" style={{ marginTop: '1.5rem' }}>
            <div className="flex flex-col items-center">
              <div className="w-full overflow-x-auto hide-scrollbar flex justify-start md:justify-center rounded-2xl border border-[#1f2937] bg-[#161b22] p-4 md:p-8 shadow-2xl relative z-10">
                {loading ? (
                  <div className="h-[150px] w-[700px] flex items-center justify-center flex-shrink-0">
                    <div className="skeleton w-full h-[120px] rounded-xl opacity-20" />
                  </div>
                ) : (
                  <img 
                    src={svgUrl || "https://raw.githubusercontent.com/divya-3005/divya-3005/output/github-contribution-grid-snake-dark.svg?v=3"} 
                    alt="GitHub Snake Contribution Graph" 
                    className="max-w-none md:max-w-4xl mx-auto h-auto flex-shrink-0"
                    style={{ minWidth: '700px' }}
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
                )}
              </div>

              <div className="w-full mt-6 flex flex-wrap items-center justify-between gap-4 px-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-muted)]">
                    <GitPullRequest size={16} /> <span className="opacity-70">Pull Requests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-muted)]">
                    <GitCommit size={16} /> <span className="opacity-70">Commits</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-muted)]">
                    <GitMerge size={16} /> <span className="opacity-70">Code Reviews</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] opacity-70">
                  <span>*Powered by GitHub Actions</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
