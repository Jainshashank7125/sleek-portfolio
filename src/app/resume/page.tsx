import Container from '@/components/common/Container';
import PageHeader from '@/components/common/PageHeader';
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
          <PageHeader
            title="Résumé"
            description="A snapshot of my experience, skills, and projects."
            action={
              <Button variant="outline" asChild>
                <Link
                  href={resumeConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in a new tab
                </Link>
              </Button>
            }
          />
        </div>
        <div className="border-border overflow-hidden rounded-xl border">
          <iframe src={resumeConfig.url} className="min-h-screen w-full" />
        </div>
      </div>
    </Container>
  );
}
