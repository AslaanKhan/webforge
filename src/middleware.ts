import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  const publicPaths = ['/sign-in', '/sign-up', '/'];

  if (publicPaths.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/company', request.url));
    }  
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  try {
    verifyToken(token.value);
    return NextResponse.next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}

// Specify the paths to match for this middleware
export const config = {
  matcher: ['/company', '/sign-in', '/sign-up' , '/'],
};

