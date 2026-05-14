import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { searchAuction, TRACKED_ITEMS, type AuctionItem } from '@/lib/lostark';

interface Props {
  params: Promise<{ locale: string; game: string }>;
}

export const revalidate = 3600;

const SUPPORTED_LOCALES = ['ko', 'en', 'ja', 'zh'] as const;
const GAME_LABELS: Record<string, string> = {
  lostark: 'Lost Ark',
  maplestory: 'MapleStory',
  dnf: 'Dungeon Fighter Online',
  lol: 'League of Legends',
  dota2: 'Dota 2',
  cs2: 'Counter-Strike 2',
  valorant: 'Valorant',
};

export default async function GamePage({ params }: Props) {
  const { locale, game } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as any) || !GAME_LABELS[game]) notFound();
  setRequestLocale(locale);

  const prices = game === 'lostark'
    ? await Promise.all(
        TRACKED_ITEMS.slice(0, 8).map(async (name) => ({
          name,
          items: await searchAuction(name).catch(() => [] as AuctionItem[]),
        }))
      )
    : [];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 p-4">
        <div className="container mx-auto flex max-w-6xl items-center justify-between">
          <Link href={`/${locale}`} className="text-2xl font-bold"><span className="text-orange-400">Game</span>Beat</Link>
          <Link href={`/${locale}`} className="text-sm text-slate-400 hover:text-orange-400">Home</Link>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-4xl font-bold tracking-tight">{GAME_LABELS[game]} dashboard</h1>
        <p className="mt-3 text-slate-400">Market signals, match context and update notes for {GAME_LABELS[game]}.</p>

        {game === 'lostark' ? (
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {prices.map(({ name, items }) => {
              const item = items[0];
              return (
                <article key={name} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <h2 className="font-semibold">{name}</h2>
                  <div className="mt-2 font-mono text-xl text-orange-400">
                    {item ? `${item.buyPrice.toLocaleString('ko-KR')}G` : 'Loading'}
                  </div>
                  {item && <p className="mt-1 text-xs text-slate-500">Average {item.averagePrice.toLocaleString('ko-KR')}G</p>}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold">Coverage hub</h2>
            <p className="mt-2 text-slate-400">
              This page keeps {GAME_LABELS[game]} indexed while live schedule and market integrations are expanded.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
