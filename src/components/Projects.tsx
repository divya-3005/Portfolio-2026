'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  languages: Record<string, number>;
  pushedAt: string;
}

const CURATED_PROJECTS: Record<string, { displayName: string; summary: string; fallbackUrl?: string; fallbackLang?: string; category: string }> = {
  'reporag': {
    displayName: 'RepoRAG AI',
    summary: 'RAG-based repository analysis and retrieval tool.',
    fallbackUrl: 'https://github.com/newton-school-ai/reporag-ai_2',
    fallbackLang: 'Python',
    category: 'AI & Data Science',
  },
  'liar-ml': {
    displayName: 'Project Clandestine (LIAR Dataset)',
    summary: 'Machine Learning models on the LIAR dataset. Built the core ML pipeline and evaluation metrics. (Collab with Udit Jain)',
    fallbackUrl: 'https://github.com/uditjainstjis/Project-Clandestine',
    fallbackLang: 'Jupyter Notebook',
    category: 'AI & Data Science',
  },
  'tableau-viz': {
    displayName: 'Job Market Trends Analytics',
    summary: 'Interactive data visualizations and business intelligence reporting for Job Market Trends using Tableau. (Collab with Palak)',
    fallbackUrl: 'https://github.com/PALAK7890/SectionA_Team14_JobMarketTrends',
    fallbackLang: 'Jupyter Notebook',
    category: 'AI & Data Science',
  },
  'ReMi': {
    displayName: 'ReMi Agent',
    summary: 'RAG research agent with hallucination grounding pipeline.',
    category: 'AI & Data Science',
  },
  'ai-agents': {
    displayName: 'AI Agents',
    summary: 'Custom Python-based autonomous AI agent architectures.',
    category: 'AI & Data Science',
  },
  'shopsmart': {
    displayName: 'ShopSmart',
    summary: 'Cloud deployment pipeline with infrastructure-as-code (Terraform).',
    category: 'DevOps & Infrastructure',
  },
  'collab-editor': {
    displayName: 'CollabDocs',
    summary: 'Real-time collaborative editor using Operational Transformation.',
    category: 'Full-Stack Engineering',
  },
  'Collabzen': {
    displayName: 'Collabzen',
    summary: 'Real-time collaboration platform and workspace.',
    category: 'Full-Stack Engineering',
  },
  'dsa-visualizer': {
    displayName: 'DSA Visualizer',
    summary: 'Interactive frontend visualization tool for algorithms and data structures.',
    category: 'Full-Stack Engineering',
  }
};

function ProjectRow({ repo, index }: { repo: Repo; index: number }) {
  const details = CURATED_PROJECTS[repo.name];
  if (!details) return null;
  
  const displayName = details.displayName;
  const summary = details.summary;
  
  const topLanguages = Object.keys(repo.languages || {}).slice(0, 2);
  const displayLangs = topLanguages.length > 0 ? topLanguages : (repo.language ? [repo.language] : []);

  return (
    <motion.a
      href={repo.homepage || repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] px-6 -mx-6 transition-colors"
      data-cursor="View"
    >
      <div className="flex flex-col md:w-1/3 mb-2 md:mb-0">
        <h3 className="text-xl font-medium text-[var(--text-primary)] group-hover:translate-x-2 transition-transform">
          {displayName}
        </h3>
      </div>
      
      <div className="flex flex-col md:w-1/2 mb-4 md:mb-0">
        <p className="text-sm text-[var(--text-secondary)]">
          {summary}
        </p>
      </div>
      
      <div className="flex items-center justify-between md:w-1/6 md:justify-end gap-4">
        <div className="flex gap-2 text-xs font-mono text-[var(--text-muted)]">
          {displayLangs.map(lang => (
            <span key={lang}>{lang}</span>
          ))}
        </div>
        <ArrowUpRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState<{ owned: Repo[] }>({ owned: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('/api/github');
        const data = await res.json();
        if (data.owned) {
          setRepos({ owned: data.owned });
        }
      } catch {
        console.error('Failed to fetch repos');
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  // Create dummy Repo objects for any curated projects not found in the GitHub fetch
  const curatedNames = Object.keys(CURATED_PROJECTS);
  
  const fetchedDisplayRepos = repos.owned.filter(r => curatedNames.includes(r.name));
  const fetchedNames = fetchedDisplayRepos.map(r => r.name);
  
  const staticRepos: Repo[] = curatedNames
    .filter(name => !fetchedNames.includes(name))
    .map(name => {
      const details = CURATED_PROJECTS[name];
      return {
        id: Math.random(),
        name: name,
        description: null,
        url: details.fallbackUrl || '#',
        homepage: details.fallbackUrl || '#',
        language: details.fallbackLang || null,
        languages: {},
        pushedAt: new Date().toISOString(), // Dummy date
      };
    });

  const displayRepos = [...fetchedDisplayRepos, ...staticRepos];

  // Group by category
  const groupedRepos = displayRepos.reduce((acc, repo) => {
    const cat = CURATED_PROJECTS[repo.name]?.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(repo);
    return acc;
  }, {} as Record<string, Repo[]>);

  const categories = ['AI & Data Science', 'Full-Stack Engineering', 'DevOps & Infrastructure'];

  return (
    <section id="projects" className="relative py-24 bg-[var(--bg-primary)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Selected Work</h2>
        </motion.div>

        {loading ? (
          <div className="flex flex-col border-t border-[var(--border-subtle)] mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="py-10 border-b border-[var(--border-subtle)] px-6">
                <div className="h-6 w-1/3 bg-[var(--bg-secondary)] skeleton mb-2" />
                <div className="h-4 w-1/2 bg-[var(--bg-secondary)] skeleton" />
              </div>
            ))}
          </div>
        ) : (
          categories.map((category) => {
            const catRepos = groupedRepos[category];
            if (!catRepos || catRepos.length === 0) return null;
            return (
              <div key={category} className="mt-16 first:mt-8">
                <h3 className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-widest mb-4">{category}</h3>
                <div className="flex flex-col border-t border-[var(--border-subtle)]">
                  {catRepos.map((repo, idx) => (
                    <ProjectRow key={repo.id} repo={repo} index={idx} />
                  ))}
                </div>
              </div>
            );
          })
        )}
        
        <div className="mt-16 text-left">
          <a 
            href="https://github.com/divya-3005" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="minimal-link font-mono text-sm uppercase tracking-wider"
          >
            View full archive on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
