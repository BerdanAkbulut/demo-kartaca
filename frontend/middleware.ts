import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    if (!request.cookies.get('user')) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }
  if (request.nextUrl.pathname === '/signin') {
    if (request.cookies.get('user')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname === '/signup') {
    if (request.cookies.get('user')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  //return NextResponse.redirect(new URL('/', request.url));
  // if (request.nextUrl.pathname === '/') {
  //   console.log('me');
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }
}

// Supports both a single string value or an array of matchers
