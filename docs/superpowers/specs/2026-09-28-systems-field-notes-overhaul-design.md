# Systems Field Notes — Existing Portfolio Overhaul

## Status

Approved design direction for implementation on branch `feat/systems-field-notes-overhaul`, created in an isolated worktree from `main` at `defea38`.

## Objective

Transform the existing Next.js portfolio into the approved “Systems Field Notes” experience while retaining the application structure that already powers the live site.

The finished portfolio should position Shashank Jain as a product-oriented full-stack engineer who owns workflows across application code, data, asynchronous processing, integrations, production reliability, and cloud infrastructure. Healthcare and Revenue Cycle Management work should lead the narrative, while earlier AI, SaaS, enterprise, open-source, writing, résumé, and personal material remain discoverable.

The visual language is the approved editorial field-notes mockup and verified prototype: warm ivory paper, graphite typography, cobalt technical notation, restrained vermilion accents, fine rules, serif editorial headings, compact monospaced labels, handwritten-style annotations, and semantic system diagrams.

## Success Criteria

1. Every existing public route uses the same field-notes visual system.
2. Existing URLs, App Router behavior, MDX rendering, APIs, SEO metadata, sitemap, résumé, and contact functionality continue to work.
3. The homepage closely recreates the approved visual target while using real application data and links.
4. Healthcare/RCM work is the primary story, expressed through defensible qualitative outcomes rather than hard-to-substantiate headline metrics.
5. Earlier work is preserved and clearly presented as secondary history.
6. The site works in light and dark themes, on desktop, tablet, and mobile, with accessible keyboard and reduced-motion behavior.
7. Lint, content safeguards, and the complete Next.js production build pass.
8. Browser verification and design QA pass before handoff.

## Existing Architecture to Preserve

The overhaul will remain a Next.js 15 App Router application.

Preserve:

- `src/app/` routes and route semantics.
- MDX-based blog and project detail pages.
- `src/config/` as the primary structured-content layer.
- `src/lib/blog.ts` and `src/lib/project.ts` loaders.
- `/api/chat` and `/api/contact` behavior.
- Metadata, JSON-LD, robots, and sitemap generation.
- Existing résumé embedding and outbound document URL.
- Contact form behavior, validation, and notifications.
- Existing social, blog, project, and open-source destinations.

No route aliases or redirects are required. The redesign must not become a separate SPA embedded inside the repository.

## Content Sources and Merge Policy

Use three sources deliberately:

1. `main` is the structural and historical content baseline.
2. The approved Systems Field Notes prototype is the visual and positioning target.
3. The healthcare/RCM branch and existing repository data may supply high-level case-study facts, but its earlier schematic theme and hard-metric presentation are not to be merged wholesale.

### Evidence policy

Do not present these claims anywhere in visible portfolio copy:

- `14,400 pages`
- `~19 min → ~85 sec`
- `~5.5 GB → near-zero`

Do not replace them with similarly precise headline figures. Use qualitative proof such as:

- “Complex workflows, made reliable.”
- “End-to-end ownership — from ingestion to production.”
- “Built for recovery — async, observable, idempotent.”
- Faster, leaner document processing that preserves scanned and mixed-content support.

Avoid metric-heavy cards across the redesigned site. Older experience details may retain genuinely public and supportable facts, but numbers must not be the primary visual proof or be copied forward merely because they existed previously.

### Confidentiality

Keep healthcare work high-level. Do not expose PHI, employer-sensitive implementation details, internal endpoints, account identifiers, proprietary rules, credentials, or private infrastructure topology.

## Information Architecture

### Global shell

The global shell applies to all routes:

- Monogram and “Systems Field Notes” wordmark.
- Desktop navigation to Projects, Experience, Writing, and About/Home.
- Résumé remains directly reachable from navigation or a primary page action.
- Mobile menu with accurate expanded state and usable touch targets.
- Light/dark theme control with light as the default and guarded local persistence.
- Shared paper texture, rules, page width, focus treatment, and footer.
- Chat remains available but is visually reduced so it does not compete with the editorial layout.

### Homepage `/`

The homepage is the most faithful recreation of the approved mockup.

Order:

1. Hero with name, product-oriented role, concise positioning, primary work CTA, résumé CTA, and technology strip.
2. Qualitative proof panel headed “Complex workflows, made reliable.”
3. Featured “Scaling Healthcare Document Ingestion” narrative and semantic pipeline diagram.
4. Selected healthcare work: claims automation, cloud/production engineering, and reliable healthcare workflows.
5. Experience summary that links to the full experience route.
6. Selected writing sourced from the real published blog collection.
7. About positioning and interests.
8. Closing contact statement and social links.

The homepage should not duplicate large amounts of detailed route content. Each summary links into the existing route structure.

### Projects `/projects`

Organize work into:

1. Current healthcare/RCM case studies.
2. Earlier AI, rules-engine, analytics, SaaS, mobile, and enterprise work.
3. Open-source and side projects.

Cards use editorial rows or ruled sheets rather than generic rounded cards. Project data remains in `src/config/Projects.tsx`. Add high-level healthcare case studies and their MDX detail pages without copying the previous branch’s precise document metrics.

### Project details `/projects/[slug]`

Retain the MDX system and project navigation. Apply field-note typography and surfaces to:

- title and metadata;
- problem/context;
- architecture and workflow explanations;
- tradeoffs and operational lessons;
- technology tags;
- previous/next project navigation.

Healthcare detail pages remain intentionally high-level and qualitative.

### Experience `/work-experience`

Preserve the full career timeline. Add the current healthcare/RCM role using the repository’s available public data, but describe responsibilities without the prohibited document metrics. The homepage shows a condensed two-entry summary; the route retains full history.

### Writing `/blog` and `/blog/[slug]`

Keep published-post discovery and MDX rendering. Reframe the index as “Notes from the work,” style tags and article rows consistently, and retain real article destinations. Code blocks, copy controls, and long-form readability must continue to work in both themes.

### Résumé `/resume`

Keep the existing embedded résumé and external-open action. Replace the rounded panel treatment with the shared ruled-sheet presentation and preserve a practical mobile fallback.

### Contact `/contact`

Keep the current form, validation, API submission, success, and error behavior. Restyle fields and states using square editorial rules, high-contrast focus, and plain language.

### Setup `/setup` and Gears `/gears`

Retain current data and outbound links. Treat these as personal field-note indexes rather than product-card grids.

### System routes

Apply the same typography, colors, navigation context, and useful recovery links to not-found and error states.

## Design System

### Tokens

Light theme:

- paper: warm ivory;
- ink: near-black graphite;
- secondary ink: cool gray;
- technical accent: accessible cobalt;
- editorial accent: accessible dark vermilion;
- rules: translucent graphite;
- surfaces: minimally lifted paper, never glossy cards.

Dark theme:

- charcoal paper rather than saturated blueprint;
- warm near-white ink;
- brighter cobalt and vermilion tokens with WCAG-conscious contrast;
- dark primary buttons use an appropriately dark or light foreground based on contrast.

### Typography

- Hanken Grotesk remains the local sans-serif body and large-name face.
- Georgia/system serif is used for editorial headings and narrative emphasis.
- System monospace is used for section labels, indexes, and technology notation.
- Pages remain useful if decorative fonts fail.

### Components

Create reusable primitives rather than duplicating page markup:

- `FieldNotesShell` or equivalent global page frame.
- `SectionLabel` for numbered editorial labels.
- `EditorialPageHeader` for inner routes.
- `RuledSection` for consistent section boundaries.
- `FieldNote` for decorative annotations excluded from the accessibility tree when redundant.
- `TechStrip` and `TagList` for compact technology/capability metadata.
- `PipelineDiagram` using a consistent icon library and semantic list/text alternative.
- `ProjectRow`, `ArticleRow`, and `ExperienceRow` for route summaries.

Use Phosphor icons for the new field-notes interface and workflow diagram. Existing content-specific icons may remain where replacing them adds no value. Do not add handcrafted SVG/CSS illustrations or use the mockup as a background image.

### Texture asset

Reuse the generated subtle paper-grain asset from the approved prototype. Keep it low contrast and ensure text contrast does not depend on the texture.

## Interaction and State Behavior

- Navigation links work on every route and expose the current destination where practical.
- Mobile menu opens and closes through a semantic button and closes after selection.
- Theme choice persists when storage is available and degrades safely when it is unavailable.
- Reduced-motion preference removes reveal and transition effects.
- External links use safe new-tab behavior where appropriate.
- Optional links are omitted rather than rendered as dead controls.
- Contact loading, success, and error states remain visible and understandable.
- Long titles, tags, and MDX content wrap without horizontal page scrolling.

## Accessibility

- Semantic landmarks and logical heading order.
- Skip link and visible keyboard focus.
- Minimum practical touch targets for mobile controls.
- WCAG-conscious contrast for text and interactive states in both themes.
- Decorative annotations hidden from assistive technology when redundant.
- Text alternative for the pipeline diagram.
- Reduced-motion support.
- Responsive text and layout that tolerate wrapping and browser zoom.

## Testing and Verification

Add content safeguards using Node’s built-in test runner or a small validation script. At minimum, verify:

- the prohibited healthcare metrics are absent from shipped content;
- required healthcare case studies and pipeline stages exist;
- optional links are filtered safely;
- stable navigation destinations remain available;
- theme normalization defaults invalid values to light;
- theme storage failures do not prevent rendering.

Run:

- content tests;
- `npm run lint`;
- `npm run build`.

Then run the application in the Codex in-app browser and verify:

- homepage fidelity to the approved mockup;
- all public route families;
- desktop/tablet/mobile behavior;
- mobile navigation;
- both themes and persisted choice;
- primary CTAs and real article/project links;
- résumé and contact behavior;
- keyboard focus and reduced motion;
- browser console errors;
- no visible prohibited metrics or broken assets.

Save `design-qa.md` at the repository root. Handoff is blocked until it reports `final result: passed`.

## Non-Goals

- No deployment or production merge in this task.
- No authentication, analytics, or database changes.
- No API contract changes.
- No rewrite of the MDX loader or content format.
- No new CMS.
- No copying the previous healthcare branch wholesale.
- No unrelated refactoring outside the visual/content migration.

## Acceptance Criteria

The overhaul is ready for review when:

1. It lives only in the requested worktree branch from `main`.
2. Every existing public route uses the approved visual system.
3. Healthcare/RCM positioning and qualitative case studies lead the site.
4. Existing historical work, blog posts, résumé, setup, gears, contact, APIs, metadata, sitemap, and MDX routes remain functional.
5. The prohibited metrics are absent from visible and built content.
6. Light/dark themes, mobile navigation, keyboard focus, and reduced motion work.
7. Content tests, lint, and production build pass.
8. Browser design QA passes against the approved reference.
