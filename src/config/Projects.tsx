import AWS from '@/components/technologies/AWS';
import Dart from '@/components/technologies/Dart';
import Docker from '@/components/technologies/Docker';
import ExpressJs from '@/components/technologies/ExpressJs';
import Firebase from '@/components/technologies/Firebase';
import Flutter from '@/components/technologies/Flutter';
import Java from '@/components/technologies/Java';
import MongoDB from '@/components/technologies/MongoDB';
import MySQL from '@/components/technologies/MySql';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import ReactIcon from '@/components/technologies/ReactIcon';
import Spring from '@/components/technologies/Spring';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import { Project } from '@/types/project';

export const projects: Project[] = [
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
      'Built reusable authentication module supporting OAuth2 + Biometrics deployed in 3 production apps. Implemented offline-first sync with 250ms latency using Hive for local storage. Achieved 100% security audit pass rate with penetration testing.',
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
