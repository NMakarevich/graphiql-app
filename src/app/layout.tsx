import { Montserrat } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import '../styles/scss/style.scss';

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description: 'REST/GraphiQL Client App',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <div id="root" className="wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
