# Content Repair Progress — WeNewYorker

Last audit: **0/437 issues** (all clean) as of 2026-04-14.

## Summary

| Table | Total | Passing | Issues |
|---|---|---|---|
| restaurants | 119 | 119 ✅ | 0 |
| hotels | 70 | 70 ✅ | 0 |
| attractions | 105 | 105 ✅ | 0 |
| tours | 3 | 3 ✅ | 0 |
| nightlife | 40 | 40 ✅ | 0 |
| guides | 93 | 93 ✅ | 0 |
| areas | 7 | 7 ✅ | 0 |

## Work Completed (2026-04-14)

### Phase 1: Image Repair (43 attractions)
43 attractions had broken Google Places photo URLs (HTTP 404). Replaced each `image` with `gallery_urls[0]` via `scripts/fill-main-image.mjs --check-remote --apply`. Original URL saved to `metadata.original_image`.

### Phase 2: Area Excerpt (1 area)
- `harlem` — excerpt expanded from 58 to 176 chars.

### Phase 3: Nightlife full_content (36 entities)
All 36 entries had `full_content = 0`. Each received 1700-3300 chars of Hebrew content following skill DNA: H2 with venue name, FAQ section, CTA, markdown.

### Phase 4: Restaurants (45 entities)
All 45 received expanded description (200-280 chars) + full_content (1300-2900 chars).

### Phase 5: Attractions (35 entities)
- 15 Broadway shows (full_content 1100-1500 chars)
- 20 landmarks (full_content 1400-1900 chars)

### Phase 6: Tours (3 entities)
All 3 received expanded description (240-280 chars) + full_content (2300-3000 chars).

### Phase 7: Polish (2026-04-14)
- Em-dashes (—) replaced with regular hyphens across 130 rows (831 replacements)
- `scripts/audit-all-entities.mjs` passes with 0/437 issues
- `npm run build` succeeds (578 pages, 0 errors)

## Scripts Created

- [audit-all-entities.mjs](audit-all-entities.mjs) — comprehensive audit tool
- [fill-main-image.mjs](fill-main-image.mjs) — extended with `--check-remote` flag
- [strip-em-dashes.mjs](strip-em-dashes.mjs) — em-dash sanitizer
- Batch scripts: `nightlife-batch{1-5}.mjs`, `restaurants-batch{1-5}.mjs`, `attractions-batch{1-4}.mjs`, `tours-batch1.mjs`

## Remaining Work (Phase 8+)

- `meta_title` / `meta_description` population for 118 entities (in progress)
- `faq` JSONB structured column population for 118 entities (in progress)
- Visual spot-check on dev server (pending)
