import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ko', 'ja'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Preserve existing homepage responses on these single-segment paths.
  if (pathname !== '/') {
    const segment = pathname.replace(/^\/+|\/+$/g, '');
    if (['en', 'ko', 'ja', 'zh', 'about', 'blog'].includes(segment)) {
      return NextResponse.next();
    }

    return new NextResponse(
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>404: Page not found | GameBeat</title><style>body{font-family:system-ui,sans-serif;margin:0;color:#e2e8f0;background:#020617}main{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:1.5rem;box-sizing:border-box}h1{font-size:2rem}a{color:#fb923c}</style></head><body><main><h1>404: Page not found</h1><p>The page you requested could not be found.</p><a href="/">Go to homepage</a></main></body></html>',
      {
        status: 404,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex',
        },
      }
    );
  }

  // Detect locale
  const acceptLang = request.headers.get('accept-language') || '';
  let locale = defaultLocale;
  if (acceptLang.toLowerCase().includes('ko')) locale = 'ko';
  else if (acceptLang.toLowerCase().includes('ja')) locale = 'ja';
  else if (acceptLang.toLowerCase().includes('en')) locale = 'en';

  return NextResponse.redirect(new URL('/' + locale, request.url));
}

export const config = {
  matcher: ['/', '/:segment([^/.]+)'],
};
