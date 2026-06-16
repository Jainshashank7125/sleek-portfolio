import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from './Container';
import ThemeSwitch from './ThemeSwitch';

export default function Navbar() {
  return (
    <Container className="sticky top-0 z-50 max-w-5xl py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/" className="font-semibold tracking-tight">
            <Image
              className="size-9 rounded-md border border-border transition-all duration-300 ease-in-out hover:scale-95"
              src={navbarConfig.logo.src}
              alt={navbarConfig.logo.alt}
              width={navbarConfig.logo.width}
              height={navbarConfig.logo.height}
            />
          </Link>
          <div className="flex items-center gap-4 text-sm">
            {navbarConfig.navItems.map((item) => (
              <Link
                className="text-muted-foreground transition-colors hover:text-foreground"
                key={item.label}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
        </div>
      </div>
    </Container>
  );
}
