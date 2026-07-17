'use client';

import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const socialLinks = [
    { icon: <GithubIcon size={24} />, href: 'https://github.com/divya-3005', label: 'GitHub' },
    { icon: <LinkedinIcon size={24} />, href: 'https://www.linkedin.com/in/divya-singh-5435093b4/', label: 'LinkedIn' },
  ];

  return (
    <footer id="contact" className="relative bg-[var(--bg-secondary)] overflow-hidden w-full block">
      {/* Massive gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-30" />
      
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent-cyan)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-12 mb-24">
          <div className="max-w-2xl flex flex-col items-center">
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-black tracking-tighter leading-[0.9] mb-6">
              <span className="text-[var(--text-muted)]">Let&apos;s</span>{' '}
              <span className="text-[var(--text-secondary)]">build</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-violet)]">something.</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] font-medium leading-relaxed mb-10 max-w-md mx-auto">
              Currently open to new opportunities in Full-Stack Engineering, Applied AI, and Cloud Infrastructure.
            </p>
            <a 
              href="mailto:divyasingh2005@gmail.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform"
            >
              <Mail size={18} />
              Start a Conversation
            </a>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex gap-6">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-14 h-14 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-violet)] flex items-center justify-center text-white font-bold text-sm">
              DS
            </div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              &copy; {new Date().getFullYear()} Divya Singh.
            </p>
          </div>

          <p className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2">
            DESIGNED & BUILT WITH <Heart size={12} className="text-[var(--text-primary)]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
