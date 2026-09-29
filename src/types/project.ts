export interface Project {
  title: string;
  category?: string;
  description: string;
  problem?: string;
  metric?: string;
  image?: string;
  link: string;
  technologies: string[];
  github: string;
  live: string;
  details: boolean;
  projectDetailsPageSlug: string;
  isWorking: boolean;
  confidential?: boolean;
  /** Revenue-cycle stages this project touches (matches the hero schematic). */
  stages?: string[];
  /** Case study from a previous role — listed under "Earlier work". */
  earlier?: boolean;
}

export interface ProjectCaseStudyFrontmatter {
  title: string;
  category?: string;
  description: string;
  problem?: string;
  outcome?: string;
  image?: string;
  technologies: string[];
  github: string;
  live: string;
  timeline: string;
  role: string;
  team?: string;
  status: 'completed' | 'in-progress' | 'archived';
  featured: boolean;
  confidential?: boolean;
  challenges?: string[];
  learnings?: string[];
  isPublished: boolean;
}

export interface ProjectCaseStudy {
  slug: string;
  frontmatter: ProjectCaseStudyFrontmatter;
  content: string;
}

export interface ProjectCaseStudyPreview {
  slug: string;
  frontmatter: ProjectCaseStudyFrontmatter;
}
