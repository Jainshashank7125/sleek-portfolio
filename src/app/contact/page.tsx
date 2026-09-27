import Container from '@/components/common/Container';
import PageHeader from '@/components/common/PageHeader';
import ContactForm from '@/components/contact/ContactForm';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Github, Linkedin, Mail, MapPin, MessageSquare } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = getMetadata('/contact');

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sjainsahajpur7125@gmail.com',
    href: 'mailto:sjainsahajpur7125@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/shashankjain7125',
    href: 'https://www.linkedin.com/in/shashankjain7125/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Jainshashank7125',
    href: 'https://github.com/Jainshashank7125',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India (Remote-first)',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <Container className="max-w-5xl py-16">
      {/* Header */}
      <PageHeader
        title="Get in touch"
        description="Send a message about roles, healthcare and AI engineering work, or an interesting problem. I usually reply within a day."
      />

      {/* 2-col layout */}
      <div className="mt-10 grid gap-12 md:grid-cols-5">
        {/* Form — wider column */}
        <div className="md:col-span-3">
          <ContactForm />
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-2">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare size={14} className="text-brand" />
              Reach me directly
            </p>
            <ul className="mt-3 flex flex-col gap-4">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="bg-brand-muted text-brand mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg">
                    <Icon size={15} strokeWidth={1.75} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs">
                      {label}
                    </span>
                    {href ? (
                      <Link
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={
                          href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="hover:text-brand text-sm font-medium transition-colors"
                      >
                        {value}
                      </Link>
                    ) : (
                      <span className="text-sm font-medium">{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-border bg-card mt-6 rounded-xl border p-4">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Availability
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                <span className="size-2 animate-pulse rounded-full bg-green-500" />
                Open to opportunities
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Backend / Full-stack · Remote · Full-time or contract
              </p>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
