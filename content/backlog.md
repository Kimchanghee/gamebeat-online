# GameBeat question backlog

Lane: headsets, mice, keyboards, monitors, chairs, capture. No console/game/gift-card commerce (those belong to gamedealwave.online).

Rule: one question = one page. Before writing, check this table and `/guides/` + `/picks/` for a page on the same question; update that page instead of creating a duplicate. Product picks also need the exact-link evidence and gates in `ops/POSTING-RULES.md`. This backlog does not enable hourly publication.

Status: `live` (public page returns 200), `queued` (next up), `idea`, `held` (manuscript prepared, not published). Live statuses checked 2026-10-20 (HTTP 200 on each URL).

| Question | Basis | Type | Status | URL |
|---|---|---|---|---|
| What limits a capture card: HDMI, USB or HDCP? | elgato.com, help.elgato.com (facts checked 2026-10-16) | guide | live | https://gamebeat.online/guides/capture-card-hdmi-usb-hdcp/ |
| How do you choose a gaming chair that fits your desk? | osha.gov (facts checked 2026-10-15) | guide | live | https://gamebeat.online/guides/gaming-chair-fit/ |
| How do you choose mouse shape and sensitivity? | logitech.com (facts checked 2026-10-15) | guide | live | https://gamebeat.online/guides/gaming-mouse-shape-sensitivity/ |
| How can you manage headphone volume during gaming? | who.int (facts checked 2026-10-16) | guide | live | https://gamebeat.online/guides/headphone-safe-listening-volume/ |
| Which headset connection fits your gaming setup? | support.steelseries.com (facts checked 2026-10-15) | guide | live | https://gamebeat.online/guides/headset-connection-guide/ |
| How do you choose keyboard switches and layout? | help.corsair.com, corsair.com (facts checked 2026-10-15) | guide | live | https://gamebeat.online/guides/keyboard-switch-layout/ |
| How should you position a monitor on your gaming desk? | osha.gov (facts checked 2026-10-16) | guide | live | https://gamebeat.online/guides/monitor-desk-viewing-ergonomics/ |
| How do you match monitor resolution, refresh and inputs? | support.microsoft.com (facts checked 2026-10-15) | guide | live | https://gamebeat.online/guides/monitor-resolution-refresh-input/ |
| Should I buy the Logitech G PRO X SUPERLIGHT 2? | logitechg.com product page; exact listing check in `ops/link-checks/` | pick | live | https://gamebeat.online/picks/logitech-g-pro-x-superlight-2-white-checklist/ |
| Does capture card passthrough resolution differ from recorded resolution? | Adjacent to the live capture-card guide; needs maker/official sources before writing | guide | queued | |
| Where should I place a gaming microphone to reduce room noise? | Adjacent to the headset connection guide; needs maker/official sources | guide | idea | |
| Monitor stand or arm: what VESA and desk checks matter? | Adjacent to the monitor desk ergonomics guide; needs maker/official sources | guide | idea | |
| Should I buy the Razer DeathAdder V3 (wired)? | razer.com product page; manuscript in `ops/queue/` | pick | held (program not enabled, link pending) | |
| Should I buy the CORSAIR HS80 RGB WIRELESS (Carbon)? | corsair.com product page; manuscript in `ops/queue/` | pick | held (program not enabled, link pending) | |

## Sources of new rows
Search Console queries with impressions but no dedicated page (after 14 days of data), "People also ask" boxes seen during per-post SERP research, and reader email.

## Refresh and merge policy
- Mark a live page `refresh-needed` when its source facts change or its impressions drop by 30% or more between measurement windows.
- Change `updated` / dateModified only when the page content actually changes.
- Two pages answering the same question: keep the stronger one, 301 the other to it and keep the canonical on the survivor. Use 410 only as a last resort.
