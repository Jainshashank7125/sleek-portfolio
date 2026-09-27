import { type Project } from '@/types/project';
import React from 'react';

import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  className?: string;
}

export function ProjectList({ projects, className = '' }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <p className="text-muted-foreground py-8">No projects to show yet.</p>
    );
  }

  return (
    <div className={`sheet divide-border divide-y ${className}`}>
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
