'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar, ChevronRight } from 'lucide-react';

interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  current?: boolean;
}

const TIMELINE: TimelineItem[] = [
  {
    id: 'beyond-innovation',
    type: 'work',
    title: 'Software Engineer Intern',
    organization: 'Beyond Innovation',
    location: 'Noida, India',
    period: 'May 2026 – Present',
    current: true,
    description: [
      'Built client-facing interfaces on REST APIs, improving data reliability by 40%.',
      'Synchronized backend & frontend data pipelines, reducing latency by 25%.',
      'Collaborated with cross-functional teams on production-grade features.',
    ],
  },
  {
    id: 'rishihood',
    type: 'education',
    title: 'B.Tech in CS & Data Science',
    organization: 'Rishihood University',
    location: 'Sonepat, Haryana',
    period: 'Aug 2024 – May 2028',
    description: [
      'Specializing in Computer Science & Data Science architectures.',
      'Active participant in competitive programming and national hackathons.',
      'Building full-stack projects and contributing to core open-source repositories.',
    ],
  },
];

export default function Experience() {
  const [activeTabId, setActiveTabId] = useState<string>(TIMELINE[0].id);
  const activeItem = TIMELINE.find((item) => item.id === activeTabId) || TIMELINE[0];

  return (
    <section id="experience" className="relative py-24 bg-[var(--bg-primary)] overflow-hidden block w-full">
      {/* Decorative background blurs */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-[var(--accent-cyan)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-[var(--accent-pink)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        
        {/* 1. Header Section - Centered */}
        <div className="w-full flex flex-col items-center justify-center text-center" style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center w-full"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 bg-[var(--border-subtle)] hidden md:block" />
              <span className="text-sm font-mono text-[var(--text-muted)] tracking-widest uppercase">{`// 06`}</span>
              <div className="h-px w-8 bg-[var(--border-subtle)] hidden md:block" />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
              Where I've <span className="text-[var(--accent-cyan)]">Worked</span>
            </h3>
          </motion.div>
        </div>

        {/* 2. Content Section - Grid Layout pulled inward */}
        <div className="w-full block max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start w-full">
            
            {/* Tabs List (Left Column, spans 4 cols on desktop) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-4 flex md:flex-col overflow-x-auto md:overflow-x-visible hide-scrollbar border-b md:border-b-0 md:border-l border-[var(--border-subtle)] relative w-full"
            >
              {/* Animated Active Indicator */}
              <div className="absolute transition-all duration-300 ease-out hidden md:block w-[2px] bg-[var(--accent-cyan)] left-[-1px]" 
                   style={{ 
                     top: `${TIMELINE.findIndex(t => t.id === activeTabId) * 72}px`,
                     height: '72px' 
                   }} 
              />
              {/* Animated Active Indicator (Mobile) */}
              <div className="absolute transition-all duration-300 ease-out md:hidden h-[2px] bg-[var(--accent-cyan)] bottom-[-1px]" 
                   style={{ 
                     left: `${TIMELINE.findIndex(t => t.id === activeTabId) * (100 / TIMELINE.length)}%`,
                     width: `${100 / TIMELINE.length}%` 
                   }} 
              />

              {TIMELINE.map((item) => {
                const isActive = activeTabId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTabId(item.id)}
                    className={`h-[72px] px-8 flex items-center justify-center md:justify-start whitespace-nowrap text-lg font-medium transition-all duration-300 relative group text-left w-full
                      ${isActive 
                        ? 'text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/5' 
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                      }`}
                  >
                    {item.organization}
                  </button>
                );
              })}
            </motion.div>

            {/* Tab Content (Right Column, spans 8 cols on desktop) */}
            <div className="md:col-span-8 w-full min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="w-full"
                >
                  <div className="w-full" style={{ marginBottom: '3rem' }}>
                    <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight" style={{ marginBottom: '1rem' }}>
                      {activeItem.title}
                    </h3>
                    <div className="text-xl md:text-2xl text-[var(--accent-cyan)] font-medium" style={{ marginBottom: '2rem' }}>
                      @ {activeItem.organization}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-8 text-base font-mono text-[var(--text-muted)]">
                      <span className="flex items-center gap-2">
                        <Calendar size={18} className="opacity-70" />
                        {activeItem.period}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={18} className="opacity-70" />
                        {activeItem.location}
                      </span>
                    </div>
                  </div>

                  <ul className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {activeItem.description.map((desc, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start text-[var(--text-secondary)] text-lg leading-relaxed"
                      >
                        <span className="mr-5 mt-2.5 w-2 h-2 rounded-sm bg-[var(--accent-cyan)]/80 shrink-0" />
                        <span className="tracking-wide">{desc}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
