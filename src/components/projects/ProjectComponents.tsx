import Bun from '@/components/technologies/Bun';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
// Import technology components
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import React from 'react';

import { CodeCopyButton } from '../blog/CodeCopyButton';

// Technology mapping for dynamic components
const TechnologyComponents: Record<string, React.ComponentType> = {
  'Next.js': NextJs,
  nextjs: NextJs,
  React: ReactIcon,
  react: ReactIcon,
  TypeScript: TypeScript,
  typescript: TypeScript,
  JavaScript: JavaScript,
  javascript: JavaScript,
  'Node.js': NodeJs,
  nodejs: NodeJs,
  node: NodeJs,
  MongoDB: MongoDB,
  mongodb: MongoDB,
  PostgreSQL: PostgreSQL,
  postgresql: PostgreSQL,
  Prisma: Prisma,
  prisma: Prisma,
  Bun: Bun,
  bun: Bun,
};

// Custom Technology component for displaying technology badges with icons
const Technology = ({ name }: { name: string }) => {
  const TechComponent =
    TechnologyComponents[name] || TechnologyComponents[name.toLowerCase()];

  return (
    <div className="tech-chip gap-2">
      {TechComponent && <TechComponent />}
      <span>{name}</span>
    </div>
  );
};

// Custom TechStack component for displaying multiple technologies
const TechStack = ({ technologies }: { technologies: string[] }) => {
  return (
    <div className="border-border my-8 border-y py-5">
      <h4 className="font-editorial mb-4 text-xl">Technology stack</h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <Technology key={tech} name={tech} />
        ))}
      </div>
    </div>
  );
};

// Custom ProjectMeta component for project information
const ProjectMeta = ({
  timeline,
  role,
  team,
  status,
}: {
  timeline?: string;
  role?: string;
  team?: string;
  status?: string;
}) => {
  return (
    <div className="border-border my-8 grid border-y sm:grid-cols-2 lg:grid-cols-4">
      {timeline && (
        <div className="border-border border-b py-4 lg:border-r lg:border-b-0 lg:px-4 lg:first:pl-0">
          <h5 className="eyebrow">Timeline</h5>
          <p className="text-sm">{timeline}</p>
        </div>
      )}
      {role && (
        <div className="border-border border-b py-4 lg:border-r lg:border-b-0 lg:px-4">
          <h5 className="eyebrow">Role</h5>
          <p className="text-sm">{role}</p>
        </div>
      )}
      {team && (
        <div className="border-border border-b py-4 lg:border-r lg:border-b-0 lg:px-4">
          <h5 className="eyebrow">Team</h5>
          <p className="text-sm">{team}</p>
        </div>
      )}
      {status && (
        <div className="py-4 lg:px-4 lg:last:pr-0">
          <h5 className="eyebrow">Status</h5>
          <Badge
            variant={
              status === 'completed'
                ? 'default'
                : status === 'in-progress'
                  ? 'secondary'
                  : 'outline'
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      )}
    </div>
  );
};

// Custom Challenges component
const Challenges = ({ challenges }: { challenges: string[] }) => {
  return (
    <div className="border-border my-8 border-y py-5">
      <h4 className="font-editorial mb-4 text-xl">Key Challenges</h4>
      <ul className="space-y-2">
        {challenges.map((challenge, index) => (
          <li
            key={index}
            className="text-muted-foreground flex items-start gap-2 text-sm"
          >
            <span className="text-[var(--field-red)]" aria-hidden="true">
              →
            </span>
            {challenge}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Custom Learnings component
const Learnings = ({ learnings }: { learnings: string[] }) => {
  return (
    <div className="border-border my-8 border-y py-5">
      <h4 className="font-editorial mb-4 text-xl">Key Learnings</h4>
      <ul className="space-y-2">
        {learnings.map((learning, index) => (
          <li
            key={index}
            className="text-muted-foreground flex items-start gap-2 text-sm"
          >
            <span className="text-[var(--field-red)]" aria-hidden="true">
              →
            </span>
            {learning}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ProjectComponents = {
  // Inherit blog components for basic markdown
  img: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="border-border my-10 border"
      {...props}
    />
  ),
  h1: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h1 className="font-editorial mb-6 text-4xl tracking-[-0.035em]" {...props}>
      {children}
    </h1>
  ),
  h2: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h2
      className="font-editorial border-border mt-14 mb-5 border-t pt-7 text-3xl tracking-[-0.035em]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <h3
      className="font-editorial mt-9 mb-4 text-2xl tracking-[-0.025em]"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <p
      className="text-muted-foreground mb-5 text-[1.04rem] leading-8"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ul
      className="mb-6 ml-5 list-disc space-y-3 marker:text-[var(--field-red)]"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <ol
      className="marker:text-brand mb-6 ml-5 list-decimal space-y-3"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <li className="text-muted-foreground pl-1 leading-7" {...props}>
      {children}
    </li>
  ),
  pre: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    const getTextContent = (node: React.ReactNode): string => {
      if (typeof node === 'string') {
        return node;
      }
      if (typeof node === 'number') {
        return String(node);
      }
      if (
        React.isValidElement(node) &&
        node.props &&
        typeof node.props === 'object'
      ) {
        return getTextContent(
          (node.props as { children?: React.ReactNode }).children,
        );
      }
      if (Array.isArray(node)) {
        return node.map(getTextContent).join('');
      }
      return '';
    };

    const codeText = getTextContent(children);

    return (
      <div className="group relative my-8">
        <pre
          className="border-border overflow-x-auto border bg-[#15191f] p-5 text-sm text-[#eef1f4] [&>code]:bg-transparent [&>code]:p-0"
          {...props}
        >
          {children}
        </pre>
        <CodeCopyButton code={codeText} />
      </div>
    );
  },
  code: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => {
    if (className?.includes('language-')) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code
        className="border-border bg-muted border px-1.5 py-0.5 font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    );
  },
  blockquote: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <blockquote
      className="font-editorial text-muted-foreground my-8 border-l-2 border-[var(--field-red)] py-1 pl-5 text-xl leading-relaxed italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Project-specific components
  Technology,
  TechStack,
  ProjectMeta,
  Challenges,
  Learnings,
};
