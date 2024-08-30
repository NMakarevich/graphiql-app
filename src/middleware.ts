import { isAuthenticated } from '@/utils/auth/auth';
import {
  GRAPHIQL_PATH,
  HOME_PATH,
  RESTFUL_CLIENT_PATH,
} from './utils/constants/routes';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [RESTFUL_CLIENT_PATH, GRAPHIQL_PATH];

export default async function middleware(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  try {
    const authenticated = await isAuthenticated;

    if (!authenticated && protectedRoutes.includes(request.nextUrl.pathname)) {
      const absoluteURL = new URL(HOME_PATH, request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return NextResponse.next();
  }
}
