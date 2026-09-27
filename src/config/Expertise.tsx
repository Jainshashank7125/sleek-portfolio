export interface ExpertisePillar {
  title: string;
  description: string;
}

export const expertise: ExpertisePillar[] = [
  {
    title: 'Healthcare RCM Workflows',
    description:
      'Claims ingestion, classification, claim-status automation, denials, ADR/MDR, and work assignment — treating the revenue cycle as a distributed workflow, not just "submit and get paid".',
  },
  {
    title: 'Backend & Async Processing',
    description:
      'Django and FastAPI services with Celery workers, where success means the business operation actually completed — idempotent, retry-safe, and observable.',
  },
  {
    title: 'Healthcare Integrations',
    description:
      'Clearinghouse APIs such as Stedi — mapping internal claim models to requests, interpreting responses, and keeping transport state separate from claim state.',
  },
  {
    title: 'Cloud Infrastructure',
    description:
      'AWS ECS, RDS, S3, ECR, and CloudFront provisioned with Terraform and shipped through GitHub Actions — including private networking and cross-account database operations.',
  },
  {
    title: 'Document Ingestion & Performance',
    description:
      'Large, mixed-content healthcare PDFs processed at scale — profiled on real workloads, rendered only when needed, and segmented deterministically into S3.',
  },
  {
    title: 'AI & Full-Stack Product',
    description:
      'An AI layer on top of real operational workflows, plus React product surfaces — from database schema and API representation to what the user actually sees.',
  },
];
