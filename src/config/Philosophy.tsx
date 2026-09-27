export interface Principle {
  title: string;
  description: string;
}

export const philosophy: Principle[] = [
  {
    title: 'Business rules need clear ownership',
    description:
      'Rules that change often should not be scattered across controllers, serializers, workers, and frontend conditionals. The application executes decisions; a dedicated rules layer owns them.',
  },
  {
    title: 'Execution is not business success',
    description:
      'A worker exiting cleanly does not mean the claim, file, or document was processed. I validate domain state, not just infrastructure state.',
  },
  {
    title: 'Optimize using real workloads',
    description:
      'Profiling the real data path beats micro-optimizing functions — that is how a 14,400-page ingestion went from ~19 minutes to ~85 seconds.',
  },
  {
    title: 'Idempotency matters',
    description:
      'Healthcare pipelines retry, reprocess, and backfill constantly. Operations should be safe to run more than once whenever possible.',
  },
  {
    title: 'Observability is part of the feature',
    description:
      'For async workflows, knowing why something failed and where it stopped is almost as important as the workflow itself.',
  },
  {
    title: 'AI should enhance workflows',
    description:
      'AI earns its place when it removes real operational work from billing teams and providers — measured and observable, not added because it is novel.',
  },
];
