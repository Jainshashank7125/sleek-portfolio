import { type Project } from '@/types/project';
import React from 'react';

import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  className?: string;
  startIndex?: number;
  emptyMessage?: string;
}

export function ProjectList({
  projects,
  className,
  startIndex = 1,
  emptyMessage = 'No projects in this group yet.',
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="border-border border-y py-10">
        <p className="font-editorial text-muted-foreground text-xl">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {projects.map((project, offset) => (
        <ProjectCard
          key={project.title}
          project={project}
          index={startIndex + offset}
        />
      ))}
    </div>
  );
}
