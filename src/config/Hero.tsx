import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import X from '@/components/svgs/X';

export const heroConfig = {
  // Personal Information
  name: 'Shashank Jain',
  title: 'Product-Oriented Full-Stack Engineer',
  avatar: '/assets/logo.png',

  // Current role eyebrow
  eyebrow: 'Engineer / Builder / Problem Solver',

  // Headline + subheadline (PRD copy)
  headline: 'Product-Oriented Full-Stack Engineer',
  emphasis: 'Full-Stack Engineer',
  subheadline:
    'I build and operate end-to-end systems where product workflows, backend architecture, asynchronous processing, external integrations, data, and cloud infrastructure meet.',

  // Proof line (static — no animated counters)
  proof: [
    { value: 'End-to-end ownership', label: 'From ingestion to production' },
    { value: 'Built for recovery', label: 'Async, observable, idempotent' },
  ],

  // Skills (names used by the AI assistant prompt + hero stack line)
  skills: [
    { name: 'Java / Spring Boot', href: 'https://spring.io/projects/spring-boot' },
    { name: 'Python / FastAPI', href: 'https://fastapi.tiangolo.com/' },
    { name: 'TypeScript', href: 'https://www.typescriptlang.org/' },
    { name: 'React / Next.js', href: 'https://nextjs.org/' },
    { name: 'Node.js', href: 'https://nodejs.org/' },
    { name: 'PostgreSQL', href: 'https://www.postgresql.org/' },
    { name: 'AWS', href: 'https://aws.amazon.com/' },
  ],

  // Buttons Configuration (3 CTAs)
  buttons: [
    {
      variant: 'default',
      text: 'Explore Case Studies',
      href: '/projects',
      icon: 'Code',
    },
    {
      variant: 'outline',
      text: 'View Resume',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'outline',
      text: 'Contact Me',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/Jainshashank7',
    icon: <X />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shashankjain7125/',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/Jainshashank7125',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:sjainsahajpur7125@gmail.com',
    icon: <Mail />,
  },
];
