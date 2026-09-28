import Container from '@/components/common/Container';
import About from '@/components/landing/About';
import Experience from '@/components/landing/Experience';
import Hero from '@/components/landing/Hero';
import Projects from '@/components/landing/Projects';
import ProofPanel from '@/components/landing/ProofPanel';
import Writing from '@/components/landing/Writing';
import React from 'react';

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <Container>
        <div className="grid border-b border-border lg:grid-cols-[minmax(0,1.62fr)_minmax(22rem,0.92fr)]">
          <Hero />
          <ProofPanel />
        </div>
      </Container>
      <Projects />
      <Experience />
      <Writing />
      <About />
    </main>
  );
}
