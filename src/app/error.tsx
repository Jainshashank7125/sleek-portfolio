'use client';

import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Error
      </p>
      <h1 className="text-3xl font-semibold sm:text-4xl">
        Something went wrong
      </h1>
      <p className="text-muted-foreground max-w-md">
        An unexpected error occurred while loading this page.
      </p>
      <Button size="lg" onClick={() => reset()}>
        Try again
      </Button>
    </Container>
  );
}
