'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillItem {
  name: string;
  usedIn?: string;
}

interface SkillCategory {
  title: string;
  color: string;
  icon: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    color: '#3b82f6',
    icon: '⟨/⟩',
    skills: [
      { name: 'C++', usedIn: 'Competitive Programming, DSA' },
      { name: 'JavaScript', usedIn: 'CollabDocs, Portfolio' },
      { name: 'TypeScript', usedIn: 'CollabDocs, Next.js projects' },
      { name: 'Python', usedIn: 'ReMi, AI/ML projects' },
      { name: 'SQL', usedIn: 'CollabDocs, ShopSmart' },
    ],
  },
  {
    title: 'Frontend',
    color: '#06d6a0',
    icon: '🎨',
    skills: [
      { name: 'React', usedIn: 'CollabDocs, Portfolio' },
      { name: 'Next.js', usedIn: 'Portfolio, Web apps' },
      { name: 'Tailwind CSS', usedIn: 'Portfolio, UI design' },
    ],
  },
  {
    title: 'Backend',
    color: '#8b5cf6',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', usedIn: 'CollabDocs' },
      { name: 'Express', usedIn: 'CollabDocs, REST APIs' },
      { name: 'FastAPI', usedIn: 'ReMi, Python backends' },
      { name: 'Socket.io', usedIn: 'CollabDocs real-time' },
      { name: 'Prisma', usedIn: 'CollabDocs ORM' },
    ],
  },
  {
    title: 'Databases',
    color: '#f59e0b',
    icon: '🗄️',
    skills: [
      { name: 'PostgreSQL', usedIn: 'CollabDocs' },
      { name: 'MongoDB', usedIn: 'Various projects' },
      { name: 'MySQL', usedIn: 'Academic projects' },
      { name: 'Redis', usedIn: 'Caching layers' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    color: '#ec4899',
    icon: '☁️',
    skills: [
      { name: 'Docker', usedIn: 'ShopSmart containers' },
      { name: 'Terraform', usedIn: 'ShopSmart IaC' },
      { name: 'GitHub Actions', usedIn: 'ShopSmart CI/CD' },
      { name: 'AWS', usedIn: 'ECS Fargate, S3, CloudWatch' },
    ],
  },
  {
    title: 'AI & ML',
    color: '#06b6d4',
    icon: '🤖',
    skills: [
      { name: 'LangChain', usedIn: 'RAG pipelines' },
      { name: 'FAISS', usedIn: 'ReMi vector search' },
      { name: 'RAG', usedIn: 'ReMi research agent' },
      { name: 'Prompt Engineering', usedIn: 'Gemini API, LLMs' },
    ],
  },
  {
    title: 'Core CS',
    color: '#a78bfa',
    icon: '📚',
    skills: [
      { name: 'DSA', usedIn: '500+ problems solved' },
      { name: 'OOP', usedIn: 'System design, C++' },
      { name: 'DBMS', usedIn: 'Database design' },
      { name: 'OS', usedIn: 'Systems programming' },
      { name: 'Computer Networks', usedIn: 'Networking fundamentals' },
    ],
  },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="relative bg-[var(--bg-secondary)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-subtitle">
            Technologies I work with — hover to see where I use them
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.08, duration: 0.5 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{cat.icon}</span>
                <h3
                  className="font-semibold text-sm uppercase tracking-wider"
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <div
                    key={skill.name}
                    className="relative group"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <span
                      className="inline-block px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 cursor-default"
                      style={{
                        borderColor: hoveredSkill === skill.name ? cat.color : 'var(--border-subtle)',
                        backgroundColor: hoveredSkill === skill.name ? `${cat.color}15` : 'transparent',
                        color: hoveredSkill === skill.name ? cat.color : 'var(--text-secondary)',
                      }}
                    >
                      {skill.name}
                    </span>
                    {/* Tooltip */}
                    {skill.usedIn && hoveredSkill === skill.name && (
                      <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-xs text-[var(--text-secondary)] whitespace-nowrap shadow-lg">
                        {skill.usedIn}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--bg-primary)] border-r border-b border-[var(--border-subtle)] rotate-45 -mt-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
