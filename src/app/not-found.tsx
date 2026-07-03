import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { Link } from 'next-view-transitions';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        404
      </p>
      <h1 className="text-3xl font-semibold sm:text-4xl">Page not found</h1>
      <p className="text-muted-foreground max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Button asChild size="lg">
        <Link href="/">Back to home</Link>
      </Button>
    </Container>
  );
}
