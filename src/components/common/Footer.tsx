import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { footerConfig } from '@/config/Footer';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from './Container';

export default function Footer() {
  return (
    <footer className="mt-16">
      <Container>
        <div className="border-t border-border py-12 sm:py-16">
          <SectionLabel index="08">End note</SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <h2 className="font-editorial max-w-3xl text-4xl leading-[0.98] tracking-[-0.04em] text-balance sm:text-6xl">
                {footerConfig.headline}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {footerConfig.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 lg:max-w-xs lg:justify-end">
              {footerConfig.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs tracking-[0.08em] uppercase text-muted-foreground hover:text-brand"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-border pt-5 font-mono text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Designed and built by Shashank Jain · {new Date().getFullYear()}</p>
            <a
              href="#main-content"
              className="inline-flex min-h-11 items-center text-foreground hover:text-brand"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
