'use client';

// No state needed here anymore
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import StatsBar from '@/components/StatsBar';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import CompetitiveProgramming from '@/components/CompetitiveProgramming';
import ContributionHeatmap from '@/components/ContributionHeatmap';
import Experience from '@/components/Experience';


import TerminalEasterEgg from '@/components/TerminalEasterEgg';
import Footer from '@/components/Footer';

export default function Home() {

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <StatsBar />
        <Projects />
        <Skills />
        <CompetitiveProgramming />
        <ContributionHeatmap />
        <Experience />

      </main>

      <Footer />

      {/* Global overlays */}

      <TerminalEasterEgg />
    </>
  );
}
