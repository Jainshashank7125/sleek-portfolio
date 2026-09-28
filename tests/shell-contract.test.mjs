import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const read = (relativePath) =>
  readFileSync(path.join(root, relativePath), 'utf8');

test('global navigation retains every primary destination and a home target', () => {
  const config = read('src/config/Navbar.tsx');

  for (const href of [
    '/',
    '/projects',
    '/work-experience',
    '/blog',
    '/resume',
  ]) {
    assert.match(config, new RegExp(`href: ['"]${href.replace('/', '\\/')}['"]`));
  }
  assert.doesNotMatch(config, /href:\s*['"]\s*['"]/);
});

test('desktop and mobile navigation expose accessible state and controls', () => {
  const navbar = read('src/components/common/Navbar.tsx');
  const mobileNavigation = read('src/components/common/MobileNavigation.tsx');
  const themeSwitch = read('src/components/common/ThemeSwitch.tsx');

  assert.match(navbar, /<nav[^>]+aria-label=/s);
  assert.match(navbar, /aria-current=/);
  assert.match(mobileNavigation, /aria-expanded=/);
  assert.match(mobileNavigation, /aria-label=/);
  assert.match(mobileNavigation, /from 'next\/link'/);
  assert.match(themeSwitch, /aria-pressed=/);
  assert.match(themeSwitch, /Switch to (?:light|dark) theme/);
});

test('the footer keeps real contact channels and a back-to-top action', () => {
  const footer = read('src/components/common/Footer.tsx');
  const config = read('src/config/Footer.tsx');

  assert.match(config, /mailto:/);
  assert.match(config, /github\.com/);
  assert.match(config, /linkedin\.com/);
  assert.match(footer, /href="#main-content"/);
});

test('the assistant initial state is deterministic across server and browser renders', () => {
  const chat = read('src/components/common/ChatBubble.tsx');

  assert.doesNotMatch(chat, /const initialMessages[\s\S]{0,500}new Date/);
});
