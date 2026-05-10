import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'GameBeat — e스포츠 일정 + MMO 시세 통합',
  description: '로스트아크·LoL·Dota 2·CS2·발로란트 e스포츠 일정과 MMORPG 거래소 시세를 한 곳에서. 실시간 데이터.',
  keywords: ['e스포츠 일정', '로스트아크 시세', 'LoL 일정', 'Dota 2 일정', 'CS2', '발로란트', 'esports schedule', 'MMORPG market'],
  metadataBase: new URL('https://gamebeat.online'),
  alternates: {
    canonical: '/',
    languages: { ko: '/ko', en: '/en', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://gamebeat.online',
    siteName: 'GameBeat',
    title: 'GameBeat — e스포츠 일정 + MMO 시세',
    description: '로스트아크·LoL·Dota·CS2·발로란트 데이터 통합',
  },
  twitter: { card: 'summary_large_image', title: 'GameBeat', description: 'e스포츠 일정 + MMO 시세' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                { '@type': 'Organization', '@id': 'https://gamebeat.online#org', name: 'GameBeat', url: 'https://gamebeat.online' },
                { '@type': 'WebSite', '@id': 'https://gamebeat.online#site', url: 'https://gamebeat.online', name: 'GameBeat', inLanguage: 'ko-KR', publisher: { '@id': 'https://gamebeat.online#org' } },
                { '@type': 'WebApplication', name: 'GameBeat', applicationCategory: 'GameApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
