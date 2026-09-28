import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';

interface ProjectNavigationProps {
  previous: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Case study navigation"
      className="border-border mt-16 grid border-y md:grid-cols-2"
    >
      <NavigationLink direction="previous" project={previous} />
      <NavigationLink direction="next" project={next} />
    </nav>
  );
}

function NavigationLink({
  direction,
  project,
}: {
  direction: 'previous' | 'next';
  project: { title: string; slug: string } | null;
}) {
  const isNext = direction === 'next';

  if (!project) {
    return <div className="hidden min-h-28 md:block md:first:border-r" />;
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group hover:text-brand flex min-h-28 items-center gap-4 py-6 md:px-7 ${
        isNext
          ? 'justify-end text-right md:pl-10'
          : 'border-border border-b md:border-r md:border-b-0 md:pr-10'
      }`}
    >
      {!isNext && (
        <ArrowLeft
          className="size-5 shrink-0 transition-transform group-hover:-translate-x-1"
          aria-hidden="true"
        />
      )}
      <span>
        <span className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.1em] uppercase">
          {isNext ? 'Next case study' : 'Previous case study'}
        </span>
        <span className="font-editorial mt-2 block text-xl leading-tight">
          {project.title}
        </span>
      </span>
      {isNext && (
        <ArrowRight
          className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
