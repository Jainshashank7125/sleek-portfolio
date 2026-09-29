export type StageKind = 'step' | 'paid' | 'denied' | 'layer';

export interface Stage {
  id: string;
  label: string;
  kind: StageKind;
  title: string;
  body: string;
  result?: string;
  href?: string;
  linkText?: string;
}

// The hero schematic: how a claim moves through the revenue cycle, and the
// part of it I built. Keep this employer-safe — no client names or internals.
export const stages: Stage[] = [
  {
    id: 'documents',
    label: 'Documents',
    kind: 'step',
    title: 'Medical records and attachments',
    body: 'Large healthcare PDFs are ingested and tied back to patients and claims. I rebuilt the processing path so pages are only rendered as images when text can’t be extracted directly.',
    result: '14,400 pages in ~85 seconds, down from ~19 minutes',
    href: '/projects/healthcare-document-ingestion',
    linkText: 'Read the ingestion case study',
  },
  {
    id: 'intake',
    label: 'Claim intake',
    kind: 'step',
    title: 'Claim intake',
    body: 'Claim files are uploaded, schema-validated and ingested, then processed asynchronously by Celery workers.',
    href: '/projects/healthcare-claims-automation',
    linkText: 'Read the claims case study',
  },
  {
    id: 'rules',
    label: 'Rules',
    kind: 'step',
    title: 'Classification and routing',
    body: 'A separate rules layer owns the business decisions and sorts each claim into an operational bucket, so changing a payer rule doesn’t mean editing code across the stack.',
    href: '/projects/healthcare-claims-automation',
    linkText: 'Read the claims case study',
  },
  {
    id: 'clearinghouse',
    label: 'Clearinghouse',
    kind: 'step',
    title: 'Claim-status sweeps',
    body: 'Status checks go through Stedi: mapping internal claims to requests, handling claims first submitted through other clearinghouses, and applying updates asynchronously.',
    href: '/projects/healthcare-claims-automation',
    linkText: 'Read the claims case study',
  },
  {
    id: 'payer',
    label: 'Payer',
    kind: 'step',
    title: 'Adjudication',
    body: 'The payer decides. Clearinghouse transport state and our own claim state are tracked separately, so the claims screen never shows a response as a decision.',
  },
  {
    id: 'paid',
    label: 'Paid',
    kind: 'paid',
    title: 'Payment and reconciliation',
    body: 'Paid claims are reconciled. I’m helping design payment integrity: matching what a payer paid against what it should have paid, and turning variances into work.',
  },
  {
    id: 'denied',
    label: 'Denied',
    kind: 'denied',
    title: 'Denials and work assignment',
    body: 'Denials, ADR/MDR documentation requests and work assignment route each claim to the right person, then back into the cycle once it’s corrected.',
    href: '/projects/healthcare-claims-automation',
    linkText: 'Read the claims case study',
  },
  {
    id: 'workers',
    label: 'Async workers',
    kind: 'layer',
    title: 'Async workers that tell the truth',
    body: 'Tasks check the resulting domain state instead of trusting an exit code, and backfills are idempotent, so a failure is visible and a re-run is safe.',
    href: '/projects/reliable-healthcare-workflows',
    linkText: 'Read the reliability case study',
  },
  {
    id: 'aws',
    label: 'AWS',
    kind: 'layer',
    title: 'The infrastructure underneath',
    body: 'ECS for the app and workers, private RDS PostgreSQL, S3 for documents, all provisioned with Terraform and deployed through GitHub Actions.',
    href: '/projects/cloud-infrastructure',
    linkText: 'Read the infrastructure case study',
  },
];

export const titleBlock = [
  { label: 'Drawn by', value: 'Shashank Jain' },
  { label: 'Role', value: 'AI Development Engineer' },
  { label: 'Employer', value: 'Nodaris AI' },
  { label: 'Location', value: 'India, remote' },
];
