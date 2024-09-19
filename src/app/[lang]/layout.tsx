import { Montserrat } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import '@/styles/scss/style.scss';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/theme.ts';
import Layout from '@/components/layout/layout';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Locale } from '@/utils/localization/i18n-config';

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description: 'REST/GraphiQL Client App',
  keywords: 'RESTful, GraphQL, REST/GraphiQL, App',
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }];
}

export default function RootLayout({
  children,
  params,
}: PropsWithChildren<{ params: { lang: Locale } }>): JSX.Element {
  return (
    <html lang={params.lang}>
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
