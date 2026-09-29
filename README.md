# Shashank Jain — Systems Field Notes

A product-engineering portfolio for Shashank Jain. Healthcare and revenue-cycle work leads the story, supported by earlier AI, SaaS, enterprise, mobile, and open-source systems.

The interface follows an editorial field-notes direction: warm paper surfaces, serif headlines, technical labels, ruled layouts, and qualitative case studies that focus on architecture, decisions, recovery, tradeoffs, and lessons.

Built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, and MDX. The production site is [portfolio.jainshashank.in](https://portfolio.jainshashank.in).

## Features

- Responsive light and dark field-notes design system
- Config-driven homepage, career timeline, projects, and metadata
- MDX case studies and technical writing with syntax highlighting and code copy
- Static metadata, sitemap, and structured data for published routes
- Portfolio assistant and contact form with preserved API integrations
- Accessible navigation, keyboard focus, form validation, and reduced-motion support

## Content map

- `src/config` — positioning, projects, experience, navigation, metadata, résumé, setup, and tools
- `src/data/projects` — published engineering case studies
- `src/data/blog` — published technical notes
- `src/components/field-notes` — reusable editorial layout primitives
- `src/components/landing` — homepage sections

## Environment variables

```env
TELEGRAM_BOT_TOKEN="your-token"
TELEGRAM_CHAT_ID="your-chat-id"
GEMINI_API_KEY="your-api-key"
NEXT_PUBLIC_URL="http://localhost:3000"
```

## Local development

```bash
npm install
npm test
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Before shipping, run:

```bash
npm run lint
npm run build
```

## License

MIT — see [LICENSE](LICENSE).
