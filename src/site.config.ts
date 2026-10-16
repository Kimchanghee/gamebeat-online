// Single source of site identity + monetization wiring. Erasable TS only (also imported by Node scripts).
// Merge both: astro.config (rehype link rewriting) sees process.env but an import.meta.env without PUBLIC_* values.
const env: Record<string, string | undefined> = {
  ...((globalThis as any).process?.env ?? {}),
  ...(((import.meta as any).env as Record<string, string | undefined>) ?? {}),
};

export const site = {
  domain: 'gamebeat.online',
  url: 'https://gamebeat.online',
  name: 'GameBeat',
  tagline: 'Build a loadout that fits.',
  description:
    'GameBeat explains gaming-gear compatibility, comfort and trade-offs through sourced buying guides for headsets, mice, keyboards, monitors, chairs and capture.',
  locale: 'en-US',
  ga4Id: env.PUBLIC_GA4_ID ?? '',
  gscVerification: env.PUBLIC_GSC_VERIFICATION ?? '',
  naverVerification: '',
  adsenseClient: 'ca-pub-4490818204529253',
  adsEnabled: env.PUBLIC_ADS_ENABLED === 'true',
  contactEmail: 'contact@gamebeat.online',
  // Amazon Associates (US). Not issued yet: '' => plain amazon.com product links, no tag, no Associates statement.
  amazonTag: '',
  affiliate: { amazonStoreUrl: '' },
  indexNowKey: '43b2d90f18464a9b80ab105ce1c1b752',
  siteUpdated: '2026-10-15',
  providerAllowlist: { amazon: ['www.amazon.com', 'amazon.com', 'amzn.to'] } as Record<string, string[]>,
  categories: [
  {
    "slug": "headsets",
    "name": "Headsets",
    "code": "AUD",
    "seoTitle": "Headsets Buying Guide: Compatibility and Setup | GameBeat",
    "blurb": "Choose headsets with a view of compatibility, practical fit and everyday compromises. Read sourced buying criteria before deciding what belongs in your setup."
  },
  {
    "slug": "mice",
    "name": "Mice",
    "code": "PTR",
    "seoTitle": "Mice Buying Guide: Compatibility and Setup | GameBeat",
    "blurb": "Choose mice with a view of compatibility, practical fit and everyday compromises. Read sourced buying criteria before deciding what belongs in your setup."
  },
  {
    "slug": "keyboards",
    "name": "Keyboards",
    "code": "KEY",
    "seoTitle": "Keyboards Buying Guide: Compatibility and Setup | GameBeat",
    "blurb": "Choose keyboards with a view of compatibility, practical fit and everyday compromises. Read sourced buying criteria before deciding what belongs in your setup."
  },
  {
    "slug": "monitors",
    "name": "Monitors",
    "code": "DSP",
    "seoTitle": "Monitors Buying Guide: Compatibility and Setup | GameBeat",
    "blurb": "Choose monitors with a view of compatibility, practical fit and everyday compromises. Read sourced buying criteria before deciding what belongs in your setup."
  },
  {
    "slug": "chairs",
    "name": "Chairs",
    "code": "ERG",
    "seoTitle": "Chairs Buying Guide: Compatibility and Setup | GameBeat",
    "blurb": "Choose chairs with a view of compatibility, practical fit and everyday compromises. Read sourced buying criteria before deciding what belongs in your setup."
  },
  {
    "slug": "capture",
    "name": "Capture",
    "code": "REC",
    "seoTitle": "Capture Buying Guide: Compatibility and Setup | GameBeat",
    "blurb": "Choose capture with a view of compatibility, practical fit and everyday compromises. Read sourced buying criteria before deciding what belongs in your setup."
  }
],
};

export const AMAZON_STATEMENT = 'As an Amazon Associate I earn from qualifying purchases.';
export const NO_TAG_STATEMENT =
  'Product links go to Amazon product pages without an affiliate tag. We earn nothing from them today; if that changes, this notice changes first.';

export function isAffiliateMode(): boolean {
  return site.amazonTag.trim().length > 0;
}

export function disclosureFor(provider: string): string {
  if (provider === 'amazon') return isAffiliateMode() ? AMAZON_STATEMENT : NO_TAG_STATEMENT;
  return 'This post contains links to a retailer. We may earn a commission if that link is an affiliate link.';
}

// Always the full set: harmless on untagged links, mandatory once the Associates tag is on (commerce gate checks it).
export function productRel(): string {
  return 'sponsored nofollow noopener';
}

export function productHref(raw: string): string {
  const u = new URL(raw);
  const amazon = site.providerAllowlist.amazon;
  if (isAffiliateMode() && amazon.includes(u.hostname) && u.hostname !== 'amzn.to') {
    u.searchParams.set('tag', site.amazonTag.trim());
  }
  return u.toString();
}
