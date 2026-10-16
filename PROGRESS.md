# PROGRESS — gamebeat.online v2 (branch v2-cloudflare-static)

Resume rule: read this file first; continue from the first unchecked milestone. Commit + push after each (host restarts often).
Pipeline ported from gamedealwave.online (commit 15d3030): same gate/publish/refresh scripts, new identity + design + content.
Authoring note: run `node scripts/quote-fm.mjs` after writing content. `pnpm build` runs prebuild (cache clear + OG).

- [x] M0 branch v2-cloudflare-static (main untouched); old Next.js/LostArk tree deleted incl. .env.local/.env.production; seo/before-curl.txt (402) kept
- [x] M1a port: gamedealwave tracked files copied (guides, after-curl, scorecard, indexnow key removed) — commit 3ead162
- [ ] M1b identity: site.config (domain, name, categories headsets/mice/keyboards/monitors/chairs/capture, new IndexNow key), content.config enum, package name, wrangler name
- [ ] M1c design: "loadout bench / spec sheet" (replace price-tag wall CSS/components/home/header/footer/404/OG)
- [ ] M2 content: 8 guides (sources verified), docs rewritten, backlog, POSTING-RULES, examples re-themed
- [ ] M3 build + gate + gate:examples + tests + astro check + publish dry run
- [ ] M4 SEO: after-curl, scorecard, measure.md, DESIGN_REFERENCES.md
- [ ] M5 QA screenshots 1440/390 + adversarial review vs gamedealwave
- [ ] M6 final push + report
