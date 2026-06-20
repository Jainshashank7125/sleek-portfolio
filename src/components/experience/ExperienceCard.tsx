import { type Experience } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import X from '../svgs/X';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ExperienceCardProps {
  experience: Experience;
}

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<b class="font-semibold text-foreground">$1</b>');
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
      {/* Company Header */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {experience.image ? (
            <Image
              src={experience.image}
              alt={experience.company}
              width={100}
              height={100}
              className="size-12 rounded-md object-contain"
            />
          ) : (
            <div className="flex size-12 items-center justify-center rounded-md border border-border bg-muted text-base font-semibold text-muted-foreground">
              {experience.company.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold tracking-tight">
                {experience.company}
              </h3>
              {experience.website && (
                <CardLink href={experience.website} label="Visit Website">
                  <Website />
                </CardLink>
              )}
              {experience.x && (
                <CardLink href={experience.x} label="Follow on X">
                  <X />
                </CardLink>
              )}
              {experience.linkedin && (
                <CardLink href={experience.linkedin} label="Connect on LinkedIn">
                  <LinkedIn />
                </CardLink>
              )}
              {experience.github && (
                <CardLink href={experience.github} label="View GitHub">
                  <Github />
                </CardLink>
              )}
              {experience.isCurrent && (
                <span className="flex items-center gap-1.5 rounded-md bg-brand-muted px-2 py-0.5 text-xs text-brand">
                  <span className="size-1.5 animate-pulse rounded-full bg-brand" />
                  Current
                </span>
              )}
            </div>
            <p className="text-muted-foreground">{experience.position}</p>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex flex-col text-sm text-muted-foreground md:text-right">
          <p className="metric-value">
            {experience.startDate} —{' '}
            {experience.isCurrent ? 'Present' : experience.endDate}
          </p>
          <p>{experience.location}</p>
        </div>
      </div>

      {/* Description */}
      <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
        {experience.description.map((description, descIndex) => (
          <li key={descIndex} className="flex items-start gap-3">
            <span className="mt-2 block size-1 shrink-0 rounded-full bg-brand/50" />
            <span
              dangerouslySetInnerHTML={{
                __html: parseDescription(description),
              }}
            />
          </li>
        ))}
      </ul>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {experience.technologies.map((tech) => (
          <span key={tech} className="tech-chip">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function CardLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="size-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          {children}
        </Link>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
