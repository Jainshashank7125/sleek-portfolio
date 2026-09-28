import type { WorkflowIconKey, WorkflowStage } from '@/config/FieldNotes';
import {
  ArrowRight,
  Checks,
  Database,
  Files,
  Link,
  Queue,
  Scan,
  Tag,
} from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const iconMap = {
  Files,
  Checks,
  Queue,
  Scan,
  Tag,
  Link,
  Database,
} satisfies Record<WorkflowIconKey, React.ComponentType<{ className?: string }>>;

export function PipelineDiagram({ stages }: { stages: WorkflowStage[] }) {
  const sequence = stages.map((stage) => stage.title).join(', then ');

  return (
    <div
      className="relative border border-border bg-background/65 p-4 sm:p-6"
      aria-labelledby="pipeline-title"
    >
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="eyebrow">Fig. 1</p>
          <h3 id="pipeline-title" className="font-editorial mt-1 text-xl">
            Document ingestion pipeline
          </h3>
        </div>
        <p className="hidden font-mono text-[0.62rem] tracking-[0.08em] uppercase text-muted-foreground sm:block">
          High level
        </p>
      </div>

      <p className="sr-only">Workflow sequence: {sequence}.</p>
      <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
        {stages.map((stage, index) => {
          const Icon = iconMap[stage.icon];

          return (
            <li
              key={stage.title}
              className="relative flex min-w-0 flex-col border border-border bg-background p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <Icon className="size-5 shrink-0 text-brand" aria-hidden="true" />
                <span className="font-mono text-[0.6rem] text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h4 className="mt-4 text-sm font-semibold leading-tight">
                {stage.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {stage.detail}
              </p>
              {index < stages.length - 1 && (
                <ArrowRight
                  className="absolute top-1/2 -right-2.5 z-10 hidden size-4 -translate-y-1/2 bg-background text-brand xl:block"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>

      <p className="field-note mt-5 text-right text-xs" aria-hidden="true">
        Async by default. Recoverable by design.
      </p>
    </div>
  );
}
