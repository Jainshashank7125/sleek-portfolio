import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const read = (relativePath) =>
  readFileSync(path.join(root, relativePath), 'utf8');

test('homepage content uses the approved positioning and qualitative proof', () => {
  const hero = read('src/config/Hero.tsx');
  const fieldNotes = JSON.parse(read('src/config/field-notes-content.json'));

  assert.match(hero, /Product-Oriented Full-Stack Engineer/);
  assert.equal(fieldNotes.proof.headline, 'Complex workflows, made reliable.');
  assert.deepEqual(
    fieldNotes.proof.items.map((item) => item.title),
    ['End-to-end ownership', 'Built for recovery'],
  );
  assert.equal(
    fieldNotes.featuredWorkflow.title,
    'Scaling Healthcare Document Ingestion',
  );
  assert.equal(fieldNotes.homepageProjects.length, 3);
});

test('homepage selections point to three healthcare projects and two published notes', () => {
  const fieldNotes = JSON.parse(read('src/config/field-notes-content.json'));
  const projects = read('src/config/Projects.tsx');

  for (const slug of fieldNotes.homepageProjects) {
    assert.match(projects, new RegExp(slug.replaceAll('/', '\\/')));
  }

  for (const slug of [
    'idempotent-webhook-pipeline',
    'per-pr-ephemeral-databases',
  ]) {
    const sourcePath = path.join(root, `src/data/blog/${slug}.mdx`);
    assert.ok(existsSync(sourcePath));
    assert.match(read(`src/data/blog/${slug}.mdx`), /isPublished:\s*true/);
  }
});

test('homepage composition includes the workflow and writing without duplicate sections', () => {
  const page = read('src/app/page.tsx');
  const pipeline = read('src/components/field-notes/PipelineDiagram.tsx');
  const writing = read('src/components/landing/Writing.tsx');

  for (const component of [
    'Hero',
    'ProofPanel',
    'Projects',
    'Experience',
    'Writing',
    'About',
  ]) {
    assert.match(page, new RegExp(`<${component}`));
  }
  assert.doesNotMatch(page, /<(?:Expertise|Philosophy|Setup)/);
  assert.match(pipeline, /<ol/);
  assert.match(pipeline, /sr-only/);
  assert.match(writing, /getPublishedBlogPosts/);
  assert.match(writing, /slice\(0, 2\)/);
});
