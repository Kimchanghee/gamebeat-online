import { setRequestLocale } from 'next-intl/server';
import { searchAuction, TRACKED_ITEMS, type AuctionItem } from '@/lib/lostark';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export const revalidate = 3600; // 1h ISR

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
    </main>
  );
}
