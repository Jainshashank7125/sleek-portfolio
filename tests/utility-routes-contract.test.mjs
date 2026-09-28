import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), 'utf8');

test('resume, contact, setup, and gear destinations remain usable', () => {
  assert.match(
    read('src/config/Resume.ts'),
    /https:\/\/drive\.google\.com\/file\//,
  );

  const contact = read('src/app/contact/page.tsx');
  assert.match(contact, /mailto:[^'"\s]+@[^'"\s]+/);
  assert.match(contact, /https:\/\/www\.linkedin\.com/);
  assert.match(contact, /https:\/\/github\.com/);

  for (const asset of ['fira-code.zip', 'vsc-extensions.txt']) {
    assert.ok(fs.existsSync(path.join(root, 'public/setup', asset)));
  }

  const gears = read('src/config/Gears.tsx');
  assert.doesNotMatch(gears, /href:\s*['"]\s*['"]/);
});

test('contact form preserves JSON submission and every user-facing state', () => {
  const form = read('src/components/contact/ContactForm.tsx');

  assert.match(form, /fetch\(['"]\/api\/contact['"]/);
  assert.match(form, /method:\s*['"]POST['"]/);
  assert.match(form, /Content-Type['"]?:\s*['"]application\/json['"]/);
  assert.match(form, /JSON\.stringify\(data\)/);
  assert.match(form, /isSubmitting/);
  assert.match(form, /toast\.success/);
  assert.match(form, /toast\.error/);
});
