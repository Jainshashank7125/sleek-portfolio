import { CodeCopyButton } from '@/components/blog/CodeCopyButton';
import Container from '@/components/common/Container';
import { EditorialPageHeader } from '@/components/field-notes/EditorialPageHeader';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { settingsJson, steps } from '@/config/Setup';
import { ArrowDown, ArrowUpRight, Check } from '@phosphor-icons/react/dist/ssr';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/setup'),
  robots: { index: true, follow: true },
};

export default function SetupPage() {
  return (
    <Container>
      <EditorialPageHeader
        index="01"
        eyebrow="Developer setup"
        title="A quieter VS Code workspace."
        description="The fonts, extensions, shortcuts, and settings I use to keep the editor focused on the work."
      />

      <RuledSection>
        <SectionLabel index="02">Installation notes</SectionLabel>
        <div className="mt-9">
          {steps.map((step) => (
            <section
              key={step.id}
              className="border-border grid gap-5 border-b py-8 first:border-t md:grid-cols-[4rem_minmax(0,1fr)] md:gap-8"
            >
              <span className="font-mono text-[0.68rem] tracking-[0.1em] text-[var(--field-red)]">
                {String(step.id).padStart(2, '0')}
              </span>
              <div>
                <h2 className="font-editorial text-3xl tracking-[-0.03em]">
                  {step.title}
                </h2>
                <ul className="mt-6 space-y-3">
                  {step.content.map((item, index) => (
                    <li
                      key={`${item.type}-${index}`}
                      className="border-border text-muted-foreground border-l pl-4 text-sm leading-relaxed"
                    >
                      {item.type === 'download' ? (
                        <a
                          href={item.href}
                          download
                          className="text-foreground hover:text-brand inline-flex min-h-11 items-center gap-2 font-semibold"
                        >
                          <ArrowDown className="size-4" aria-hidden="true" />
                          <span>
                            {item.name}
                            <span className="text-muted-foreground ml-2 font-normal">
                              — {item.description}
                            </span>
                          </span>
                        </a>
                      ) : item.type === 'shortcut' || item.type === 'prompt' ? (
                        <code className="overflow-wrap-anywhere border-border bg-muted text-foreground inline-block max-w-full border px-3 py-2 font-mono text-xs">
                          {item.text}
                        </code>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </RuledSection>

      <RuledSection>
        <SectionLabel index="03">settings.json</SectionLabel>
        <div className="group relative mt-8">
          <pre className="border-border max-h-[38rem] overflow-auto border bg-[#15191f] p-5 text-xs leading-relaxed text-[#eef1f4] sm:p-7">
            <code>{settingsJson}</code>
          </pre>
          <CodeCopyButton code={settingsJson} />
        </div>
        <div className="mt-7 flex items-start gap-3 border-l border-[var(--field-red)] pl-5">
          <Check
            className="text-brand mt-1 size-4 shrink-0"
            aria-hidden="true"
          />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Paste the configuration into VS Code, save it, and restart the
            editor. For current VS Code documentation, use the official setup
            guide{' '}
            <a
              href="https://code.visualstudio.com/docs/getstarted/settings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand inline-flex items-center gap-1 font-semibold"
            >
              here <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
            .
          </p>
        </div>
      </RuledSection>
    </Container>
  );
}
