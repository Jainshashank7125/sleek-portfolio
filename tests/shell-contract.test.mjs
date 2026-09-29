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
    assert.match(
      config,
      new RegExp(`href: ['"]${href.replace('/', '\\/')}['"]`),
    );
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

test('the shared content target is a focusable main landmark without a nested homepage main', () => {
  const layout = read('src/app/layout.tsx');
  const homepage = read('src/app/page.tsx');

  assert.match(layout, /<main[^>]+id="main-content"[^>]+tabIndex=\{-1\}/s);
  assert.doesNotMatch(homepage, /<main\b/);
});

test('the page can reflow below 320px without a global minimum width', () => {
  const globals = read('src/app/globals.css');

  assert.doesNotMatch(globals, /html\s*\{[^}]*min-width:/s);
});

test('the portfolio assistant provides dialog focus behavior and labelled controls', () => {
  const chat = read('src/components/common/ChatBubble.tsx');
  const expandableChat = read('src/components/ui/expandable-chat.tsx');

  assert.match(chat, /aria-label="Ask the portfolio assistant"/);
  assert.match(chat, /data-chat-initial-focus/);
  assert.match(chat, /aria-label="Send message"/);
  assert.match(expandableChat, /aria-modal=/);
  assert.match(expandableChat, /event\.key === ['"]Escape['"]/);
  assert.match(expandableChat, /event\.key !== ['"]Tab['"]/);
  assert.match(expandableChat, /previousActiveElementRef/);
});

test('gear rows reserve the icon column when an item has no icon', () => {
  const gearCard = read('src/components/gears/GearCard.tsx');

  assert.match(gearCard, /icon \?[\s\S]*aria-hidden="true"/);
});
