import type { MetadataRoute } from 'next';

const SITE = 'https://gamebeat.online';
const LOCALES = ['ko', 'en', 'ja', 'zh'];
const GAMES = ['lostark', 'maplestory', 'dnf', 'lol', 'dota2', 'cs2', 'valorant'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    entries.push({ url: `${SITE}/${locale}/`, lastModified, changeFrequency: 'hourly', priority: 1.0 });
    for (const g of GAMES) {
      entries.push({ url: `${SITE}/${locale}/${g}/`, lastModified, changeFrequency: 'daily', priority: 0.9 });
    }
  }
  return entries;
}
