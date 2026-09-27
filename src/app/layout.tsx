import ChatBubble from '@/components/common/ChatBubble';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { Quote } from '@/components/common/Quote';
import { Toaster } from '@/components/ui/sonner';
import { generateMetadata as getMetadata, siteConfig } from '@/config/Meta';
import { SmoothScroll } from '@/lib/lenis';
import { ViewTransitions } from 'next-view-transitions';
import { Archivo } from 'next/font/google';

import './globals.css';

export const metadata = getMetadata('/');

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.author.name,
  url: siteConfig.url,
  jobTitle: 'AI Development Engineer',
  sameAs: [
    `https://github.com/${siteConfig.author.github}`,
    `https://linkedin.com/in/${siteConfig.author.linkedin}`,
    `https://x.com/${siteConfig.author.twitter.replace('@', '')}`,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`dark ${archivo.variable}`}
        suppressHydrationWarning
      >
        {/* Runs synchronously before paint to prevent light-mode flash */}
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');})();`,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </head>
        <body className="antialiased">
          <a
            href="#main-content"
            className="focus:bg-background focus:text-foreground focus:outline-ring sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:outline"
          >
            Skip to content
          </a>
          <SmoothScroll>
            <Navbar />
            <div id="main-content">{children}</div>
            <Quote />
            <Footer />
            <ChatBubble />
            <Toaster />
          </SmoothScroll>
        </body>
      </html>
    </ViewTransitions>
  );
}
