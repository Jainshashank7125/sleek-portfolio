import Container from '@/components/common/Container';
import ContactForm from '@/components/contact/ContactForm';
import { contactConfig } from '@/config/Contact';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = getMetadata('/contact');

export default function ContactPage() {
  return (
    <Container className="max-w-2xl py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Get in touch</p>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {contactConfig.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {contactConfig.description}
          </p>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </Container>
  );
}
