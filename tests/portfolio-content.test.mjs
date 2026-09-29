import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), 'utf8');
}

function collectContentSources(directory) {
  return readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const relativePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectContentSources(relativePath);

      return /\.(?:json|mdx|ts|tsx)$/.test(entry.name) ? [read(relativePath)] : [];
    },
  );
}

test('the field-notes model exposes the approved workflow and homepage selection', () => {
  const fieldNotes = JSON.parse(read('src/config/field-notes-content.json'));

  assert.deepEqual(
    fieldNotes.featuredWorkflow.stages.map((stage) => stage.title),
    [
      'Multi-format documents',
      'Ingestion & Validation',
      'Async Processing',
      'OCR & Data Extraction',
      'Classification & Enrichment',
      'External Integrations',
      'Structured Data',
    ],
  );
  assert.equal(fieldNotes.homepageProjects.length, 3);
  assert.ok(fieldNotes.aboutInterests.length >= 4);
});

test('shipped portfolio content does not publish the rejected healthcare metrics', () => {
  const shippedContentSources = [
    ...collectContentSources('src/config'),
    ...collectContentSources('src/data'),
  ].join('\n');

  assert.doesNotMatch(
    shippedContentSources,
    /14,?400|19\s*min|85\s*sec|5\.5\s*GB|near-zero/i,
  );
});

test('healthcare leads while the existing body of work remains available', () => {
  const projects = read('src/config/Projects.tsx');
  const experience = read('src/config/Experience.tsx');

  for (const title of [
    'Healthcare Claims Automation Platform',
    'Scaling Healthcare Document Ingestion',
    'Cloud Infrastructure & Production Engineering',
    'Building Reliable Healthcare Workflows',
  ]) {
    assert.match(projects, new RegExp(title.replace(/[&]/g, '\\&')));
  }

  assert.match(experience, /Nodaris AI/);
  assert.match(experience, /Revenue Cycle Management/);
  assert.match(projects, /Deeply — AI Agent System for Couples/);
  assert.match(projects, /Coupon Management API/);
});

test('the portfolio retains real writing and resume destinations', () => {
  assert.ok(
    existsSync(path.join(root, 'src/data/blog/idempotent-webhook-pipeline.mdx')),
  );
  assert.ok(
    existsSync(path.join(root, 'src/data/blog/per-pr-ephemeral-databases.mdx')),
  );

  const resume = read('src/config/Resume.ts');
  assert.match(resume, /https:\/\/drive\.google\.com\/file\//);
});
