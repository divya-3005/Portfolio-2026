'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRIGGER = 'sudo whoami';
const OUTPUT_LINES = [
  '$ sudo whoami',
  '[sudo] password for visitor: ********',
  '',
  '> Authenticating...',
  '> Access granted.',
  '',
  '╔══════════════════════════════════════╗',
  '║                                      ║',
  '║   DIVYA SINGH                        ║',
  '║   Full-Stack Engineer                ║',
  '║   DevOps · AI/RAG · Cloud           ║',
  '║                                      ║',
  '║   github.com/divya-3005             ║',
  '║   divyasingh2005@gmail.com          ║',
  '║                                      ║',
  '╚══════════════════════════════════════╝',
  '',
  '> 500+ DSA problems solved',
  '> Building production-grade systems',
  '> Currently interning @ Beyond Innovation',
  '',
  '[Press ESC to close]',
];

export default function TerminalEasterEgg() {
  const [, setBuffer] = useState('');
  const [show, setShow] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (show) {
      if (e.key === 'Escape') {
        setShow(false);
        setBuffer('');
        setLines([]);
      }
      return;
    }

    // Don't capture when typing in inputs/textareas
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    if (e.key.length === 1) {
      setBuffer(prev => {
        const next = (prev + e.key).slice(-TRIGGER.length);
        if (next === TRIGGER) {
          setLines([]);
          setShow(true);
          return '';
        }
        return next;
      });
    }
  }, [show]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Animate lines appearing one by one
  useEffect(() => {
    if (!show) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < OUTPUT_LINES.length) {
        setLines(prev => [...prev, OUTPUT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => { setShow(false); setBuffer(''); setLines([]); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-xl mx-4 bg-[#0d1117] rounded-xl border border-[#30363d] shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-xs text-[#8b949e] font-mono">divya@portfolio ~ </span>
            </div>

            {/* Terminal body */}
            <div className="p-4 font-mono text-sm min-h-[300px] max-h-[70vh] overflow-y-auto">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={`${
                    line.startsWith('$') ? 'text-[#06d6a0]' :
                    line.startsWith('>') ? 'text-[#58a6ff]' :
                    line.startsWith('║') || line.startsWith('╔') || line.startsWith('╚') ? 'text-[#f59e0b]' :
                    line.startsWith('[') ? 'text-[#8b949e]' :
                    'text-[#c9d1d9]'
                  }`}
                >
                  {line || '\u00A0'}
                </motion.div>
              ))}
              <span className="inline-block w-2 h-4 bg-[#06d6a0] animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
