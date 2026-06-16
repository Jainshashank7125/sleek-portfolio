import { heroConfig, socialLinks } from '@/config/Hero';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import Code from '../svgs/Code';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const buttonIcons = {
  CV: CV,
  Chat: Chat,
  Code: Code,
};

export default function Hero() {
  const { eyebrow, headline, emphasis, subheadline, proof, skills, buttons } =
    heroConfig;

  // Split the headline so the emphasis phrase can be gradient-highlighted.
  const [headStart, headEnd] = emphasis
    ? headline.split(emphasis)
    : [headline, ''];

  return (
    <Container className="relative max-w-5xl pt-10 md:pt-16">
      {/* Subtle backdrop */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-brand-glow" />
      <div className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-64 bg-dot-grid opacity-60" />

      <div className="relative flex flex-col gap-6">
        <p className="eyebrow">{eyebrow}</p>

        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-balance md:text-6xl">
          {headStart}
          {emphasis && <span className="text-gradient">{emphasis}</span>}
          {headEnd}
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          {subheadline}
        </p>

        {/* Stack line */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Link
              key={skill.name}
              href={skill.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-chip"
            >
              {skill.name}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-2 flex flex-wrap gap-3">
          {buttons.map((button) => {
            const IconComponent =
              buttonIcons[button.icon as keyof typeof buttonIcons];
            return (
              <Button
                key={button.text}
                variant={button.variant as 'outline' | 'default'}
                asChild
              >
                <Link href={button.href} className="flex items-center gap-2">
                  {IconComponent && <IconComponent />}
                  {button.text}
                </Link>
              </Button>
            );
          })}
        </div>

        {/* Proof line (static) */}
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-6">
          {proof.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="metric-value text-2xl font-semibold md:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-2 flex gap-3">
          {socialLinks.map((link) => (
            <Tooltip key={link.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="size-5">{link.icon}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </Container>
  );
}
