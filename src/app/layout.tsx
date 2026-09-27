import ChatBubble from '@/components/common/ChatBubble';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { Quote } from '@/components/common/Quote';
import { Toaster } from '@/components/ui/sonner';
import { siteConfig, generateMetadata as getMetadata } from '@/config/Meta';
import { SmoothScroll } from '@/lib/lenis';
import { ViewTransitions } from 'next-view-transitions';

import './globals.css';

export const metadata = getMetadata('/');

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.author.name,
  url: siteConfig.url,
  jobTitle: 'Full Stack Engineer',
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
      <html lang="en" suppressHydrationWarning>
        {/* Apply a valid saved choice before paint; light remains the default. */}
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var t='light';try{var s=localStorage.getItem('theme');if(s==='dark'||s==='light')t=s;}catch(e){}document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.dataset.theme=t;})();`,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </head>
        <body className={`font-hanken-grotesk antialiased`}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
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
