import Link from 'next/link';
import type { Metadata } from 'next';
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

const GAME_NOTES: Record<string, string[]> = {
  lostark: [
    'Track auction-house materials before raid reset because consumable demand can move faster than guide pages update.',
    'Compare current buy price with average price before assuming a listing is cheap.',
    'Use market cards as a pre-check, then verify in the in-game auction house before purchasing.'
  ],
  maplestory: [
    'Check event shops, cube timing, and upgrade material demand before interpreting market noise.',
    'Separate reboot and regular-world context because economy signals are not interchangeable.',
    'Use this page as an update hub while deeper price integrations are being expanded.'
  ],
  dnf: [
    'Watch patch notes, raid material demand, and avatar package timing before making upgrade decisions.',
    'Separate short event spikes from durable market movement.',
    'Use the hub to keep key update context in one internal page before opening external sources.'
  ],
  lol: [
    'Track patch cadence, champion changes, and esports schedule context together.',
    'Use update notes to decide whether a pick is meta noise or a durable change.',
    'Keep match and patch research inside the page before leaving for external coverage.'
  ],
  dota2: [
    'Compare hero balance changes with tournament drafts before chasing short-term trends.',
    'Watch item changes and role shifts because they often matter more than win-rate headlines.',
    'Use this hub as a stable entry point for patch and market notes.'
  ],
  cs2: [
    'Separate skin-market movement from gameplay patch context.',
    'Check map pool changes, case drops, and major tournament timing before buying items.',
    'Use internal notes first so outbound marketplace clicks are deliberate.'
  ],
  valorant: [
    'Compare agent balance, map rotation, and esports meta before judging a patch.',
    'Watch bundle timing separately from gameplay updates.',
    'Use this hub for quick context before opening external match or store pages.'
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, game } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as any) || !GAME_LABELS[game]) return {};
  const title = `${GAME_LABELS[game]} market and update dashboard | GameBeat`;
  const description = `Track ${GAME_LABELS[game]} market signals, patch context, match notes, and internal next steps before opening external game resources.`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/${game}` },
    openGraph: { title, description, url: `https://gamebeat.online/${locale}/${game}` },
  };
}

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
  const notes = GAME_NOTES[game] ?? [];

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

        <section className="mt-6 grid gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-xl font-semibold">What this page is for</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              GameBeat keeps the first click on a real game-specific dashboard. Use these notes to decide what to check next before opening an external marketplace, patch note, or community link.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              A good game page should not be only a doorway. Read the update angle, market context, and schedule pressure
              together so the next click has intent, especially when a live API is temporarily quiet.
            </p>
          </div>
          <ul className="space-y-2 text-sm leading-6 text-slate-300">
            {notes.map((note) => (
              <li key={note}>- {note}</li>
            ))}
            <li>- Recheck the home board when no live card appears; empty data usually means no current match, not a broken page.</li>
          </ul>
        </section>

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
            <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-300 md:grid-cols-3">
              <div className="rounded-lg bg-slate-950 p-4">Check patch timing, event windows, and esports schedule before interpreting a quiet market page.</div>
              <div className="rounded-lg bg-slate-950 p-4">Use the internal dashboard as a staging point so marketplace or community clicks are deliberate.</div>
              <div className="rounded-lg bg-slate-950 p-4">Return after major updates because the useful signal often appears when players react to balance changes.</div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
