import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const projectConfigPath = path.join(root, 'src/config/Projects.tsx');
const projectsDirectory = path.join(root, 'src/data/projects');
const projectConfig = fs.readFileSync(projectConfigPath, 'utf8');

const detailedProjectSlugs = Array.from(
  projectConfig.matchAll(
    /projectDetailsPageSlug:\s*'\/projects\/([^']+)',\s*details:\s*true/g,
  ),
  (match) => match[1],
);

const healthcareSlugs = [
  'healthcare-claims-automation',
  'healthcare-document-ingestion',
  'cloud-infrastructure',
  'reliable-healthcare-workflows',
];

const bannedMetricPatterns = [
  /14[,.]?400\s+pages/i,
  /19\s*(?:minutes?|min)\s*(?:→|->|to)\s*85\s*(?:seconds?|sec)/i,
  /5\.5\s*GB\s*(?:→|->|to)\s*(?:near[- ]?zero|0)/i,
];

test('every detailed project resolves to a readable MDX case study', () => {
  assert.ok(detailedProjectSlugs.length > 0, 'expected detailed projects');

  for (const slug of detailedProjectSlugs) {
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);
    assert.ok(fs.existsSync(filePath), `missing case study for ${slug}`);
    assert.doesNotThrow(() => fs.readFileSync(filePath, 'utf8'));
  }
});

test('the four healthcare case-study routes are configured and published', () => {
  for (const slug of healthcareSlugs) {
    assert.ok(
      detailedProjectSlugs.includes(slug),
      `missing configured route for ${slug}`,
    );

    const source = fs.readFileSync(
      path.join(projectsDirectory, `${slug}.mdx`),
      'utf8',
    );
    assert.match(source, /isPublished:\s*true/);
  }
});

test('project config and case studies avoid unverified headline metrics', () => {
  const mdxSource = fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => fs.readFileSync(path.join(projectsDirectory, file), 'utf8'))
    .join('\n');
  const projectSource = `${projectConfig}\n${mdxSource}`;

  for (const pattern of bannedMetricPatterns) {
    assert.doesNotMatch(projectSource, pattern);
  }
});
