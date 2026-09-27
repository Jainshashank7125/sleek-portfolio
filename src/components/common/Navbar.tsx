'use client';

import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import React from 'react';

import ThemeSwitch from './ThemeSwitch';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/90 sticky top-0 z-50 border-b backdrop-blur-sm">
      <nav className="container mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="shrink-0 text-[1.05rem] font-semibold tracking-tight whitespace-nowrap sm:[font-stretch:125%]"
        >
          Shashank Jain
        </Link>
        <div className="flex items-center gap-2 sm:gap-6">
          <ul className="flex items-center gap-2.5 text-sm sm:gap-5">
            {navbarConfig.navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`font-narrow font-semibold transition-colors ${
                      active
                        ? 'text-foreground underline decoration-2 underline-offset-[6px]'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}
