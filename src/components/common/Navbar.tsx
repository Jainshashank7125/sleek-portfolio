'use client';

import { FieldNote } from '@/components/field-notes/FieldNote';
import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import React from 'react';

import Container from './Container';
import MobileNavigation from './MobileNavigation';
import ThemeSwitch from './ThemeSwitch';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-5 border-b border-border lg:min-h-20">
          <Link
            href={navbarConfig.home.href}
            aria-label={navbarConfig.home.label}
            className="flex shrink-0 items-center gap-4 text-foreground"
          >
            <span className="font-editorial text-2xl font-bold tracking-[-0.06em]">
              SJ
            </span>
            <span
              className="hidden border-l border-border pl-4 font-mono text-[0.65rem] leading-tight tracking-[0.14em] uppercase sm:block"
              aria-hidden="true"
            >
              Systems
              <br />
              Field Notes
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navbarConfig.navItems.map((item) => {
                const isCurrent =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={`font-editorial text-base transition-colors hover:text-brand ${
                        isCurrent ? 'text-brand' : 'text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <FieldNote className="mr-3 hidden max-w-36 text-xs xl:block">
              Better systems for real problems.
            </FieldNote>
            <ThemeSwitch />
            <MobileNavigation
              items={navbarConfig.navItems}
              pathname={pathname}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
