import About from '@/components/landing/About';
import Experience from '@/components/landing/Experience';
import Expertise from '@/components/landing/Expertise';
import Hero from '@/components/landing/Hero';
import Philosophy from '@/components/landing/Philosophy';
import Work from '@/components/landing/Projects';
import Setup from '@/components/landing/Setup';
import Showreel from '@/components/landing/Showreel';
import React from 'react';

export default function Page() {
  return (
    <main className="min-h-screen pb-24">
      <Hero />
      <Showreel />
      <Work />
      <Expertise />
      <Experience />
      <Philosophy />
      <About />
      <Setup />
    </main>
  );
}
