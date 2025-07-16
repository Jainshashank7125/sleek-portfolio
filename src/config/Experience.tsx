import AWS from '@/components/technologies/AWS';
import Azure from '@/components/technologies/Azure';
import CSharp from '@/components/technologies/CSharp';
import Docker from '@/components/technologies/Docker';
import ExpressJs from '@/components/technologies/ExpressJs';
import Figma from '@/components/technologies/Figma';
import Flutter from '@/components/technologies/Flutter';
import Java from '@/components/technologies/Java';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
import ReactIcon from '@/components/technologies/ReactIcon';
import Redis from '@/components/technologies/Redis';
import Spring from '@/components/technologies/Spring';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Unity from '@/components/technologies/Unity';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    company: 'Hexaview Technologies Inc.',
    position: 'Software Developer',
    location: 'Pune, India (Remote)',
    image: '/company/hexaview.png',
    description: [
      'Engineered 5+ HIPAA-compliant healthcare applications using Spring Boot and Node.js, serving 20K+ users with 99.9% uptime.',
      'Optimized SQL queries and implemented Redis caching to reduce API latency by 65% for 50K+ user platform.',
      'Developed 15+ RESTful microservices handling 1M+ monthly requests with JWT authentication and rate limiting.',
      'Automated CI/CD pipelines using Docker and Jenkins, cutting deployment time by 40% and enabling zero-downtime releases.',
      'Mentored 4 junior developers through code reviews and pair programming, improving team velocity by 25%.',
      'Architected reusable React component library that accelerated UI development by 30% and boosted user engagement by 25%.',
    ],
    startDate: 'Sep 2022',
    endDate: 'Present',
    website: 'https://hexaviewtech.com',
    linkedin: 'https://www.linkedin.com/company/hexaview/',
    github: 'https://github.com/jainshashank7125',
    technologies: [
      { name: 'Flutter', href: 'https://www.flutter.dev/', icon: <Flutter /> },
      { name: 'Java', href: 'https://www.java.com/', icon: <Java /> },
      {
        name: 'JavaScript',
        href: 'https://www.javascript.com/',
        icon: <JavaScript />,
      },
      {
        name: 'Spring Boot',
        href: 'https://spring.io/projects/spring-boot',
        icon: <Spring />,
      },
      { name: 'Node.js', href: 'https://nodejs.org/', icon: <NodeJs /> },
      {
        name: 'Express.js',
        href: 'https://expressjs.com/',
        icon: <ExpressJs />,
      },
      { name: 'React', href: 'https://react.dev/', icon: <ReactIcon /> },
      {
        name: 'Tailwind',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      { name: 'Docker', href: 'https://www.docker.com/', icon: <Docker /> },
      { name: 'AWS', href: 'https://aws.amazon.com/', icon: <AWS /> },
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org/',
        icon: <PostgreSQL />,
      },
      { name: 'MongoDB', href: 'https://mongodb.com/', icon: <MongoDB /> },
      { name: 'Redis', href: 'https://redis.io/', icon: <Redis /> },
      {
        name: 'TypeScript',
        href: 'https://www.typescriptlang.org/',
        icon: <TypeScript />,
      },
      { name: 'Postman', href: 'https://www.postman.com/', icon: <Postman /> },
      { name: ' Figma', href: 'https://www.figma.com/', icon: <Figma /> },
    ],
  },
  {
    isCurrent: false,
    company: 'TechXR Innovations Pvt. Ltd.',
    position: 'AR/VR Development Intern',
    location: 'Remote',
    image: '/company/techxr.png',
    description: [
      'Built prototype AR/VR applications with a focus on immersive user experiences using Unity and C#.',
      'Explored 3D object manipulation, spatial interactions, and basic AR-based UI components for learning tools.',
      'Collaborated with the design team to conceptualize user flow in virtual environments.',
    ],
    startDate: 'Jan 2022',
    endDate: 'Feb 2022',
    website: 'https://techxr.co',
    technologies: [
      { name: 'Unity', href: 'https://unity.com/', icon: <Unity /> },
      {
        name: 'C#',
        href: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
        icon: <CSharp />,
      },
      { name: 'AR/VR', href: '#', icon: <></> },
    ],
  },
  {
    isCurrent: false,
    company: 'Microsoft',
    position: 'Student Intern (Future Ready Talent Program)',
    location: 'Remote',
    image: '/company/microsoft.png',
    description: [
      'Completed Microsoft Future Ready Talent virtual internship, gaining hands-on exposure to Azure cloud services.',
      'Developed a cloud-based solution project leveraging Azure App Services and Azure SQL Database.',
      'Achieved Azure Fundamentals certification by demonstrating core knowledge of cloud concepts and services.',
    ],
    startDate: 'Oct 2021',
    endDate: 'Jan 2022',
    website: 'https://futurereadytalent.in/',
    technologies: [
      {
        name: 'Microsoft Azure',
        href: 'https://azure.microsoft.com/',
        icon: <Azure />,
      }, // Reuse AWS icon or add a proper Azure one
      {
        name: 'Azure App Services',
        href: 'https://azure.microsoft.com/en-in/products/app-service/',
        icon: <></>,
      },
      {
        name: 'Azure SQL',
        href: 'https://azure.microsoft.com/en-us/products/azure-sql/',
        icon: <></>,
      },
    ],
  },
];
