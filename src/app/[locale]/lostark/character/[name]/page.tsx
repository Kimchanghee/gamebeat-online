import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCharacterProfile } from '@/lib/lostark';

interface Props {
  params: Promise<{ locale: string; name: string }>;
}

export const revalidate = 600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, name } = await params;
  const decoded = decodeURIComponent(name);
  return {
    title: `${decoded} — 로스트아크 캐릭터 정보 | GameBeat`,
    description: `로스트아크 ${decoded} 캐릭터의 아이템 레벨, 직업, 클래스, 길드, 서버 정보.`,
    alternates: { canonical: `/${locale}/lostark/character/${encodeURIComponent(decoded)}/` },
  };
}

export default async function CharacterPage({ params }: Props) {
  const { locale, name } = await params;
  setRequestLocale(locale);

  const decoded = decodeURIComponent(name);
  const profile = await getCharacterProfile(decoded).catch(() => null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="container mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href={`/${locale}`} className="text-2xl font-bold">
            <span className="text-orange-400">Game</span>Beat
          </Link>
          <form action={`/${locale}/lostark/character/`} method="get" className="flex gap-2">
            <input
              type="text"
              name="q"
              placeholder="캐릭터명 검색..."
              className="rounded bg-slate-900 border border-slate-800 px-3 py-1.5 text-sm"
            />
            <button type="submit" className="rounded bg-orange-600 px-4 py-1.5 text-sm hover:bg-orange-700">
              Search
            </button>
          </form>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-4 py-8">
        {!profile ? (
          <div className="text-center py-16">
            <p className="text-2xl text-slate-300">"{decoded}" 캐릭터를 찾을 수 없습니다</p>
            <p className="mt-2 text-sm text-slate-500">캐릭터명을 정확히 입력했는지 확인해 주세요.</p>
            <Link href={`/${locale}`} className="mt-4 inline-block text-orange-400 hover:underline">
              ← 홈으로
            </Link>
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {profile.CharacterImage && (
                  <img
                    src={profile.CharacterImage}
                    alt={profile.CharacterName}
                    className="w-full md:w-64 rounded-xl bg-slate-800"
                  />
                )}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">{profile.CharacterName}</h1>
                  <div className="mt-1 text-sm text-slate-400">
                    {profile.ServerName} · {profile.CharacterClassName}
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Stat label="아이템 레벨" value={profile.ItemAvgLevel} />
                    <Stat label="전투 레벨" value={profile.CharacterLevel} />
                    <Stat label="원정대 레벨" value={profile.ExpeditionLevel} />
                    <Stat label="PvP 등급" value={profile.PvpGradeName || '-'} />
                    <Stat label="영지 레벨" value={profile.TownLevel || '-'} />
                    <Stat label="명성" value={profile.Title || '-'} />
                    {profile.GuildName && <Stat label="길드" value={profile.GuildName} />}
                    {profile.UsingSkillPoint && <Stat label="사용 스킬 포인트" value={`${profile.UsingSkillPoint} / ${profile.TotalSkillPoint}`} />}
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mt-10 mb-4 text-xl font-semibold">⚔️ 스탯</h2>
            {profile.Stats && Array.isArray(profile.Stats) ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {profile.Stats.map((s: any) => (
                  <div key={s.Type} className="rounded-lg border border-slate-800 bg-slate-900/30 p-3">
                    <div className="text-xs text-slate-400">{s.Type}</div>
                    <div className="mt-1 font-mono font-bold text-orange-300">{s.Value}</div>
                    {s.Tooltip?.[0] && (
                      <div className="mt-1 text-[10px] text-slate-500 line-clamp-2">{s.Tooltip[0]}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500">스탯 정보 없음</div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-slate-800/50 p-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 font-bold text-orange-300">{value}</div>
    </div>
  );
}
