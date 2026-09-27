# Systems Field Notes Portfolio Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved Systems Field Notes design and qualitative healthcare/RCM positioning across every existing portfolio route without breaking the Next.js application structure, MDX content, APIs, SEO, résumé, or contact behavior.

**Architecture:** Keep the Next.js App Router and existing config/MDX loaders as the application backbone. Introduce a focused field-notes content module, shared editorial primitives, and a tokenized global visual system; then migrate route families onto those interfaces in dependency order. Content safeguards run with Node’s built-in test runner, while lint, the complete production build, and browser design QA verify the integrated application.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, MDX, Phosphor Icons, Node test runner, existing React Hook Form/Zod contact flow.

**Spec:** `docs/superpowers/specs/2026-09-28-systems-field-notes-overhaul-design.md`

## Global Constraints

- Work only on `feat/systems-field-notes-overhaul` in `/Users/shashankjain/Documents/Codex/worktrees/sleek-portfolio/systems-field-notes-overhaul`.
- Preserve all existing public routes, MDX loaders, APIs, metadata, sitemap, résumé behavior, and contact behavior.
- Do not expose PHI, employer-sensitive implementation details, internal endpoints, proprietary rules, credentials, or private infrastructure topology.
- Do not show `14,400 pages`, `~19 min → ~85 sec`, `~5.5 GB → near-zero`, or similarly precise replacement claims in visible or built portfolio content.
- Use qualitative proof: end-to-end ownership, recovery, observability, idempotency, and reliable production workflows.
- Healthcare/RCM leads; earlier AI, SaaS, enterprise, mobile, open-source, writing, and career content remains discoverable.
- Use the approved warm-ivory/graphite/cobalt/vermilion design with a contrast-safe dark theme.
- Use Phosphor for new interface/workflow icons; do not create handcrafted SVG, CSS-art illustrations, placeholders, gradients, or use the mockup as a background.
- Light is the default theme; stored user choice is guarded so storage failures never prevent rendering.
- Respect `prefers-reduced-motion`, keyboard focus, semantic heading order, practical mobile touch targets, and text zoom/wrapping.
- Do not deploy, merge, or change production infrastructure.

## Review Focus

- Browser storage can be missing or throw: the site must render in light mode and theme switching must continue in memory; Task 2 pins this with unit tests.
- Optional project/social links can be empty: the corresponding action must be omitted, not rendered dead; Task 1 pins this with content/action tests.
- Long titles, tags, and prose at 320px and 200% text zoom must wrap without page-level horizontal scrolling; Tasks 4–7 pin this through route-specific browser checks.
- Reduced-motion users must not receive reveal or theme-transition animation; Task 2 pins the CSS contract and Task 8 verifies it in-browser.
- MDX or structured config can accidentally reintroduce banned metrics or confidential wording: Task 1 scans all shipped content sources and Task 8 scans the production output.

---

### Task 1: Qualitative Content Model and Safeguards

**Files:**
- Create: `src/config/field-notes-content.json`
- Create: `src/config/FieldNotes.ts`
- Create: `src/lib/project-actions.mjs`
- Create: `tests/portfolio-content.test.mjs`
- Create: `tests/project-actions.test.mjs`
- Modify: `package.json`
- Modify: `src/config/Hero.tsx`
- Modify: `src/config/About.tsx`
- Modify: `src/config/Projects.tsx`
- Modify: `src/config/Experience.tsx`
- Modify: `src/types/project.ts`
- Modify: `src/config/Meta.tsx`

**Interfaces:**
- Consumes: the qualitative copy and evidence policy in the spec; existing `Project`, `Experience`, `heroConfig`, `about`, and metadata structures.
- Produces: importable `field-notes-content.json`; typed `fieldNotesConfig` with `proof`, `featuredWorkflow`, `homepageProjects`, and `aboutInterests`; `resolveProjectActions(project)` returning only usable project actions; healthcare-first project and experience data used by all later tasks.

- [ ] **Step 1: Add failing content and action tests**

Create Node tests that read `field-notes-content.json` and the shipped config/MDX source set, then assert:

```js
assert.deepEqual(fieldNotes.featuredWorkflow.stages.map((stage) => stage.title), [
  'Multi-format documents',
  'Ingestion & Validation',
  'Async Processing',
  'OCR & Data Extraction',
  'Classification & Enrichment',
  'External Integrations',
  'Structured Data',
]);
assert.equal(fieldNotes.homepageProjects.length, 3);
assert.doesNotMatch(shippedContentSources, /14,?400|19\s*min|85\s*sec|5\.5\s*GB|near-zero/i);
assert.deepEqual(resolveProjectActions({ live: '', github: '', details: false }), []);
```

Also assert that the current healthcare role, all four healthcare case studies, and the real writing/resume destinations are present while existing earlier work remains in `projects`.

- [ ] **Step 2: Add the test command and verify red**

Set `"test": "node --test tests/*.test.mjs"` in `package.json`.

Run: `npm test`

Expected: FAIL because `field-notes-content.json`, `FieldNotes.ts`, `project-actions.mjs`, and the healthcare-first data do not exist.

- [ ] **Step 3: Implement the qualitative data interfaces**

Create `field-notes-content.json` as the testable source of copy, then create the typed `FieldNotes.ts` adapter with these exact top-level keys:

```ts
export const fieldNotesConfig: {
  proof: { headline: string; items: Array<{ title: string; description: string }>; note: string };
  featuredWorkflow: { title: string; description: string; themes: string[]; stages: WorkflowStage[] };
  homepageProjects: string[];
  aboutInterests: string[];
};
```

Add `WorkflowStage` with `title`, `detail`, and Phosphor icon key. Update the existing content modules with healthcare-first qualitative copy, retain earlier entries, remove metric-heavy homepage proof, and update metadata for product-oriented healthcare/RCM positioning.

- [ ] **Step 4: Implement optional-action resolution**

Export:

```js
export function resolveProjectActions(project)
```

It returns ordered actions for detail, live, and GitHub only when their URLs/flags are usable. Later project components consume this rather than repeating truthiness logic.

- [ ] **Step 5: Run tests, lint, and build**

Run: `npm test && npm run lint && npm run build`

Expected: content/action tests pass, lint reports no errors, and all existing routes build.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/config src/lib/project-actions.mjs src/types/project.ts tests
git commit -m "feat: add qualitative healthcare portfolio content"
```

---

### Task 2: Visual Tokens, Texture, Theme Safety, and Editorial Primitives

**Files:**
- Create: `public/assets/paper-grain.png`
- Create: `src/lib/theme.mjs`
- Create: `src/components/field-notes/SectionLabel.tsx`
- Create: `src/components/field-notes/FieldNote.tsx`
- Create: `src/components/field-notes/EditorialPageHeader.tsx`
- Create: `src/components/field-notes/RuledSection.tsx`
- Create: `src/components/field-notes/TechStrip.tsx`
- Create: `tests/theme.test.mjs`
- Create: `tests/style-contract.test.mjs`
- Modify: `package.json`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/common/Container.tsx`
- Modify: `src/components/common/ThemeSwitch.tsx`
- Modify: `src/components/ui/button.tsx`

**Interfaces:**
- Consumes: Task 1 content vocabulary and existing Hanken Grotesk files.
- Produces: global field-notes tokens/classes; `normalizeTheme`, `resolveInitialTheme`, `readStoredTheme`, `persistTheme`; shared presentational primitives used by Tasks 3–7.

- [ ] **Step 1: Write failing theme and style-contract tests**

Theme tests cover valid/invalid values, light default, a throwing storage getter, and normalized persistence. Style-contract tests read `globals.css` and assert the paper/ink/blue/red/rule tokens, local Hanken font declarations, visible focus styles, and a `prefers-reduced-motion` override are present.

- [ ] **Step 2: Run tests to verify red**

Run: `npm test`

Expected: FAIL because theme helpers and the new visual contract are absent.

- [ ] **Step 3: Add the texture and icon dependency**

Copy the verified prototype texture into `public/assets/paper-grain.png`. Add `@phosphor-icons/react` as the new field-notes icon family.

- [ ] **Step 4: Implement guarded theme helpers and control**

Export from `src/lib/theme.mjs`:

```js
normalizeTheme(value)
resolveInitialTheme(storedTheme)
readStoredTheme(storageFactory)
persistTheme(storageFactory, theme)
```

Update `layout.tsx` and `ThemeSwitch.tsx` so light is the first-paint default, stored dark/light is applied without a flash, localStorage access is guarded, `aria-pressed` and the accessible label reflect state, and reduced motion skips the transition overlay.

- [ ] **Step 5: Implement global tokens and primitives**

Replace the Obsidian tokens with the approved paper system and contrast-safe dark theme. Remove gradient/glow/dot-grid styling. Implement the six field-notes components as small semantic wrappers whose visual behavior comes from shared classes in `globals.css`. Update `Container` and `Button` to use square ruled surfaces and practical focus/touch states.

- [ ] **Step 6: Run tests, lint, and build**

Run: `npm test && npm run lint && npm run build`

Expected: all theme/style/content tests pass and the application builds.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json public/assets/paper-grain.png src/app src/components/common src/components/field-notes src/components/ui/button.tsx src/lib/theme.mjs tests
git commit -m "feat: establish systems field notes design system"
```

---

### Task 3: Global Navigation, Footer, and Supporting Chrome

**Files:**
- Create: `src/components/common/MobileNavigation.tsx`
- Modify: `src/config/Navbar.tsx`
- Modify: `src/components/common/Navbar.tsx`
- Modify: `src/components/common/Footer.tsx`
- Modify: `src/components/common/Quote.tsx`
- Modify: `src/components/common/ChatBubble.tsx`
- Modify: `src/config/Footer.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: Task 2 tokens, theme control, `SectionLabel`, and container behavior.
- Produces: the global Systems Field Notes shell used automatically by every route; semantic mobile navigation with `aria-expanded` and close-on-selection behavior.

- [ ] **Step 1: Add failing shell contract tests**

Extend `tests/style-contract.test.mjs` or create `tests/shell-contract.test.mjs` to assert the navigation config exposes Projects, Experience, Writing, and résumé/home destinations without dead hrefs, and the server-rendered shell source exposes labelled navigation and theme controls.

- [ ] **Step 2: Run tests to verify red**

Run: `npm test`

Expected: FAIL on the new shell/nav expectations.

- [ ] **Step 3: Implement the desktop and mobile header**

Build the monogram/wordmark, route links, optional handwritten note, mobile toggle, and theme control. Keep `Navbar` route-aware through `usePathname`; hide only decorative notes from accessibility APIs.

- [ ] **Step 4: Implement the footer and restrained supporting chrome**

Create the “Let’s build the whole system” close, real contact/social links, and back-to-top action. Restyle `Quote` as a small field note or remove it from the shell if its content duplicates the footer. Keep Chat functional but visually subordinate, keyboard reachable, and compatible with the new tokens.

- [ ] **Step 5: Verify shell behavior**

Run: `npm test && npm run lint && npm run build`

Expected: all checks pass.

Browser check: desktop navigation, mobile menu open/close, route selection, theme toggle, skip link, and focus order.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/components/common src/config/Navbar.tsx src/config/Footer.tsx tests
git commit -m "feat: rebuild portfolio navigation and footer"
```

---

### Task 4: Recompose the Homepage Around the Approved Mockup

**Files:**
- Create: `src/components/field-notes/PipelineDiagram.tsx`
- Create: `src/components/landing/ProofPanel.tsx`
- Create: `src/components/landing/Writing.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/landing/Hero.tsx`
- Modify: `src/components/landing/Projects.tsx`
- Modify: `src/components/landing/Experience.tsx`
- Modify: `src/components/landing/About.tsx`
- Modify: `src/components/landing/Expertise.tsx`
- Modify: `src/components/landing/Philosophy.tsx`
- Modify: `src/components/landing/Setup.tsx`

**Interfaces:**
- Consumes: `fieldNotesConfig`, existing `projects`, `experiences`, `getPublishedBlogPosts`, Task 2 primitives, and Task 3 shell.
- Produces: the complete homepage hierarchy and semantic `PipelineDiagram({ stages })` with a list/text alternative.

- [ ] **Step 1: Add failing homepage-content tests**

Assert the homepage config contains the hero positioning, qualitative proof headings, the featured ingestion story, exactly three supporting project titles, two real published writing slugs, and no banned metrics.

- [ ] **Step 2: Run tests to verify red where integration is incomplete**

Run: `npm test`

Expected: FAIL until homepage selection helpers/data are wired.

- [ ] **Step 3: Build the semantic workflow diagram**

Implement:

```tsx
export function PipelineDiagram({ stages }: { stages: WorkflowStage[] })
```

Use Phosphor icons, an ordered list, responsive desktop flow, single-column mobile flow, hidden decorative connectors, and screen-reader prose describing the complete sequence.

- [ ] **Step 4: Rebuild the hero and proof composition**

Recreate the approved two-column desktop hero/proof layout, qualitative proof items, work/résumé actions, technology strip, and stacked tablet/mobile behavior. Do not render numeric proof counters.

- [ ] **Step 5: Recompose the remaining homepage**

Use the featured workflow, three selected-work summaries, condensed experience, real writing entries, and about copy in the approved section order. Remove Expertise, Philosophy, and Setup from `page.tsx` when their information is duplicated; keep their dedicated route content intact.

- [ ] **Step 6: Verify homepage behavior and resilience**

Run: `npm test && npm run lint && npm run build`

Browser checks at desktop, tablet, and 320px mobile widths; confirm no horizontal page scroll, long titles wrap, primary links work, diagram is readable, and light/dark states match the target.

- [ ] **Step 7: Commit**

```bash
git add src/app/page.tsx src/components/field-notes/PipelineDiagram.tsx src/components/landing src/config/FieldNotes.ts tests
git commit -m "feat: build systems field notes homepage"
```

---

### Task 5: Migrate Projects and Healthcare Case Studies

**Files:**
- Create: `src/data/projects/healthcare-claims-automation.mdx`
- Create: `src/data/projects/healthcare-document-ingestion.mdx`
- Create: `src/data/projects/cloud-infrastructure.mdx`
- Create: `src/data/projects/reliable-healthcare-workflows.mdx`
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/components/projects/ProjectCard.tsx`
- Modify: `src/components/projects/ProjectList.tsx`
- Modify: `src/components/projects/ProjectContent.tsx`
- Modify: `src/components/projects/ProjectNavigation.tsx`
- Modify: `src/lib/project.ts`
- Modify: `src/config/Projects.tsx`

**Interfaces:**
- Consumes: healthcare-first projects from Task 1, `resolveProjectActions`, Task 2 page header/rows/tags, and existing MDX loader interfaces.
- Produces: grouped projects index and four qualitative healthcare detail routes while preserving every prior detail route.

- [ ] **Step 1: Add failing project-route and content tests**

Extend content tests to assert the four new slugs resolve to MDX files, every `details: true` project has a corresponding readable slug, and banned metrics are absent from project config and MDX.

- [ ] **Step 2: Run tests to verify red**

Run: `npm test`

Expected: FAIL because the healthcare MDX files are missing.

- [ ] **Step 3: Write the four high-level case studies**

Each MDX document covers context, workflow/architecture, engineering decisions, recovery/operability, tradeoffs, and lessons without proprietary detail or precise document metrics.

- [ ] **Step 4: Replace generic cards with editorial project rows**

Use category/index metadata, serif titles, qualitative evidence, tech tags, confidentiality note, and actions from `resolveProjectActions`. `ProjectList` keeps a useful empty state and supports the three project groups.

- [ ] **Step 5: Restyle project index and detail pages**

Use `EditorialPageHeader`, ruled groups, field-note MDX typography, and previous/next navigation. Preserve static generation and metadata for all slugs.

- [ ] **Step 6: Verify project routes**

Run: `npm test && npm run lint && npm run build`

Expected: all project slugs appear in the production build.

Browser check all three index groups, one healthcare detail route, one earlier detail route, missing optional actions, long titles, and 320px layout.

- [ ] **Step 7: Commit**

```bash
git add src/app/projects src/components/projects src/config/Projects.tsx src/data/projects src/lib/project.ts tests
git commit -m "feat: add qualitative healthcare case studies"
```

---

### Task 6: Migrate Experience and Writing Routes

**Files:**
- Modify: `src/app/work-experience/page.tsx`
- Modify: `src/components/experience/ExperienceCard.tsx`
- Modify: `src/components/experience/ExperienceList.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/components/blog/BlogCard.tsx`
- Modify: `src/components/blog/BlogList.tsx`
- Modify: `src/components/blog/BlogContent.tsx`
- Modify: `src/components/blog/BlogComponents.tsx`
- Modify: `src/components/blog/CodeCopyButton.tsx`

**Interfaces:**
- Consumes: Task 1 experience data, real post loader output, and Task 2 page/row primitives.
- Produces: complete career timeline and “Notes from the work” index/detail treatment with preserved MDX/code behavior.

- [ ] **Step 1: Add failing experience/writing content checks**

Assert the experience collection includes the current healthcare role plus all existing earlier roles, and selected homepage post slugs exist in the published blog set.

- [ ] **Step 2: Run tests to verify red if any source mismatch remains**

Run: `npm test`

Expected: PASS only after Task 1 content and real writing selections agree; otherwise fix data before UI work.

- [ ] **Step 3: Build editorial experience rows and timeline**

Replace rounded cards and animated dots with ruled rows, company/role/date hierarchy, accessible external actions, descriptive bullet copy, and wrapping technology lists.

- [ ] **Step 4: Build editorial article rows and long-form treatment**

Remove generic image-card treatment from the index in favor of article rows with title, description, tags, date, and clear external/navigation affordance. Retain article images where they are meaningful inside the article. Preserve code highlighting and copy-button functionality in both themes.

- [ ] **Step 5: Verify route behavior**

Run: `npm test && npm run lint && npm run build`

Browser check full timeline, writing index, both published article routes, code copy control, long prose, mobile wrapping, and both themes.

- [ ] **Step 6: Commit**

```bash
git add src/app/work-experience src/app/blog src/components/experience src/components/blog tests
git commit -m "feat: restyle experience and writing routes"
```

---

### Task 7: Migrate Utility, Contact, and System Routes

**Files:**
- Modify: `src/app/resume/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/contact/ContactForm.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/ui/form.tsx`
- Modify: `src/app/setup/page.tsx`
- Modify: `src/app/gears/page.tsx`
- Modify: `src/components/gears/GearCard.tsx`
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/error.tsx`

**Interfaces:**
- Consumes: Task 2 page primitives and tokens; existing résumé config, contact API/form schema, setup data, and gear data.
- Produces: consistent field-notes treatment for every remaining public/system route without changing functional contracts.

- [ ] **Step 1: Add or extend contract tests for preserved destinations**

Assert résumé URL, contact endpoint, email/social channels, setup downloads, and gear links remain non-empty where rendered. Add a source contract that contact still posts JSON to `/api/contact` and retains loading/success/error paths.

- [ ] **Step 2: Run tests to establish the preservation baseline**

Run: `npm test`

Expected: PASS on behavior contracts before presentation changes.

- [ ] **Step 3: Restyle résumé and contact without changing behavior**

Use editorial headers and ruled surfaces. Keep the iframe/open-new-tab résumé actions. Restyle form controls, validation, submitting, success, and error states; do not alter the schema or API payload.

- [ ] **Step 4: Restyle setup, gears, not-found, and error routes**

Replace rounded card grids with ruled indexes/rows, preserve downloads and outbound links, and give system routes clear recovery actions back to Home and Work.

- [ ] **Step 5: Verify all remaining routes**

Run: `npm test && npm run lint && npm run build`

Browser check résumé desktop/mobile behavior, client-side form validation, a deliberately failed contact request state without sending a real message, setup/gears links, not-found recovery, dark/light themes, and 320px wrapping.

- [ ] **Step 6: Commit**

```bash
git add src/app/resume src/app/contact src/app/setup src/app/gears src/app/not-found.tsx src/app/error.tsx src/components/contact src/components/gears src/components/ui tests
git commit -m "feat: finish field notes route migration"
```

---

### Task 8: SEO, Full Verification, Design QA, and Branch Review

**Files:**
- Modify: `src/config/Meta.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts` only if verification finds a regression
- Create: `design-qa.md`
- Modify: `README.md` only if local development instructions are inaccurate

**Interfaces:**
- Consumes: the complete migrated application from Tasks 1–7 and the approved mockup/prototype reference.
- Produces: final metadata/sitemap coverage, passing QA record, and a branch ready for user review.

- [ ] **Step 1: Verify metadata and sitemap coverage**

Ensure healthcare/product-oriented descriptions are accurate, all public index routes remain in the sitemap, dynamic blog/project routes continue to generate metadata, and no confidential or banned-metric text appears in metadata.

- [ ] **Step 2: Run the complete automated gate**

Run:

```bash
npm test
npm run lint
npm run build
rg -n "14,?400|19\s*min|85\s*sec|5\.5\s*GB|near-zero" .next/server .next/static
```

Expected: 0 test failures, 0 lint errors, successful production build, and no matches in shipped output.

- [ ] **Step 3: Start the verified local app in the Codex in-app browser**

Run the project dev server on an available local port and open it with the in-app browser. Keep the final preview running for handoff.

- [ ] **Step 4: Complete interaction and accessibility checks**

Exercise navigation, mobile menu, themes and persistence, work/resume/article/project links, project navigation, code copy, contact validation/failure behavior, keyboard focus, reduced motion, and all route families. Inspect the browser console and network failures.

- [ ] **Step 5: Run blocking visual comparison**

Compare the approved qualitative mockup and current homepage at the same desktop viewport/state in one comparison input. Repeat at tablet/mobile for overflow and hierarchy. Fix every P0/P1/P2 mismatch; record only non-blocking P3 polish.

- [ ] **Step 6: Save the QA report**

Create `design-qa.md` with evidence for typography, layout, color, assets, icons, responsive behavior, interactions, accessibility, build/test results, and the exact final line:

```text
final result: passed
```

- [ ] **Step 7: Request whole-branch review and fix findings**

Dispatch one fresh read-only reviewer against `main..feat/systems-field-notes-overhaul`. Fix all Critical and Important findings, rerun the complete automated gate, and update QA evidence.

- [ ] **Step 8: Commit final verification artifacts**

```bash
git add src/config/Meta.tsx src/app/sitemap.ts src/app/robots.ts README.md design-qa.md
git commit -m "docs: verify systems field notes overhaul"
```

- [ ] **Step 9: Prepare integration options**

Use `superpowers:finishing-a-development-branch` to present merge, PR, or keep-branch options. Do not push, merge, deploy, or remove the worktree without the user’s choice.
