import assert from 'node:assert/strict';
import test from 'node:test';

import {
  normalizeTheme,
  persistTheme,
  readStoredTheme,
  resolveInitialTheme,
} from '../src/lib/theme.mjs';

test('theme normalization accepts known values and defaults everything else to light', () => {
  assert.equal(normalizeTheme('light'), 'light');
  assert.equal(normalizeTheme('dark'), 'dark');
  assert.equal(normalizeTheme('system'), 'light');
  assert.equal(normalizeTheme(undefined), 'light');
});

test('the first resolved theme is light unless a valid stored choice exists', () => {
  assert.equal(resolveInitialTheme(null), 'light');
  assert.equal(resolveInitialTheme('dark'), 'dark');
  assert.equal(resolveInitialTheme('unexpected'), 'light');
});

test('storage read failures degrade to the light theme', () => {
  const throwingStorage = () => {
    throw new Error('storage is unavailable');
  };

  assert.equal(readStoredTheme(throwingStorage), 'light');
});

test('persistence stores only normalized values and survives storage failures', () => {
  const writes = [];
  const storage = () => ({
    setItem(key, value) {
      writes.push([key, value]);
    },
  });

  assert.equal(persistTheme(storage, 'unexpected'), 'light');
  assert.deepEqual(writes, [['theme', 'light']]);
  assert.equal(
    persistTheme(() => {
      throw new Error('storage is unavailable');
    }, 'dark'),
    'dark',
  );
});
