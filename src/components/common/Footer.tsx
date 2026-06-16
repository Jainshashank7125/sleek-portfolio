import React from 'react';

import Container from './Container';
import { footerConfig } from '@/config/Footer';

export default function Footer() {
  return (
    <Container className="max-w-5xl py-16">
      <div className="section-rule mb-8" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          {footerConfig.text} <b className="text-foreground">{footerConfig.developer}</b>{' '}
          <br /> &copy; {new Date().getFullYear()}. {footerConfig.copyright}
        </p>
      </div>
    </Container>
  );
}
