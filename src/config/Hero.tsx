import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import X from '@/components/svgs/X';

export const heroConfig = {
  // Personal Information
  name: 'Shashank Jain',
  title: 'AI Development Engineer',
  avatar: '/assets/logo.png',

  // Headline + subheadline
  headline: 'I build the software between a claim and a payment.',
  subheadline:
    'AI Development Engineer at Nodaris AI, working on the US healthcare revenue cycle: claims automation, clearinghouse integrations, document ingestion, and the AWS infrastructure underneath. Before healthcare, I built AI agent systems and multi-tenant SaaS.',

  // Skills (names used by the AI assistant prompt + hero stack line)
  skills: [
    { name: 'Python / Django', href: 'https://www.djangoproject.com/' },
    { name: 'FastAPI', href: 'https://fastapi.tiangolo.com/' },
    { name: 'React', href: 'https://react.dev/' },
    { name: 'PostgreSQL', href: 'https://www.postgresql.org/' },
    { name: 'Celery / Redis', href: 'https://docs.celeryq.dev/' },
    { name: 'AWS (ECS · RDS · S3)', href: 'https://aws.amazon.com/' },
    { name: 'Terraform', href: 'https://www.terraform.io/' },
  ],

  // Buttons Configuration (3 CTAs)
  buttons: [
    {
      variant: 'default',
      text: 'See the work',
      href: '/projects',
      icon: 'Code',
    },
    {
      variant: 'outline',
      text: 'Résumé',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'outline',
      text: 'Get in touch',
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
    name: 'GitHub',
    href: 'https://github.com/Jainshashank7125',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:sjainsahajpur7125@gmail.com',
    icon: <Mail />,
  },
];
