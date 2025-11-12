import AWS from '@/components/technologies/AWS';
import Dart from '@/components/technologies/Dart';
import Docker from '@/components/technologies/Docker';
import ExpressJs from '@/components/technologies/ExpressJs';
import Firebase from '@/components/technologies/Firebase';
import Flutter from '@/components/technologies/Flutter';
import FramerMotion from '@/components/technologies/FramerMotion';
import Gemini from '@/components/technologies/Gemini';
import Java from '@/components/technologies/Java';
import Jest from '@/components/technologies/Jest';
import MongoDB from '@/components/technologies/MongoDB';
import MySQL from '@/components/technologies/MySql';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import OpenAI from '@/components/technologies/OpenAI';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import ReactIcon from '@/components/technologies/ReactIcon';
import Spring from '@/components/technologies/Spring';
import Supabase from '@/components/technologies/Supabase';
import Swagger from '@/components/technologies/Swagger';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Coupon Management API',
    description:
      'Production-ready RESTful API for e-commerce discount coupons supporting cart-wise, product-wise, and BxGy (Buy X Get Y) discount types. Features comprehensive validation, usage limits, expiration handling, and detailed discount calculations with Swagger documentation.',
    image: '/project/coupon-api.png',
    technologies: [
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'Express.js', icon: <ExpressJs key="express" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Supabase', icon: <Supabase key="supabase" /> },
      { name: 'Docker', icon: <Docker key="docker" /> },
      { name: 'Jest', icon: <Jest key="jest" /> },
      { name: 'Swagger', icon: <Swagger key="swagger" /> },
    ],
    github: 'https://github.com/Jainshashank7125/coupon-management-api',
    live: 'https://coupon-management-api.onrender.com', // Add your deployment URL when available
    link: '', // Add demo link if available
    projectDetailsPageSlug: '/projects/coupon-management',
    details: true, // Set to true since you have comprehensive documentation
    isWorking: true,
  },
  {
    title: 'WhiteCarrot ATS - Careers Page Builder',
    description:
      'Multi-tenant careers page builder enabling recruiters to create branded company pages with custom sections, job listings, and CSV bulk import. Features per-user drafts, secure preview tokens, and real-time collaboration with conflict resolution.',
    image: '/project/whitecarrot-ats.png',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Supabase', icon: <Supabase key="supabase" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwind" /> },
      { name: 'Framer Motion', icon: <FramerMotion key="framer" /> },
    ],
    github: 'https://github.com/Jainshashank7125/whitecarrort-ats-branded',
    live: '', // Add your production URL when deployed
    link: '', // Add demo link if different from live
    projectDetailsPageSlug: '/projects/whitecarrot-ats',
    details: true, // This project has comprehensive features worth detailing
    isWorking: true, // Assuming this is actively developed
  },
  {
    title: 'AI Agent Form - Intelligent Copilot Assistant',
    description:
      'Interactive Next.js application featuring an AI-powered copilot that guides users through form submission. Implements real-time form updates, conversational AI integration, and step-by-step user guidance with field validation.',
    image: '/project/ai-agent-form.png',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwind" /> },
      { name: 'Gemini API', icon: <Gemini key="gemini" /> },
    ],
    github: 'https://github.com/Jainshashank7125/ai-agent-idea',
    live: 'https://ai-agent-idea.vercel.app/', // Add your deployment URL here
    link: '', // Add any additional link here
    projectDetailsPageSlug: '/projects/ai-agent-form',
    details: true, // Since this has detailed implementation
    isWorking: true, // Currently functional
  },
  {
    title: 'Health Care Platform (Mobex Health Suite)',
    description:
      'Designed real-time data pipeline processing 50K+ daily events using AWS Lambda, reduced clinic operational costs by 40%. Implemented QR-based patient onboarding with Flutter, decreasing check-in time by 60%. Integrated CloudWatch monitoring, reducing MTTR by 60%.',
    image: '/project/mobex.png',
    technologies: [
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Flutter', icon: <Flutter key="flutter" /> },
      { name: 'Dart', icon: <Dart key="dart" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
      { name: 'AWS', icon: <AWS key="aws" /> },
      { name: 'Docker', icon: <Docker key="docker" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Express.js', icon: <ExpressJs key="expressjs" /> },
    ],
    github: '',
    live: '',
    link: '',
    projectDetailsPageSlug: '/projects/mobex',
    details: false,
    isWorking: false,
  },
  {
    title: 'Multi-tenant SaaS Platform',
    description:
      'Built tenant isolation architecture supporting 10+ organizations with RBAC and data partitioning. Deployed Kafka event streaming reducing notification latency from 2s to 200ms for 100K+ users.',
    image: '/project/saas.png',
    technologies: [
      { name: 'Node', icon: <NodeJs key="node" /> },
      { name: 'Flutter', icon: <Flutter key="flutter" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Tailwind', icon: <TailwindCss key="tailwind" /> },
      { name: 'MySQL', icon: <MySQL key="mysql" /> },
      { name: 'Docker', icon: <Docker key="docker" /> },
      { name: 'AWS', icon: <AWS key="aws" /> },
    ],
    github: '',
    live: '',
    link: '',
    projectDetailsPageSlug: '/projects/saas',
    details: false,
    isWorking: false,
  },
  {
    title: 'Cross-Platform Auth SDK',
    description:
      'Built reusable authentication module supporting OAuth2 + Biometrics deployed in 3 production apps. Implemented offline-first sync with 250ms latency using Hive for local storage.',
    image: '/project/authsdk.png',
    technologies: [
      { name: 'Flutter', icon: <Flutter key="flutter" /> },
      { name: 'Dart', icon: <Dart key="dart" /> },
      { name: 'Firebase', icon: <Firebase key="firebase" /> },
      { name: 'AWS', icon: <AWS key="aws" /> },
    ],
    github: '',
    live: '',
    link: '',
    projectDetailsPageSlug: '/projects/authsdk',
    details: false,
    isWorking: false,
  },
  {
    title: 'Enterprise Organization Management System',
    description:
      'Designed and implemented a scalable platform serving 50K+ users across departments, reducing system latency by 65% via Redis caching and SQL query optimization. Developed RESTful APIs handling over 1M+ monthly requests with JWT-based authentication and rate limiting, ensuring 99.95% uptime. Integrated Kafka for real-time notifications, reducing latency from 2s to 200ms. Created custom data visualization components improving user engagement by 25%.',
    image: '/project/enterprise.png',
    technologies: [
      { name: 'Java', icon: <Java key="java" /> },
      { name: 'Springboot', icon: <Spring key="springboot" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind', icon: <TailwindCss key="tailwind" /> },
      { name: 'AWS', icon: <AWS key="aws" /> },
    ],
    github: '',
    live: '',
    link: '',
    projectDetailsPageSlug: '/projects/enterprise',
    details: false,
    isWorking: false,
  },
  {
    title: 'Polls Application',
    description:
      'Developed complete polling platform supporting 1k+ concurrent users with real-time results. Implemented role-based access control and logging using log4j.',
    image: '/project/polls.png',
    technologies: [
      { name: 'Java', icon: <Java key="java" /> },
      { name: 'Springboot', icon: <Spring key="springboot" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Tailwind', icon: <TailwindCss key="tailwind" /> },
    ],
    github: 'https://github.com/Jainshashank7125/java_polls_application',
    live: '',
    link: '',
    projectDetailsPageSlug: '/projects/polls',
    details: false,
    isWorking: false,
  },
];
