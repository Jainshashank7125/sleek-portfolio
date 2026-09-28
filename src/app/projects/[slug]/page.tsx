import Container from '@/components/common/Container';
import { ProjectContent } from '@/components/projects/ProjectContent';
import { ProjectNavigation } from '@/components/projects/ProjectNavigation';
import { siteConfig } from '@/config/Meta';
import {
  getProjectCaseStudyBySlug,
  getProjectNavigation,
  getPublishedProjectCaseStudies,
  getRelatedProjectCaseStudies,
} from '@/lib/project';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';

interface ProjectCaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedProjectCaseStudies().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getProjectCaseStudyBySlug(slug);

  if (!caseStudy || !caseStudy.frontmatter.isPublished) {
    return { title: 'Project Not Found' };
  }

  const { title, description, image } = caseStudy.frontmatter;
  const ogImage = image || siteConfig.ogImage;
  const url = `${siteConfig.url}/projects/${slug}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: `${title} - Project Case Study`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} - Project Case Study`,
      description,
      url,
      siteName: siteConfig.title,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Project Case Study`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getProjectCaseStudyBySlug(slug);

  if (!caseStudy || !caseStudy.frontmatter.isPublished) notFound();

  const navigation = getProjectNavigation(slug);
  const relatedProjects = getRelatedProjectCaseStudies(slug, 2);

  return (
    <Container>
      <div className="py-8 sm:py-10">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-brand inline-flex min-h-11 items-center gap-2 font-mono text-[0.68rem] tracking-[0.1em] uppercase"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All projects
        </Link>
      </div>

      <ProjectContent
        frontmatter={caseStudy.frontmatter}
        content={caseStudy.content}
      />

      <ProjectNavigation
        previous={navigation.previous}
        next={navigation.next}
      />

      {relatedProjects.length > 0 && (
        <section className="py-14 sm:py-20">
          <p className="eyebrow">Related field notes</p>
          <div className="border-border mt-6 grid border-t md:grid-cols-2">
            {relatedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group border-border border-b py-7 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <p className="text-brand font-mono text-[0.65rem] tracking-[0.1em] uppercase">
                  {project.frontmatter.category || 'Case study'}
                </p>
                <h2 className="font-editorial mt-3 text-2xl leading-tight tracking-[-0.025em]">
                  {project.frontmatter.title}
                </h2>
                <span className="text-brand mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Read case study
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
