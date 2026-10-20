# Measurement plan — gamebeat.online

Status 2026-10-20: the site is live on Cloudflare Workers (static Astro build). The 2026-10-16 note that every path
returned HTTP 402 from Vercel (seo/before-curl.txt) is historical and no longer describes the live site.
Numeric baseline: pending Search Console / Bing Webmaster data. See seo/baseline-2026-10-20.md. No numbers are
recorded until they are read from those consoles.

## Baseline (2026-10-20)
- Search Console: domain property; read impressions, clicks, average position and indexed pages for the window
  ending 2026-10-20. Record them in seo/baseline-2026-10-20.md with the export date.
- Bing Webmaster: site imported from Search Console (no msvalidate meta is used). Record indexed pages and
  impressions when the report has data. IndexNow key file: /43b2d90f18464a9b80ab105ce1c1b752.txt.
- GA4: confirm page_view and outbound_affiliate_click events arrive (DebugView or Realtime).
- AI citation baseline: ask these questions in ChatGPT search, Perplexity and Google AI Overviews; record O/X
  whether gamebeat.online is cited (date each answer):
  1. What limits a capture card: HDMI, USB or HDCP?
  2. How do you choose a gaming chair that fits your desk?
  3. How do you choose mouse shape and sensitivity?
  4. How can you manage headphone volume during gaming?
  5. Which headset connection fits your gaming setup?
  6. How do you choose keyboard switches and layout?
  7. How should you position a monitor on your gaming desk?
  8. How do you match monitor resolution, refresh and inputs?
  9. Does capture card passthrough resolution differ from recorded resolution? (no page yet)
  10. Where should I place a gaming microphone to reduce room noise? (no page yet)
  11. Monitor stand or arm: what VESA and desk checks matter? (no page yet)
  12. What is GameBeat?

## Re-measure: 2026-11-03 (+14 days; exclude the last 3 days of data)
- GSC: impressions, clicks, average position by group (/guides/, /picks/, /category/), indexed pages,
  "Crawled - currently not indexed" list.
- Bing: indexed pages, impressions, clicks.
- Top queries with impressions but no dedicated page -> add a row to content/backlog.md.
- Cloudflare: bot traffic for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot,
  Perplexity-User (leading indicator).
- AI citation O/X for the same questions.
- Per post: share of /picks/ posts with >0 impressions (target metric, not post count).
- Outbound: outbound_affiliate_click events by destination_host and page.

## Changes on 2026-10-20 to attribute at re-measure
- robots.txt names Claude-User and Perplexity-User.
- llms.txt carries "Last updated: 2026-10-20".
- Guides and picks: the "Short answer" is the first paragraph after the H1; the byline moved below it.
  Category pages: the short answer now precedes the category blurb.

## Decision rules
- Impressions up, CTR flat -> rewrite titles/descriptions of the top 5 pages by impressions.
- A page with 0 impressions after 28 days -> check index status, then merge into a stronger guide (301) or improve.
- Watch the date of each metric, not just its value: a metric whose source has not updated in 7 days is not reported.

Report line format: `[Baseline] ... [Change] ... [Re-measure] 2026-11-03 ... [Result] ...`
