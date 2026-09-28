import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), 'utf8');

test('career history keeps the current healthcare role and every earlier role', () => {
  const experienceSource = read('src/config/Experience.tsx');

  assert.match(
    experienceSource,
    /isCurrent:\s*true,[\s\S]*?company:\s*'Nodaris AI'/,
  );

  for (const company of [
    'Quido Fintech Pvt. Ltd.',
    'Hexaview Technologies Inc.',
    'TechXR Innovations Pvt. Ltd.',
    'Microsoft',
  ]) {
    assert.ok(experienceSource.includes(company), `missing role at ${company}`);
  }
});

test('homepage writing selections resolve to published long-form notes', () => {
  for (const slug of [
    'per-pr-ephemeral-databases',
    'idempotent-webhook-pipeline',
  ]) {
    const filePath = path.join(root, 'src/data/blog', `${slug}.mdx`);
    assert.ok(fs.existsSync(filePath), `missing note ${slug}`);
    assert.match(fs.readFileSync(filePath, 'utf8'), /isPublished:\s*true/);
  }
});
