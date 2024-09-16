import { ROUTES } from '@/utils/constants/routes';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { ECookies } from '@/utils/cookies/types';
import { CustomMiddleware } from '@/middlewares/chain/types';
import { RESTful_METHODS } from '@/utils/constants/RESTfulMethods';

const RESTful_ROUTES = Object.values(RESTful_METHODS).map(
  (method) => `/${method}`
);

const protectedRoutes: string[] = [
  ...RESTful_ROUTES,
  ROUTES.GRAPHIQL_PATH,
  ROUTES.HISTORY_PATH,
];

const protectedRoutesForAuth: string[] = [
  ROUTES.SIGN_IN_PATH,
  ROUTES.SIGN_UP_PATH,
];

export default function middlewareWithAuth(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    try {
      const cookies = request.headers.get('cookie') || '';
      const authToken = cookies
        .split(';')
        .find((cookie) => cookie.trim().startsWith(`${ECookies.AUTH_TOKEN}=`))
        ?.split('=')[1];

      const currentLocale = request.nextUrl.pathname.split('/')[1];

      if (!authToken) {
        const pathWithProtectedRoute = protectedRoutes
          .map((route) =>
            request.nextUrl.pathname.startsWith(`/${currentLocale}${route}`)
          )
          .includes(true);
        if (pathWithProtectedRoute) {
          const absoluteURL = new URL(
            `/${currentLocale}${ROUTES.HOME_PATH}`,
            request.nextUrl.origin
          );
          return NextResponse.redirect(absoluteURL.toString());
        }
      } else {
        const pathWithProtectedRouteForAuth = protectedRoutesForAuth
          .map((route) => `/${currentLocale}${route}`)
          .includes(request.nextUrl.pathname);

        if (pathWithProtectedRouteForAuth) {
          const absoluteURL = new URL(
            `/${currentLocale}${ROUTES.HOME_PATH}`,
            request.nextUrl.origin
          );
          return NextResponse.redirect(absoluteURL.toString());
        }
      }

      return middleware(request, event, response);
    } catch (error) {
      console.error('Error in authentication middleware:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  };
}
