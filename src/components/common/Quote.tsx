'use client';

import { useEffect, useState } from 'react';

import Container from './Container';
import { quotes } from '@/config/Quote';

export const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState<{
    quote: string;
    author: string;
  } | null>(null);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  if (!currentQuote) return null;

  const { quote, author } = currentQuote;

  return (
    <Container className="max-w-5xl py-10">
      <div className="section-rule mb-8" />
      <blockquote className="flex flex-col gap-1 border-l-2 border-brand/30 pl-5">
        <p className="font-mono text-sm italic leading-relaxed text-muted-foreground">
          &quot;{quote}&quot;
        </p>
        <cite className="metric-value not-italic text-xs text-muted-foreground/60">
          &mdash; {author}
        </cite>
      </blockquote>
    </Container>
  );
};
