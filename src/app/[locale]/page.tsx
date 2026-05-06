import { setRequestLocale } from 'next-intl/server';
import { searchAuction, TRACKED_ITEMS, type AuctionItem } from '@/lib/lostark';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export const revalidate = 3600; // 1h ISR

function buildAmazonUrl(keyword: string) {
  const url = new URL('https://www.amazon.com/s');
  url.searchParams.set('k', keyword);
  url.searchParams.set('tag', 'amazonfi00681-20');
  url.searchParams.set('linkCode', 'll2');
  return url.toString();
}

function buildCoupangUrl(keyword: string) {
  const custom = process.env.NEXT_PUBLIC_COUPANG_PARTNER_URL;
  if (custom) return custom;
  const url = new URL('https://www.coupang.com/np/search');
  url.searchParams.set('component', '');
  url.searchParams.set('q', keyword);
  return url.toString();
}

function buildAliExpressUrl(keyword: string) {
  const custom = process.env.NEXT_PUBLIC_ALIEXPRESS_PARTNER_URL;
  if (custom) return custom;
  return `https://www.aliexpress.com/w/wholesale-${encodeURIComponent(keyword.replace(/\s+/g, '-'))}.html`;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const trackedPrices = await Promise.all(
    TRACKED_ITEMS.slice(0, 6).map(async (name) => {
      const items = await searchAuction(name).catch(() => [] as AuctionItem[]);
      const cheapest = items[0];
      return { name, cheapest };
    })
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="container mx-auto flex max-w-6xl items-center justify-between p-4">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-orange-400">Game</span>Beat
          </div>
          <nav className="flex gap-3 text-sm">
            <Link href={`/${locale}/lostark`} className="hover:text-orange-400">로스트아크</Link>
            <Link href={`/${locale}/lol`} className="hover:text-orange-400">LoL</Link>
            <Link href={`/${locale}/dota2`} className="hover:text-orange-400">Dota 2</Link>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-br from-slate-900 to-slate-950 py-10">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">e스포츠 일정 + MMO 시세, 한 곳에</h1>
          <p className="mt-3 text-slate-400">로스트아크·LoL·Dota·CS2·발로란트 데이터 통합.</p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-xl font-semibold">⚒️ 로스트아크 핵심 재화 시세</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {trackedPrices.map(({ name, cheapest }) => (
            <div key={name} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <h3 className="font-semibold">{name}</h3>
              {cheapest ? (
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">현재가</span>
                    <span className="font-mono text-orange-400">{cheapest.buyPrice.toLocaleString('ko-KR')}G</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">평균</span>
                    <span className="font-mono text-slate-500">{cheapest.averagePrice.toLocaleString('ko-KR')}G</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">전일</span>
                    <span className="font-mono text-slate-500">{cheapest.yDayAvgPrice.toLocaleString('ko-KR')}G</span>
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-slate-500">데이터 로딩 중...</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="mb-2 text-xl font-semibold">Partner Picks</h2>
          <p className="mb-4 text-sm text-slate-400">게임 장비/굿즈/스토어 추천 링크입니다.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <a className="rounded-lg border border-amber-400/40 bg-slate-950 p-4 hover:border-amber-300" href={buildAmazonUrl('gaming headset')} target="_blank" rel="sponsored noopener noreferrer">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">Amazon</p>
              <p className="mt-1 text-sm">Gaming Headset</p>
            </a>
            <a className="rounded-lg border border-blue-400/40 bg-slate-950 p-4 hover:border-blue-300" href={buildCoupangUrl('게이밍 마우스')} target="_blank" rel="sponsored noopener noreferrer">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Coupang</p>
              <p className="mt-1 text-sm">게이밍 마우스</p>
            </a>
            <a className="rounded-lg border border-rose-400/40 bg-slate-950 p-4 hover:border-rose-300" href={buildAliExpressUrl('gaming keyboard')} target="_blank" rel="sponsored noopener noreferrer">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-300">AliExpress</p>
              <p className="mt-1 text-sm">Gaming Keyboard</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
