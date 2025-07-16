/*
 * CUSTOMIZATION EXAMPLE
 *
 * Want to customize this portfolio for yourself? Here's how easy it is:
 *
 * 1. Update your personal info:
 *    name: "Your Name"
 *    title: "Your Professional Title"
 *    avatar: "/path/to/your/image.jpg"
 *
 * 2. Add your skills:
 *    skills: [
 *      { name: "Python", href: "https://python.org", component: "Python" }, // Note: You'd need to create Python component
 *      { name: "React", href: "https://react.dev", component: "ReactIcon" },
 *      { name: "Node.js", href: "https://nodejs.org", component: "NodeJs" },
 *    ]
 *
 * 3. Write your description using the template:
 *    template: "I'm a **passionate developer** who loves building apps with {skills:0} and {skills:1}. I specialize in **web development** and enjoy working with {skills:2}."
 *
 * 4. Update your social links:
 *    Just change the href values to your own social media profiles
 *
 * That's it! Your portfolio will automatically update with your information.
 */
import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import X from '@/components/svgs/X';
import Flutter from '@/components/technologies/Flutter';
import Java from '@/components/technologies/Java';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import ReactIcon from '@/components/technologies/ReactIcon';
// Technology Components
import TypeScript from '@/components/technologies/TypeScript';

// Component mapping for skills
export const skillComponents = {
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  PostgreSQL: PostgreSQL,
  NodeJS: NodeJs,
  MongoDB: MongoDB,
  JavaScript: JavaScript,
  Flutter: Flutter,
  Java: Java,
};

export const heroConfig = {
  // Personal Information
  name: 'Shashank Jain',
  title: 'A Full Stack developer.',
  avatar: '/assets/logo.png',

  // Skills Configuration
  skills: [
    {
      name: 'Typescript',
      href: 'https://www.typescriptlang.org/',
      component: 'TypeScript',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Node',
      href: 'https://nodejs.org/',
      component: 'NodeJS',
    },
    {
      name: 'Java',
      href: 'https://java.com/',
      component: 'Java',
    },
    {
      name: 'Flutter',
      href: 'https://flutter.dev/',
      component: 'Flutter',
    },
    {
      name: 'PostgreSQL',
      href: 'https://www.postgresql.org/',
      component: 'PostgreSQL',
    },
    {
      name: 'MongoDB',
      href: 'https://www.mongodb.com/',
      component: 'MongoDB',
    },
  ],

  // Description Configuration
  description: {
    template:
      'I build interactive, scalable, cloud-native applications web & mobile apps using {skills:0}, {skills:1}, {skills:2}, {skills:3}, {skills:4} and {skills:5}. Passionate about system architecture, performance optimization, and delivering robust solutions with a focus on GenAI and cloud technologies.',
  },

  // Buttons Configuration
  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
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
