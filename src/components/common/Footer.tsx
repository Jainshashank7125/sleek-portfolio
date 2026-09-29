import { socialLinks } from '@/config/Hero';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from './Container';

export default function Footer() {
  return (
    <Container className="max-w-5xl pt-6 pb-12">
      <footer className="sheet grid text-sm sm:grid-cols-3">
        <div className="border-border border-b px-5 py-4 sm:border-r sm:border-b-0">
          <p className="font-narrow text-muted-foreground text-xs">Drawn by</p>
          <p className="font-semibold">Shashank Jain</p>
        </div>
        <div className="border-border border-b px-5 py-4 sm:border-r sm:border-b-0">
          <p className="font-narrow text-muted-foreground text-xs">Contact</p>
          <ul className="mt-0.5 flex flex-wrap gap-x-4 gap-y-1">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  {...(link.href.startsWith('mailto:')
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="link-ink font-medium"
                >
                  {link.name === 'X' ? 'X (Twitter)' : link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-5 py-4">
          <p className="font-narrow text-muted-foreground text-xs">Revision</p>
          <p className="font-semibold" suppressHydrationWarning>
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </Container>
  );
}
