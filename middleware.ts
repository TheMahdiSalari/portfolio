// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value;

  // اگر کاربر سعی دارد به داشبورد برود و لاگین نیست
  if (request.nextUrl.pathname.startsWith('/dashboard') && !currentUser) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // اگر کاربر لاگین است و سعی دارد به صفحه لاگین برود
  if (request.nextUrl.pathname.startsWith('/login') && currentUser) {
      // اعتبارسنجی توکن
      try {
          await decrypt(currentUser);
          return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch (error) {
          // اگر توکن نامعتبر بود، بذار بره تو صفحه لاگین
      }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}