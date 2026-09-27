'use client';

import { type Stage, stages, titleBlock } from '@/config/Workflow';
import { Link } from 'next-view-transitions';
import React, { useEffect, useState } from 'react';

type Box = { x: number; y: number; w: number; h: number };

// Drawing coordinates (viewBox 1120 × 400). x/y are box centres.
const BOX: Record<string, Box> = {
  documents: { x: 110, y: 250, w: 150, h: 48 },
  intake: { x: 110, y: 110, w: 150, h: 56 },
  rules: { x: 330, y: 110, w: 150, h: 56 },
  clearinghouse: { x: 550, y: 110, w: 150, h: 56 },
  payer: { x: 770, y: 110, w: 150, h: 56 },
  paid: { x: 990, y: 58, w: 140, h: 44 },
  denied: { x: 990, y: 172, w: 140, h: 44 },
  workers: { x: 560, y: 312, w: 1080, h: 36 },
  aws: { x: 560, y: 360, w: 1080, h: 36 },
};

const LAYER_DETAIL: Record<string, string> = {
  workers: 'Celery, Redis',
  aws: 'ECS, RDS PostgreSQL, S3, Terraform',
};

// The claim's happy path, traced once on load.
const PATH: [number, number][] = [
  [110, 110],
  [330, 110],
  [550, 110],
  [770, 110],
  [880, 110],
  [880, 58],
  [990, 58],
];
const PATH_STOPS = [
  'intake',
  'rules',
  'clearinghouse',
  'payer',
  '',
  '',
  'paid',
];
const TRACE_MS = 3400;

const SEG = PATH.slice(1).map(([x, y], i) =>
  Math.hypot(x - PATH[i][0], y - PATH[i][1]),
);
const TOTAL = SEG.reduce((a, b) => a + b, 0);

function pointAt(d: number): { x: number; y: number; seg: number } {
  for (let i = 0; i < SEG.length; i++) {
    if (d <= SEG[i]) {
      const [x1, y1] = PATH[i];
      const [x2, y2] = PATH[i + 1];
      const k = SEG[i] === 0 ? 0 : d / SEG[i];
      return { x: x1 + (x2 - x1) * k, y: y1 + (y2 - y1) * k, seg: i };
    }
    d -= SEG[i];
  }
  const [x, y] = PATH[PATH.length - 1];
  return { x, y, seg: SEG.length };
}

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

export default function WorkflowSchematic() {
  const [selected, setSelected] = useState('documents');
  const [packet, setPacket] = useState<{ x: number; y: number } | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduce) {
      setVisited(new Set(PATH_STOPS.filter(Boolean)));
      return;
    }
    let raf = 0;
    const start = performance.now() + 500;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / TRACE_MS));
      const p = pointAt(ease(t) * TOTAL);
      setPacket({ x: p.x, y: p.y });
      setVisited(new Set(PATH_STOPS.slice(0, p.seg + 1).filter(Boolean)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const current = stages.find((s) => s.id === selected) ?? stages[0];

  return (
    <figure className="sheet">
      <figcaption className="border-border flex flex-wrap items-baseline justify-between gap-2 border-b px-5 py-3">
        <span className="font-narrow text-sm font-semibold">
          Fig. 1 — How a claim moves through the US revenue cycle
        </span>
        <span className="font-narrow text-muted-foreground text-sm">
          Select a stage to see what I built there
        </span>
      </figcaption>

      {/* Desktop drawing */}
      <div className="hidden px-4 pt-4 md:block">
        <svg
          viewBox="0 0 1120 400"
          className="h-auto w-full select-none"
          role="group"
          aria-label="Revenue cycle schematic"
        >
          <defs>
            <marker
              id="wf-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,1 L10,5 L0,9 z" className="fill-ink" />
            </marker>
          </defs>

          {/* Dimension line: the whole cycle is the scope of the work */}
          <g className="stroke-ink" strokeWidth={1}>
            <line x1={35} y1={14} x2={35} y2={30} />
            <line x1={1060} y1={14} x2={1060} y2={30} />
            <line
              x1={35}
              y1={22}
              x2={480}
              y2={22}
              markerStart="url(#wf-arrow)"
            />
            <line
              x1={640}
              y1={22}
              x2={1060}
              y2={22}
              markerEnd="url(#wf-arrow)"
            />
          </g>
          <text
            x={560}
            y={27}
            textAnchor="middle"
            className="fill-ink text-[15px] font-semibold"
            style={{ fontStretch: '72%' }}
          >
            Owned end to end
          </text>

          {/* Construction lines: every stage runs on the platform layers */}
          <g className="stroke-construct" strokeWidth={1} strokeDasharray="3 5">
            {['intake', 'rules', 'clearinghouse', 'payer'].map((id) => (
              <line
                key={id}
                x1={BOX[id].x}
                y1={BOX[id].y + BOX[id].h / 2}
                x2={BOX[id].x}
                y2={294}
              />
            ))}
          </g>

          {/* Flow */}
          <g className="stroke-ink fill-none" strokeWidth={1.5}>
            <path d="M110,226 L110,140" markerEnd="url(#wf-arrow)" />
            <path d="M185,110 L253,110" markerEnd="url(#wf-arrow)" />
            <path d="M405,110 L473,110" markerEnd="url(#wf-arrow)" />
            <path d="M625,110 L693,110" markerEnd="url(#wf-arrow)" />
            <path
              d="M845,110 L880,110 L880,58 L918,58"
              markerEnd="url(#wf-arrow)"
            />
            <path d="M880,110 L880,172 L918,172" markerEnd="url(#wf-arrow)" />
            <path
              d="M990,194 L990,238 L330,238 L330,140"
              strokeDasharray="6 5"
              markerEnd="url(#wf-arrow)"
            />
          </g>
          <text
            x={660}
            y={230}
            textAnchor="middle"
            className="fill-muted-foreground text-[14px]"
            style={{ fontStretch: '80%' }}
          >
            corrected and resubmitted
          </text>

          {stages.map((stage) => (
            <StageNode
              key={stage.id}
              stage={stage}
              box={BOX[stage.id]}
              selected={selected === stage.id}
              visited={visited.has(stage.id)}
              onSelect={setSelected}
            />
          ))}

          {packet && (
            <g pointerEvents="none">
              <circle
                cx={packet.x}
                cy={packet.y}
                r={11}
                className="fill-brand/20"
              />
              <circle
                cx={packet.x}
                cy={packet.y}
                r={5}
                className="fill-brand"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Mobile: the same stages as a list */}
      <ol className="border-border bg-border grid grid-cols-2 gap-px border-b md:hidden">
        {stages.map((stage) => (
          <li
            key={stage.id}
            className={
              stage.kind === 'layer' || stage.id === 'documents'
                ? 'col-span-2'
                : ''
            }
          >
            <button
              type="button"
              onClick={() => setSelected(stage.id)}
              aria-pressed={selected === stage.id}
              className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold transition-colors ${
                selected === stage.id
                  ? 'bg-ink text-background'
                  : 'bg-sheet text-foreground hover:bg-muted'
              }`}
            >
              <span className="font-narrow">{stage.label}</span>
              {stage.kind === 'paid' && <span className="bg-paid size-2" />}
              {stage.kind === 'denied' && <span className="bg-denied size-2" />}
            </button>
          </li>
        ))}
      </ol>

      {/* Detail + title block */}
      <div className="md:border-border grid md:grid-cols-[1fr_300px] md:border-t">
        <div className="min-h-44 px-5 py-5" aria-live="polite">
          <p className="font-narrow text-muted-foreground text-sm font-semibold">
            {current.kind === 'layer' ? 'Platform layer' : 'Stage'}:{' '}
            {current.label}
          </p>
          <h2 className="font-wide mt-1 text-xl font-semibold tracking-tight">
            {current.title}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-[62ch] text-[0.95rem]">
            {current.body}
          </p>
          {current.result && (
            <p className="metric-value text-brand mt-3 text-lg font-semibold">
              {current.result}
            </p>
          )}
          {current.href && (
            <Link
              href={current.href}
              className="link-ink mt-3 inline-block text-sm font-medium"
            >
              {current.linkText}
            </Link>
          )}
        </div>

        <dl className="border-border grid grid-cols-2 border-t md:grid-cols-1 md:border-t-0 md:border-l">
          {titleBlock.map((row) => (
            <div
              key={row.label}
              className="border-border flex flex-col border-b px-4 py-2 odd:border-r md:odd:border-r-0"
            >
              <dt className="font-narrow text-muted-foreground text-xs">
                {row.label}
              </dt>
              <dd className="text-sm font-semibold">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </figure>
  );
}

function StageNode({
  stage,
  box,
  selected,
  visited,
  onSelect,
}: {
  stage: Stage;
  box: Box;
  selected: boolean;
  visited: boolean;
  onSelect: (id: string) => void;
}) {
  const { x, y, w, h } = box;
  const isLayer = stage.kind === 'layer';
  const stateStroke =
    stage.kind === 'paid'
      ? 'stroke-paid'
      : stage.kind === 'denied'
        ? 'stroke-denied'
        : 'stroke-ink';
  const stateFill =
    stage.kind === 'paid'
      ? 'fill-paid'
      : stage.kind === 'denied'
        ? 'fill-denied'
        : 'fill-ink';

  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${stage.label}: show details`}
      className="schematic-node cursor-pointer outline-none"
      onClick={() => onSelect(stage.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(stage.id);
        }
      }}
    >
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        strokeWidth={selected ? 2 : 1.5}
        className={`transition-colors ${stateStroke} ${selected ? stateFill : 'fill-sheet'}`}
      />
      {(stage.kind === 'paid' || stage.kind === 'denied') && (
        <rect
          x={x - w / 2 + 4}
          y={y - h / 2 + 4}
          width={w - 8}
          height={h - 8}
          strokeWidth={1}
          className={`fill-none ${selected ? 'stroke-background' : stateStroke}`}
        />
      )}
      {!isLayer && visited && !selected && (
        <rect
          x={x - w / 2}
          y={y - h / 2}
          width={5}
          height={h}
          className="fill-brand"
        />
      )}
      <text
        x={isLayer ? x - w / 2 + 18 : x}
        y={y + 5}
        textAnchor={isLayer ? 'start' : 'middle'}
        className={`text-[16px] font-semibold ${selected ? 'fill-background' : 'fill-ink'}`}
        style={{ fontStretch: '80%' }}
      >
        {stage.label}
      </text>
      {isLayer && (
        <text
          x={x + w / 2 - 18}
          y={y + 5}
          textAnchor="end"
          className={`text-[14px] ${selected ? 'fill-background' : 'fill-muted-foreground'}`}
          style={{ fontStretch: '85%' }}
        >
          {LAYER_DETAIL[stage.id]}
        </text>
      )}
    </g>
  );
}
