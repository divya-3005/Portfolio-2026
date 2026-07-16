'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  section?: string;
  href: string;
  icon: string;
}

const COMMANDS: CommandItem[] = [
  { id: 'hero', label: 'Home', section: 'Navigation', href: '#hero', icon: '🏠' },
  { id: 'projects', label: 'Projects', section: 'Navigation', href: '#projects', icon: '📁' },
  { id: 'skills', label: 'Skills', section: 'Navigation', href: '#skills', icon: '⚡' },
  { id: 'competitive', label: 'Competitive Programming', section: 'Navigation', href: '#competitive', icon: '🏆' },
  { id: 'experience', label: 'Experience & Education', section: 'Navigation', href: '#experience', icon: '💼' },
  { id: 'contact', label: 'Contact', section: 'Navigation', href: '#contact', icon: '📧' },
  { id: 'github', label: 'GitHub Profile', section: 'Links', href: 'https://github.com/divya-3005', icon: '🐙' },
  { id: 'linkedin', label: 'LinkedIn Profile', section: 'Links', href: 'https://www.linkedin.com/in/divya-singh-5435093b4/', icon: '🔗' },
  { id: 'leetcode', label: 'LeetCode Profile', section: 'Links', href: 'https://leetcode.com/divya_singh22', icon: '📊' },
  { id: 'codeforces', label: 'Codeforces Profile', section: 'Links', href: 'https://codeforces.com/profile/divyasingh22', icon: '⚔️' },
  { id: 'remi', label: 'ReMi — RAG Research Agent', section: 'Projects', href: 'https://github.com/divya-3005/ReMi', icon: '🤖' },
  { id: 'collabdocs', label: 'CollabDocs — Real-time Editor', section: 'Projects', href: 'https://github.com/divya-3005/collab-editor', icon: '📝' },
  { id: 'shopsmart', label: 'ShopSmart — Cloud Pipeline', section: 'Projects', href: 'https://github.com/divya-3005/shopsmart', icon: '☁️' },
  { id: 'email', label: 'Email Divya', section: 'Actions', href: 'mailto:divyasingh2005@gmail.com', icon: '✉️' },
];

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query === ''
    ? COMMANDS
    : COMMANDS.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        (cmd.section && cmd.section.toLowerCase().includes(query.toLowerCase()))
      );

  const handleSelect = useCallback((item: CommandItem) => {
    if (item.href.startsWith('#')) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(item.href, '_blank');
    }
    onClose();
    setQuery('');
    setSelectedIndex(0);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        setQuery('');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex, handleSelect]);

  // Group commands by section
  const sections = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    const section = cmd.section || 'Other';
    if (!acc[section]) acc[section] = [];
    acc[section].push(cmd);
    return acc;
  }, {});

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
              <Search size={18} className="text-[var(--text-muted)]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search or jump to..."
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none text-sm"
              />
              <kbd className="px-2 py-0.5 text-[10px] text-[var(--text-muted)] bg-[var(--bg-tertiary)] rounded border border-[var(--border-subtle)]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-sm text-[var(--text-muted)] text-center">
                  No results found for &ldquo;{query}&rdquo;
                </p>
              ) : (
                Object.entries(sections).map(([section, items]) => (
                  <div key={section}>
                    <p className="px-4 py-1.5 text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-medium">
                      {section}
                    </p>
                    {items.map(item => {
                      const currentFlatIndex = flatIndex++;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                            currentFlatIndex === selectedIndex
                              ? 'bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]'
                              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="flex-1">{item.label}</span>
                          {currentFlatIndex === selectedIndex && (
                            <ArrowRight size={14} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-[var(--border-subtle)] flex items-center gap-4 text-[10px] text-[var(--text-muted)]">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
