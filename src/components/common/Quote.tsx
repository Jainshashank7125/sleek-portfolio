'use client';

import { quotes } from '@/config/Quote';
import { useEffect, useState } from 'react';

import Container from './Container';

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
    <Container className="max-w-5xl pt-24">
      <blockquote className="border-construct max-w-[60ch] border-l-2 pl-5">
        <p className="text-lg leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
        <cite className="font-narrow text-muted-foreground mt-2 block text-sm not-italic">
          {author}
        </cite>
      </blockquote>
    </Container>
  );
};
