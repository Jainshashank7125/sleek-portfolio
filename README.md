# Shashank Jain — Portfolio

A systems-engineering portfolio for **Shashank Jain**, an AI-Enabled Full Stack Engineer building scalable, cloud-native systems. It showcases engineering case studies (architecture, tradeoffs, results), core expertise, and an engineering philosophy — not just a list of apps.

Built with Next.js 15, TypeScript, Tailwind CSS v4, and shadcn/ui. Live at **[portfolio.jainshashank.in](https://portfolio.jainshashank.in)**.

## Features

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4** design system with dark/light mode
- **shadcn/ui** components
- **MDX** case studies for projects (structured: Context · Problem · Architecture · Implementation · Tradeoffs · Results · Lessons)
- **AI assistant** (Gemini) that answers questions about my work
- **Contact form** with Telegram integration
- SEO optimized, responsive, TypeScript-first

## Tech & Content Map

The site is config-driven. Most content lives in `src/config`:

- `Hero.tsx` — headline, subheadline, CTAs, skills, social links
- `Expertise.tsx` — core expertise pillars
- `Projects.tsx` — project cards (flagship + secondary + open-source)
- `Philosophy.tsx` — engineering principles
- `Experience.tsx` — work history
- `Meta.tsx` — SEO / metadata
- `Navbar.tsx`, `Footer.tsx`, `Setup.tsx`, `Gears.tsx`, `Contact.tsx`, `Resume.ts`, `ChatPrompt.ts`

Project case studies are MDX files in `src/data/projects/`.

## Environment Variables

```env
TELEGRAM_BOT_TOKEN="your-token"
TELEGRAM_CHAT_ID="your-chat-id"
GEMINI_API_KEY="your-api-key"
NEXT_PUBLIC_URL="http://localhost:3000"
```

## Getting Started

```bash
bun install   # or npm install
bun dev       # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT — see [LICENSE](LICENSE).
