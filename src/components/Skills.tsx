'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Layout, Server, Database, Cloud, Bot, BookOpen } from 'lucide-react';

interface SkillItem {
  name: string;
  usedIn?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  color: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    color: '#3b82f6',
    icon: <Code2 size={20} />,
    skills: [
      { name: 'C++', usedIn: 'Competitive Programming, DSA' },
      { name: 'JavaScript', usedIn: 'CollabDocs, Portfolio' },
      { name: 'TypeScript', usedIn: 'CollabDocs, Next.js projects' },
      { name: 'Python', usedIn: 'ReMi, AI/ML projects' },
      { name: 'SQL', usedIn: 'CollabDocs, ShopSmart' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    color: '#06d6a0',
    icon: <Layout size={20} />,
    skills: [
      { name: 'React', usedIn: 'CollabDocs, Portfolio' },
      { name: 'Next.js', usedIn: 'Portfolio, Web apps' },
      { name: 'Tailwind CSS', usedIn: 'Portfolio, UI design' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    color: '#8b5cf6',
    icon: <Server size={20} />,
    skills: [
      { name: 'Node.js', usedIn: 'CollabDocs' },
      { name: 'Express', usedIn: 'CollabDocs, REST APIs' },
      { name: 'FastAPI', usedIn: 'ReMi, Python backends' },
      { name: 'Socket.io', usedIn: 'CollabDocs real-time' },
      { name: 'Prisma', usedIn: 'CollabDocs ORM' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    color: '#f59e0b',
    icon: <Database size={20} />,
    skills: [
      { name: 'PostgreSQL', usedIn: 'CollabDocs' },
      { name: 'MongoDB', usedIn: 'Various projects' },
      { name: 'MySQL', usedIn: 'Academic projects' },
      { name: 'Redis', usedIn: 'Caching layers' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    color: '#ec4899',
    icon: <Cloud size={20} />,
    skills: [
      { name: 'Docker', usedIn: 'ShopSmart containers' },
      { name: 'Terraform', usedIn: 'ShopSmart IaC' },
      { name: 'GitHub Actions', usedIn: 'ShopSmart CI/CD' },
      { name: 'AWS', usedIn: 'ECS Fargate, S3, CloudWatch' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & ML',
    color: '#06b6d4',
    icon: <Bot size={20} />,
    skills: [
      { name: 'LangChain', usedIn: 'RAG pipelines' },
      { name: 'FAISS', usedIn: 'ReMi vector search' },
      { name: 'RAG', usedIn: 'ReMi research agent' },
      { name: 'Prompt Engineering', usedIn: 'Gemini API, LLMs' },
    ],
  },
  {
    id: 'core',
    title: 'Core CS',
    color: '#a78bfa',
    icon: <BookOpen size={20} />,
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
  const [activeTab, setActiveTab] = useState<string>(SKILL_CATEGORIES[0].id);

  const activeCategory = SKILL_CATEGORIES.find(c => c.id === activeTab) || SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="relative py-24 bg-[var(--bg-secondary)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 className="text-sm font-mono text-[var(--text-muted)] tracking-widest uppercase mb-2">{`// 03`} &nbsp; Tech Stack</h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row" style={{ gap: '2rem' }}>
          {/* Sidebar / Tabs */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible hide-scrollbar pb-4 lg:pb-0" style={{ gap: '0.5rem' }}>
            {SKILL_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center text-left rounded-xl transition-all duration-300 w-auto lg:w-full group relative overflow-hidden flex-shrink-0`}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                    border: isActive ? `1px solid var(--border-subtle)` : '1px solid transparent',
                  }}
                >
                  {/* Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ backgroundColor: cat.color }}
                    />
                  )}
                  
                  <div 
                    className="flex items-center justify-center rounded-lg transition-colors flex-shrink-0"
                    style={{ 
                      width: '32px', 
                      height: '32px',
                      backgroundColor: isActive ? `${cat.color}15` : 'var(--bg-tertiary)',
                      color: isActive ? cat.color : 'var(--text-muted)',
                      marginRight: '0.75rem'
                    }}
                  >
                    {cat.icon}
                  </div>
                  <span 
                    className="font-medium tracking-wide transition-colors text-[14px] md:text-[15px] whitespace-nowrap"
                    style={{ 
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-2/3">
            <div 
              className="h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] overflow-hidden relative p-6 md:p-8"
              style={{ minHeight: '320px' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center mb-6" style={{ gap: '1rem' }}>
                    <div 
                      className="p-2.5 rounded-xl"
                      style={{ backgroundColor: `${activeCategory.color}15`, color: activeCategory.color }}
                    >
                      {activeCategory.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                      {activeCategory.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1rem' }}>
                    {activeCategory.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--border-hover)] transition-colors"
                        style={{ padding: '1rem' }}
                      >
                        <h4 
                          className="text-base font-bold mb-1"
                          style={{ color: activeCategory.color }}
                        >
                          {skill.name}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          {skill.usedIn}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
