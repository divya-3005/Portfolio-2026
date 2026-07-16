'use client';

import { motion } from 'framer-motion';

interface TimelineItem {
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

function TimelineRow({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:grid md:grid-cols-4 gap-8 py-12 border-b border-[var(--border-subtle)] group">
        
        {/* Mobile-only left border */}
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-[var(--border-subtle)]">
          <div className="absolute top-10 -left-1 w-2 h-2 rounded-full bg-[var(--text-primary)]" />
        </div>

        {/* Desktop left column (Dates & Type) */}
        <div className="hidden md:flex flex-col col-span-1 pt-1">
          <span className="text-sm font-mono text-[var(--text-secondary)]">{item.period}</span>
          <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-2">
            {item.type} {item.current && '— Current'}
          </span>
        </div>
        
        {/* Main Content */}
        <div className="col-span-3">
          <div className="md:hidden mb-4">
            <span className="text-sm font-mono text-[var(--text-secondary)] block mb-1">{item.period}</span>
            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
              {item.type} {item.current && '— Current'}
            </span>
          </div>

          <h3 className="text-2xl font-medium text-[var(--text-primary)] mb-1">
            {item.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-[var(--text-secondary)] mb-6">
            <span className="font-mono text-sm">{item.organization}</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="font-mono text-sm">{item.location}</span>
          </div>
          
          <ul className="space-y-2">
            {item.description.map((desc, j) => (
              <li key={j} className="text-sm text-[var(--text-secondary)] flex items-start">
                <span className="mr-3 mt-1.5 w-1 h-1 rounded-full bg-[var(--text-muted)] shrink-0" />
                <span className="leading-relaxed">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 bg-[var(--bg-primary)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Experience &amp; Education</h2>
        </motion.div>

        <div className="mt-8 border-t border-[var(--border-subtle)]">
          {TIMELINE.map((item, i) => (
            <TimelineRow key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
