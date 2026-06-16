export interface Principle {
  title: string;
  description: string;
}

export const philosophy: Principle[] = [
  {
    title: 'Build for maintainability',
    description:
      "Code is read far more than it's written. I favor clear boundaries, boring solutions, and architecture the next engineer can reason about without a tour.",
  },
  {
    title: 'Automate repetitive work',
    description:
      'If I do it twice by hand, I script it. Rules engines, CI/CD pipelines, and AI workflows exist to delete toil — not to look clever.',
  },
  {
    title: 'Design for scale',
    description:
      'Idempotency, queues, caching, and tenant isolation are decisions made early, because they are expensive and risky to retrofit later.',
  },
  {
    title: 'Measure before optimizing',
    description:
      'I instrument first. Latency, error rates, and real usage data decide what to optimize — not hunches or premature cleverness.',
  },
  {
    title: 'AI should enhance workflows',
    description:
      'AI earns its place when it removes real human work, backed by evals and tracing so quality is observable — not because it is novel.',
  },
];
