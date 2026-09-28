'use client';

import type { NavItem } from '@/config/Navbar';
import { List, X } from '@phosphor-icons/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface MobileNavigationProps {
  items: NavItem[];
  pathname: string;
}

export default function MobileNavigation({
  items,
  pathname,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex size-11 items-center justify-center border border-transparent hover:border-border hover:text-brand"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <List className="size-5" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full border-b border-border bg-background"
        >
          <ul className="mx-auto grid w-full max-w-[90rem] px-5 py-4 sm:px-8">
            {items.map((item, index) => {
              const isCurrent =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href} className="border-t border-border first:border-t-0">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isCurrent ? 'page' : undefined}
                    className="flex min-h-12 items-center justify-between py-3 font-editorial text-xl hover:text-brand"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[0.65rem] text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
