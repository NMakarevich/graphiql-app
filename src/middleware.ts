import { chain } from '@/middlewares/chain/chain';
import middlewareWithAuth from '@/middlewares/middlewareWithAuth/middlewareWithAuth';
import middlewareLocale from '@/middlewares/middlewareLocale/middlewareLocale';

export default chain([middlewareLocale, middlewareWithAuth]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
