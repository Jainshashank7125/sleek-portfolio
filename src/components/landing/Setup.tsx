import { ArrowRight } from 'lucide-react';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Code from '../svgs/Code';
import Gear from '../svgs/Gear';
import { Card } from '../ui/card';

const setup = [
  {
    name: 'Gears Used',
    description: 'Productivity Tools, Gears i use to get my work done.',
    icon: <Gear className="size-4" />,
    href: '/gears',
  },
  {
    name: 'VS Code / Cursor Setup',
    description: 'VS Code / Cursor Setup i use daily.',
    icon: <Code className="size-4" />,
    href: '/setup',
  },
];

export default function Setup() {
  return (
    <Container className="mt-24 max-w-5xl">
      <SectionHeading subHeading="Off the clock" heading="Setup & Gears" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {setup.map((item) => (
          <Link className="group" href={item.href} key={item.name}>
            <Card className="card-hover flex h-full flex-row items-center justify-between gap-4 px-5 py-4 shadow-none">
              <div className="flex items-center justify-center rounded-md bg-muted p-2 text-muted-foreground">
                {item.icon}
              </div>
              <div className="flex w-full flex-col">
                <h3 className="text-base font-semibold tracking-tight">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
