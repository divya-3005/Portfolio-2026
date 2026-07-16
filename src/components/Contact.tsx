'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Contact() {
  const socialLinks = [
    { icon: <GithubIcon size={20} />, href: 'https://github.com/divya-3005', label: 'GitHub' },
    { icon: <LinkedinIcon size={20} />, href: 'https://www.linkedin.com/in/divya-singh-5435093b4/', label: 'LinkedIn' },
    { icon: <Mail size={20} />, href: 'mailto:divyasingh2005@gmail.com', label: 'Email' },
  ];

  return (
    <section id="contact" className="relative py-24 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-left max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-[var(--text-primary)]">
              Let&apos;s build something.
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">
              Open to opportunities in Full-Stack Engineering, Applied AI, and Cloud Infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="minimal-link flex items-center gap-2 text-sm uppercase tracking-widest font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                data-cursor={link.label}
              >
                {link.icon}
                <span className="hidden sm:inline-block">{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
