import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const css = readFileSync(path.join(process.cwd(), 'src/app/globals.css'), 'utf8');

test('the global stylesheet exposes the field-notes color vocabulary', () => {
  for (const token of [
    '--paper:',
    '--ink:',
    '--field-blue:',
    '--field-red:',
    '--rule:',
  ]) {
    assert.match(css, new RegExp(token.replace('--', '--')));
  }
});

test('local typography and editorial utility classes are available', () => {
  assert.match(css, /@font-face\s*{[^}]*Hanken Grotesk/s);
  assert.match(css, /\.font-editorial\s*{/);
  assert.match(css, /\.section-label\s*{/);
  assert.match(css, /\.ruled-section\s*{/);
  assert.match(css, /paper-grain\.png/);
});

test('keyboard focus and reduced-motion behavior are explicit', () => {
  assert.match(css, /:focus-visible\s*{/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /animation-duration:\s*0\.01ms/);
});
