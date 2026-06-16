export interface ExpertisePillar {
  title: string;
  description: string;
}

export const expertise: ExpertisePillar[] = [
  {
    title: 'AI Systems',
    description:
      'Production LLM agent systems — conversation engines, agent tools, and artifact generation — with eval-driven prompt engineering and tracing to catch regressions before they ship.',
  },
  {
    title: 'Backend Architecture',
    description:
      'REST and event-driven services in Java/Spring Boot and Python/FastAPI, designed for throughput, idempotency, and clean domain boundaries.',
  },
  {
    title: 'Multi-Tenant SaaS',
    description:
      'Schema-based tenant isolation on PostgreSQL with role-based access control and per-tenant configuration, serving 10+ enterprise clients without cross-org leakage.',
  },
  {
    title: 'Cloud Infrastructure',
    description:
      'AWS serverless (Lambda, SQS, API Gateway, RDS) with dead-letter queues, retries, and Terraform-managed, reproducible environments.',
  },
  {
    title: 'Full Stack Development',
    description:
      'End-to-end product surfaces in React, Next.js, and TypeScript — from database schema and API design to polished, accessible UI.',
  },
  {
    title: 'Automation Platforms',
    description:
      'Rules engines (Drools), CI/CD pipelines, and AI workflows that remove repetitive work and keep business logic maintainable at scale.',
  },
];
