import { socialLinks } from '@/config/Hero';
import { footerConfig } from '@/config/Footer';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from './Container';

export default function Footer() {
  return (
    <Container className="max-w-5xl py-10">
      <div className="section-rule mb-8" />
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {footerConfig.text}{' '}
          <b className="text-foreground">{footerConfig.developer}</b>
          {' · '}
          &copy; {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="size-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
