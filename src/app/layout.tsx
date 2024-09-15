import { Montserrat } from 'next/font/google';
import Layout from '@/components/layout/layout';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/theme.ts';
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
  keywords: 'RESTful, GraphQL, REST/GraphiQL, App',
};

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
              <div id="root" className="wrapper">
                <Layout>{children}</Layout>
              </div>
            </ErrorBoundary>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
