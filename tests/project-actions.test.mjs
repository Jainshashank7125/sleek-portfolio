import assert from 'node:assert/strict';
import test from 'node:test';

import { resolveProjectActions } from '../src/lib/project-actions.mjs';

test('projects without usable destinations expose no actions', () => {
  assert.deepEqual(
    resolveProjectActions({
      details: false,
      projectDetailsPageSlug: '',
      live: '',
      github: '',
    }),
    [],
  );
});

test('project actions are ordered detail, live, then source', () => {
  assert.deepEqual(
    resolveProjectActions({
      details: true,
      projectDetailsPageSlug: '/projects/example',
      live: 'https://example.com',
      github: 'https://github.com/example/project',
    }),
    [
      {
        kind: 'detail',
        label: 'Read case study',
        href: '/projects/example',
        external: false,
      },
      {
        kind: 'live',
        label: 'View live',
        href: 'https://example.com',
        external: true,
      },
      {
        kind: 'github',
        label: 'View source',
        href: 'https://github.com/example/project',
        external: true,
      },
    ],
  );
});

test('invalid and whitespace-only destinations are omitted', () => {
  assert.deepEqual(
    resolveProjectActions({
      details: true,
      projectDetailsPageSlug: 'javascript:alert(1)',
      live: '   ',
      github: 'not-a-url',
    }),
    [],
  );
});
