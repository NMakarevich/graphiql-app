import { ROUTES } from '@/utils/constants/routes';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes: string[] = [
  ROUTES.RESTFUL_CLIENT_PATH,
  ROUTES.GRAPHIQL_PATH,
];

const protectedRoutesForAuth: string[] = [
  ROUTES.SIGN_IN_PATH,
  ROUTES.SIGN_UP_PATH,
];

export default async function middleware(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  try {
    const cookies = request.headers.get('cookie') || '';
    const authToken = cookies
      .split(';')
      .find((cookie) => cookie.trim().startsWith('authToken='))
      ?.split('=')[1];

    if (!authToken) {
      if (protectedRoutes.includes(request.nextUrl.pathname)) {
        const absoluteURL = new URL(
          ROUTES.SIGN_IN_PATH,
          request.nextUrl.origin
        );
        return NextResponse.redirect(absoluteURL.toString());
      }
    } else {
      if (protectedRoutesForAuth.includes(request.nextUrl.pathname)) {
        const absoluteURL = new URL(ROUTES.HOME_PATH, request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return NextResponse.next();
  }
}
