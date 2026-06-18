import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { CustomMiddleware } from '@/middlewares/chain/types';

const locales = ['en', 'ru'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  return matchLocale(languages, locales, defaultLocale);
}

export default function middlewareLocale(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const { pathname } = request.nextUrl;
    const pathnameIsMissingLocale = locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          request.url
        )
      );
    }

    return middleware(request, event, response);
  };
}
