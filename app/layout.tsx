import type { Metadata } from 'next';
import './globals.scss';
import React from 'react';

export const metadata: Metadata = {
  title: 'GraphiQL App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
