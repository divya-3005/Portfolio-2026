'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-[var(--bg-primary)]">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <h2 className="text-sm font-mono text-[var(--text-muted)] tracking-widest uppercase mb-2">{`// 01`} &nbsp; About</h2>
            <p className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">The Architecture <br className="hidden md:block" />of Logic.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-8 text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed space-y-6 font-medium"
          >
            <p>
              I bridge data science and full-stack engineering — turning ambiguous problems into systems that are fast, reliable, and built to scale. My work spans REST APIs, cloud infrastructure, and AI-driven tools, with a habit of digging into the &apos;why&apos; before writing a single line of code. I care about clean architecture as much as clean code: every layer, from database schema to UI, should do exactly what it&apos;s supposed to and nothing more.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
