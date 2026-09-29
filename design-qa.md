# Systems Field Notes — Design QA

## Reference

- Approved visual direction: `exec-b614e08b-a2c1-4f89-9887-95df726bc075.png`
- Editorial concept: a working engineer's field notebook, expressed through warm paper surfaces, large serif headlines, technical mono labels, ruled sections, restrained blue/red accents, and architecture-led case studies.
- Content constraint: outcomes remain qualitative. Exact volume, duration, and storage claims from the earlier mockup are not shipped.

## Automated verification

- `npm test`: 32 tests passed, 0 failed.
- `npm run lint`: passed with no warnings or errors.
- `npm run build`: passed; 26 static pages generated, including both published articles and all eight project case studies.
- `git diff --check`: passed.
- Production-output scan for the excluded page-count, processing-time, and storage claims: no matches.

## Visual comparison

- Desktop: compared the running homepage at 1536 × 1024 with the approved mockup. The implementation preserves the reference's hierarchy, split hero, qualitative proof panel, ruled editorial grid, warm neutral palette, featured healthcare story, and blue/red annotation language.
- Compact layout: inspected the running page at 867 CSS pixels. Navigation collapses to an accessible menu, the hero becomes a single-column reading flow, action buttons remain usable, technology labels wrap, and the proof panel follows without horizontal overflow.
- Small-screen behavior: inspected the available narrow Chrome render and reviewed the `sm`, `md`, and `lg` layout rules for fixed-width blockers. The browser host enforces a 500 CSS-pixel minimum and blocked a separate exact-width emulation session, so sub-500-pixel behavior was verified from the responsive layout contract and a regression test that prevents a page-level minimum width rather than recorded as a separate browser capture.
- Dark mode: verified the paper palette, text contrast, borders, and accents in dark mode; preference persists across navigation and reload.
- Typography: display serif, clean interface sans, and compact mono labels consistently separate narrative, navigation, and technical metadata.
- Assets and icons: the experience uses the project's existing local assets and icon packages; no decorative stock imagery or emoji icons were introduced.

## Interaction and content checks

- Header links, mobile menu, skip link, theme control, homepage calls to action, and footer links were exercised in the live preview.
- Project index grouping and all eight case-study routes were checked, including previous/next project navigation.
- Experience preserves the complete five-role timeline.
- Writing index and both published article routes render correctly; code-copy feedback changes to `Code copied`.
- Contact form exposes inline validation for blank name, email, and message fields. With Telegram credentials confirmed absent, a valid local submission exercised the real HTTP 500 path and displayed the documented fallback message; no external message was sent.
- Résumé, setup, tools, and custom not-found routes were inspected.
- Keyboard focus styles, reduced-motion handling, semantic headings, landmark labels, and accessible control names are present. The assistant moves focus into its labelled input, traps Tab focus, closes on Escape, and returns focus to its trigger.
- A fresh preview session produced no browser console warnings or errors.
- Independent review found no critical issues. Its three important findings (minimum page width, shared main landmark, and assistant dialog focus behavior) and its tools-row alignment note were fixed and covered by regression tests.
- No P0 or P1 visual issues remain. The approved mockup's densest handwritten annotations are intentionally simplified at smaller widths to preserve readability.
- P2 QA limitation: the host browser blocks exact viewport emulation and its narrow standalone window bottoms out at 500 CSS pixels. Source-level reflow safeguards and the available compact render pass, but the plan's exact 320-pixel and 200%-zoom browser captures still require a manual browser check.

final result: blocked
