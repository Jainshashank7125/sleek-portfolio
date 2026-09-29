import Container from '@/components/common/Container';
import ContactForm from '@/components/contact/ContactForm';
import { EditorialPageHeader } from '@/components/field-notes/EditorialPageHeader';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Metadata } from 'next';

export const metadata: Metadata = getMetadata('/contact');

const channels = [
  {
    label: 'Email',
    value: 'sjainsahajpur7125@gmail.com',
    href: 'mailto:sjainsahajpur7125@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/shashankjain7125',
    href: 'https://www.linkedin.com/in/shashankjain7125/',
  },
  {
    label: 'GitHub',
    value: 'github.com/Jainshashank7125',
    href: 'https://github.com/Jainshashank7125',
  },
];

export default function ContactPage() {
  return (
    <Container>
      <EditorialPageHeader
        index="01"
        eyebrow="Get in touch"
        title="Let’s talk about the whole system."
        description="I’m interested in product engineering roles and collaborations where backend architecture, application experience, data, integrations, and production reliability meet."
      />

      <RuledSection>
        <SectionLabel index="02">Start a conversation</SectionLabel>
        <div className="mt-9 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-16">
          <ContactForm />

          <aside className="border-border border-t pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <h2 className="font-editorial text-2xl">Reach me directly</h2>
            <dl className="border-border mt-6 border-t">
              {channels.map((channel) => (
                <div
                  key={channel.label}
                  className="border-border border-b py-5"
                >
                  <dt className="eyebrow">{channel.label}</dt>
                  <dd className="mt-2 min-w-0">
                    <a
                      href={channel.href}
                      target={
                        channel.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        channel.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="hover:text-brand inline-flex max-w-full items-start gap-2 text-sm font-semibold break-all"
                    >
                      {channel.value}
                      <ArrowUpRight
                        className="mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 border-l border-[var(--field-red)] pl-5">
              <p className="eyebrow">Availability</p>
              <p className="font-editorial mt-2 text-xl">
                Open to the right opportunity.
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Remote-first · Backend or full-stack · Full-time or contract
              </p>
            </div>
          </aside>
        </div>
      </RuledSection>
    </Container>
  );
}
