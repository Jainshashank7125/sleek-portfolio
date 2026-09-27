'use client';

import React, { useEffect, useRef, useState } from 'react';

import Section from '../common/Section';

const SRC = '/showreel/showreel.mp4';
const POSTER = '/showreel/poster.jpg';

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [withSound, setWithSound] = useState(false);

  // Autoplay silently, unless the visitor prefers reduced motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.play().catch(() => {
      // Autoplay blocked: the poster and controls stay available.
    });
  }, []);

  const playWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.loop = false;
    video.currentTime = 0;
    video.controls = true;
    video.play();
    setWithSound(true);
  };

  return (
    <Section
      id="showreel"
      heading="Showreel"
      description="Fifteen seconds of motion: the revenue cycle, the results, and the infrastructure underneath. Best with sound."
    >
      <figure className="sheet">
        <div className="relative aspect-video overflow-hidden bg-[#0e2940]">
          <video
            ref={videoRef}
            src={SRC}
            poster={POSTER}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Showreel: Shashank Jain, AI Development Engineer"
            className="size-full object-cover"
          />
          {!withSound && (
            <button
              type="button"
              onClick={playWithSound}
              className="absolute bottom-4 left-4 border border-[#e6eef5] bg-[#0e2940]/85 px-4 py-2 text-sm font-semibold text-[#e6eef5] transition-colors hover:bg-[#e6eef5] hover:text-[#0e2940]"
            >
              Play with sound
            </button>
          )}
        </div>
        <figcaption className="border-border flex flex-wrap justify-between gap-2 border-t px-5 py-3 text-sm">
          <span className="font-narrow font-semibold">
            Fig. 2 — Showreel, 2026
          </span>
          <span className="font-narrow text-muted-foreground">
            15 seconds, 1080p, with sound
          </span>
        </figcaption>
      </figure>
    </Section>
  );
}
