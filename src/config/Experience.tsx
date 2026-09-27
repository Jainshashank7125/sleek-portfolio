export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website?: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: string[];
  isCurrent: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    company: 'Nodaris AI',
    position: 'AI Development Engineer',
    location: 'Remote',
    image: '',
    description: [
      'Building AI-enabled software for *US healthcare Revenue Cycle Management* — an AI layer across the RCM process for billing companies and providers, plus a product suite that lets providers manage their revenue cycle *in-house*.',
      'Work across *claims processing and claim-status automation*: file ingestion and validation, *Celery*-based async processing, rule-driven claim classification, and clearinghouse integrations (*Stedi*) for claim-status sweeps.',
      'Redesigned a healthcare PDF ingestion path for a real *14,400-page* workload, cutting processing from *~19 minutes to ~85 seconds* and eliminating *~5.5 GB* of unnecessary rendered-image data.',
      'Made async workflows reliable — detecting *Celery false-success* runs, per-patient scanned-document processing, and *idempotent backfills* for historical documents.',
      'Own infrastructure alongside application code: *AWS ECS, RDS, S3, ECR, CloudFront*, *Terraform*, and *GitHub Actions*, including cross-account, cross-region database refreshes.',
    ],
    startDate: 'Aug 2026',
    endDate: 'Present',
    technologies: [
      'Python',
      'Django',
      'FastAPI',
      'React',
      'PostgreSQL',
      'Celery',
      'Redis',
      'AWS',
      'Terraform',
      'Docker',
      'GitHub Actions',
      'Stedi',
    ],
  },
  {
    isCurrent: false,
    company: 'Quido Fintech Pvt. Ltd.',
    position: 'Software Development Engineer',
    location: 'India (Remote)',
    image: '',
    description: [
      'Built secure, high-throughput *AI full-stack systems* across multiple domains using *Python*, *Java*, and *PostgreSQL*, with a focus on real-time data processing.',
      'Developed *AI-powered platforms* with *Python FastAPI* and *OpenAI*, processing 10K+ monthly requests through automated, intelligent workflows and real-time WebSocket connections.',
      'Implemented a *Drools rule-engine pipeline* for consolidated, maintainable business logic across the healthcare-provider credentialing workflow.',
      'Founding engineer on *Deeply*, an AI relationship platform — built a production LLM agent system (*Anthropic Claude SDK*), eval-driven prompts in *Langfuse*, and a per-PR *Supabase* branch-database CI/CD pipeline.',
    ],
    startDate: 'Jan 2026',
    endDate: 'Aug 2026',
    technologies: [
      'Python',
      'FastAPI',
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'OpenAI',
      'Anthropic Claude SDK',
      'Drools',
      'AWS',
      'Redis',
      'Next.js',
      'TypeScript',
      'Supabase',
    ],
  },
  {
    isCurrent: false,
    company: 'Hexaview Technologies Inc.',
    position: 'Senior Application Engineer',
    location: 'Pune, India (Remote)',
    image: '/company/hexaview.png',
    description: [
      'Led *full-stack development* for 5+ scalable applications using *Flutter, React, TypeScript, and Java Spring Boot*, owning the full SDLC from schema design to production deployment.',
      'Designed a *schema-based multi-tenant PostgreSQL* architecture supporting *10+ enterprise clients* with strict data isolation and role-based access control.',
      'Built *event-driven systems* using *AWS Lambda and SQS* with dead-letter queues and automatic retry mechanisms.',
      'Optimized SQL queries and added *Redis caching*, reducing API latency by *65%* on a 50K+ user platform.',
      'Received the *Top Performer Award* for delivering a critical platform two weeks ahead of schedule.',
    ],
    startDate: 'Sep 2022',
    endDate: 'Dec 2025',
    website: 'https://hexaviewtech.com',
    linkedin: 'https://www.linkedin.com/company/hexaview/',
    github: 'https://github.com/jainshashank7125',
    technologies: [
      'Java',
      'Spring Boot',
      'Flutter',
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'AWS',
      'Docker',
    ],
  },
  {
    isCurrent: false,
    company: 'TechXR Innovations Pvt. Ltd.',
    position: 'AR/VR Development Intern',
    location: 'Remote',
    image: '/company/techxr.png',
    description: [
      'Built prototype AR/VR applications focused on immersive user experiences using *Unity* and *C#*.',
      'Explored 3D object manipulation, spatial interactions, and AR-based UI components for learning tools.',
    ],
    startDate: 'Jan 2022',
    endDate: 'Feb 2022',
    website: 'https://techxr.co',
    technologies: ['Unity', 'C#', 'AR/VR'],
  },
  {
    isCurrent: false,
    company: 'Microsoft',
    position: 'Student Intern (Future Ready Talent)',
    location: 'Remote',
    image: '/company/microsoft.png',
    description: [
      'Completed the Microsoft Future Ready Talent virtual internship with hands-on exposure to *Azure* cloud services.',
      'Built a cloud-based solution using *Azure App Service* and *Azure SQL*, and earned the *Azure Fundamentals* certification.',
    ],
    startDate: 'Oct 2021',
    endDate: 'Jan 2022',
    website: 'https://futurereadytalent.in/',
    technologies: ['Microsoft Azure', 'Azure App Service', 'Azure SQL'],
  },
];
