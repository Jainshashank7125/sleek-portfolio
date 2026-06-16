import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { resumeConfig } from '@/config/Resume';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import React from 'react';

export const metadata: Metadata = getMetadata('/resume');

export default function ResumePage() {
  return (
    <Container className="max-w-4xl py-16">
      <div className="space-y-8">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">CV</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Resume
            </h1>
            <Button variant="outline" asChild>
              <Link href={resumeConfig.url} target="_blank" rel="noopener noreferrer">
                Open in new tab
              </Link>
            </Button>
          </div>
          <p className="max-w-2xl text-lg text-muted-foreground">
            A snapshot of my experience, skills, and projects.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <iframe src={resumeConfig.url} className="min-h-screen w-full" />
        </div>
      </div>
    </Container>
  );
}
