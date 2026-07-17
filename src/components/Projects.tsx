'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const TOP_PROJECTS = [
  {
    id: 'remi',
    displayName: 'ResearchMind (ReMi)',
    description: 'An autonomous, multi-agent RAG platform. Features an agentic planner, specialized researcher sub-agents, Semantic Chunking, HyDE query expansion, and a dual-index Hybrid Search Engine (FAISS + BM25).',
    techStack: ['Python', 'FastAPI', 'React', 'FAISS', 'HyDE'],
    outcome: 'Generated rigorously cited reports with character-level source grounding.',
    url: 'https://github.com/divya-3005/ReMi'
  },
  {
    id: 'reporag',
    displayName: 'RepoRAG AI',
    description: 'An agentic Retrieval-Augmented Generation (RAG) system purpose-built for codebases. Parses ASTs, builds Neo4j call graphs, and uses an agentic planner to answer multi-hop code questions with line-level citations.',
    techStack: ['Python', 'Tree-Sitter', 'Neo4j', 'Qdrant', 'CodeBERT'],
    outcome: 'Mapped complex repository structures using hybrid vector & sparse indexing.',
    url: 'https://github.com/newton-school-ai/reporag-ai_2'
  },
  {
    id: 'shopsmart',
    displayName: 'ShopSmart DevSecOps',
    description: 'A production-ready e-commerce architecture demonstrating a complete DevSecOps pipeline. Features Infrastructure as Code (IaC), containerized serverless deployment, and a mature CI/CD workflow.',
    techStack: ['Terraform', 'AWS Fargate', 'Docker', 'GitHub Actions'],
    outcome: 'Automated high-availability cloud deployments with zero-downtime execution.',
    url: 'https://github.com/divya-3005/shopsmart'
  },
  {
    id: 'collab-editor',
    displayName: 'CollabDocs',
    description: 'A full-stack real-time collaborative document editor engineered from scratch. Allows multiple concurrent users to edit the same document simultaneously using a custom Operational Transformation (OT) algorithm.',
    techStack: ['React', 'Node.js', 'Socket.io', 'Prisma', 'PostgreSQL'],
    outcome: 'Achieved seamless real-time syncing with zero data conflict.',
    url: 'https://github.com/divya-3005/collab-editor'
  },
  {
    id: 'clandestine',
    displayName: 'Project Clandestine',
    description: 'An AI Information Verification System designed to combat AI-generated misinformation. Actively verifies claims through a dynamic trust-scoring pipeline, routing queries through crawlers and a trusted Knowledge Base.',
    techStack: ['Python', 'LLMs', 'Web Crawling', 'RAG'],
    outcome: 'Built a robust verification flow to prevent AI hallucination feedback loops.',
    url: 'https://github.com/uditjainstjis/Project-Clandestine'
  },
  {
    id: 'collabzen',
    displayName: 'CollabZen',
    description: 'A modern, real-time collaboration workspace designed for remote teams to brainstorm, plan, and execute projects seamlessly in a unified environment.',
    techStack: ['JavaScript', 'React', 'Node.js', 'WebSockets'],
    outcome: 'Delivered a fluid and responsive real-time multiplayer experience.',
    url: 'https://github.com/divya-3005/Collabzen'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-[var(--bg-primary)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-sm font-mono text-[var(--text-muted)] tracking-widest uppercase mb-2">{`// 02`} &nbsp; Selected Work</h2>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '2.5rem' }}>
          {TOP_PROJECTS.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--accent-cyan)] hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:-translate-y-2 transition-all duration-300"
              style={{ padding: '2.5rem' }}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start" style={{ marginBottom: '2rem' }}>
                  <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                    {project.displayName}
                  </h3>
                  <ArrowUpRight size={22} className="text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors" />
                </div>
                
                <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed flex-grow" style={{ marginBottom: '2rem' }}>
                  {project.description}
                </p>

                <div className="rounded-lg border border-[var(--border-subtle)]" style={{ marginBottom: '2.5rem', padding: '1.25rem', backgroundColor: 'var(--bg-tertiary)' }}>
                  <p className="text-[var(--text-primary)] text-sm font-medium leading-relaxed">
                    <span className="text-[var(--accent-cyan)] opacity-70 mr-2">Result:</span>
                    {project.outcome}
                  </p>
                </div>

                <div className="flex flex-wrap mt-auto" style={{ gap: '0.75rem' }}>
                  {project.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="bg-transparent text-[var(--text-muted)] border border-[var(--border-subtle)] text-[11px] font-mono rounded-md uppercase tracking-wider"
                      style={{ padding: '0.25rem 0.75rem' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        
        <div className="flex justify-start" style={{ marginTop: '5rem' }}>
          <a 
            href="https://github.com/divya-3005" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="minimal-link font-mono text-sm uppercase tracking-widest"
          >
            View full archive on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
