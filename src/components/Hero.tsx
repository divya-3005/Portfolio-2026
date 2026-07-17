'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 1.5 }, // Delay for preloader
    },
  };

  const textRevealVariants = {
    hidden: { y: '100%', opacity: 0, rotateZ: 5 },
    visible: {
      y: 0,
      opacity: 1,
      rotateZ: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const }, // Awwwards standard ease
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const, delay: 2 },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="section-container text-left relative z-10 w-full pt-32"
      >
        <motion.div variants={fadeVariants} className="mb-6">
          <p className="font-mono text-sm text-[var(--text-secondary)]">{"// Portfolio 2026"}</p>
        </motion.div>

        {/* Minimalist Cinematic Header */}
        <div className="mb-8">
          <h1 className="text-[clamp(4rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase kinetic-header text-[var(--text-primary)]">
            <div className="overflow-hidden">
              <motion.div variants={textRevealVariants} className="origin-bottom-left">Divya</motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div variants={textRevealVariants} className="origin-bottom-left text-[var(--text-secondary)]">Singh</motion.div>
            </div>
          </h1>
        </div>

        {/* Sharp Bio */}
        <motion.p
          variants={fadeVariants}
          className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mb-12 leading-relaxed"
        >
          Software Engineer &amp; Data Scientist. Architecting scalable backends, building intelligent systems, and writing clean, production-grade code.
        </motion.p>

        {/* Minimalist Text Links */}
        <motion.div
          variants={fadeVariants}
          className="flex flex-wrap items-center justify-start gap-8 font-mono text-sm tracking-wide uppercase"
        >
          <a
            href="https://github.com/divya-3005"
            target="_blank"
            rel="noopener noreferrer"
            className="minimal-link"
            data-cursor="Code"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/divya-singh-5435093b4/"
            target="_blank"
            rel="noopener noreferrer"
            className="minimal-link"
            data-cursor="Connect"
          >
            LinkedIn
          </a>
          <a
            href="mailto:divyasingh2005@gmail.com"
            className="minimal-link"
            data-cursor="Email"
          >
            Email
          </a>
          <a
            href="https://drive.google.com/file/d/1AzcHk9e7cN2emEcQSsKX0fbzi4U8DsPV/view?usp=drivesdk"
            className="minimal-link"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="PDF"
          >
            Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
