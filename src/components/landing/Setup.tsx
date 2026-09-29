import { Link } from 'next-view-transitions';
import React from 'react';

import Section from '../common/Section';

const setup = [
  {
    name: 'Gear',
    description: 'The hardware and tools I use every day.',
    href: '/gears',
  },
  {
    name: 'Editor setup',
    description: 'My VS Code and Cursor configuration.',
    href: '/setup',
  },
];

export default function Setup() {
  return (
    <Section id="setup" heading="Off the clock">
      <ul className="grid gap-x-10 sm:grid-cols-2">
        {setup.map((item) => (
          <li key={item.name} className="border-border border-t py-5">
            <Link href={item.href} className="link-ink font-semibold">
              {item.name}
            </Link>
            <p className="text-muted-foreground mt-1 text-[0.95rem]">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
