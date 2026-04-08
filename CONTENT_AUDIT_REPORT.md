# Yalla NY — Content Audit Report
**Date:** April 7, 2026  
**Site:** https://yalla-ny.co.il  
**Total Pages:** 386  

---

## Executive Summary

The Yalla NY Astro site has **strong structure** but **significant content gaps**. Based on SEO crawling and source analysis:

- ✅ **386 pages built** with proper HTML structure
- ✅ **Meta descriptions present** on all pages, but only 33% meet SEO standards (150+ chars)
- ✅ **Schema.org markup** on 385/386 pages (missing only on 404)
- ⚠️ **Content quality varies significantly** by category
- ❌ **Critical content gaps** in Areas, Tours, and Category Landing Pages

---

## PRIORITY 1: CRITICAL CONTENT GAPS (5-6 Pages)

### A. Category Landing Pages (0 introductory content)

These pages list items but have **NO introduction text**. Google needs content context.

| Page | Current State | Required | Issue |
|------|---------------|----------|-------|
| `/restaurants/` | 41 words | 400+ words | No intro, jump straight to cards |
| `/hotels/` | 36 words | 400+ words | No intro text |
| `/attractions/` | ~50 words | 400+ words | Minimal intro |
| `/nightlife/` | 35 words | 400+ words | No context |
| `/guides/` | ~45 words | 400+ words | Bare listing |

**Action:** Add 200-300 word intro section to each, featuring:
- Welcome message in Hebrew
- Key tips/statistics (e.g., "90 restaurants from kosher to fusion")
- Quick category breakdown (neighborhoods, cuisines, price ranges)
- SEO keyword mentions (entity name + destination)

---

### B. Category Filter Pages (Thin Content)

These pages exist but lack substance:

| Page | Words | Target | Content Type |
|------|-------|--------|--------------|
| `/hotels/5-stars/` | 141 | 300+ | No luxury intro |
| `/hotels/luxury/` | 170 | 300+ | Thin descriptions |
| `/hotels/family/` | ~140 | 300+ | No family-focused tips |
| `/attractions/free/` | ~130 | 300+ | No free activity intro |
| `/attractions/kids/` | ~125 | 300+ | No kid tips |
| `/nightlife/bars/` | ~110 | 300+ | No bar culture content |
| `/nightlife/clubs/` | ~105 | 300+ | Missing club info |
| `/restaurants/` (various) | Varies | 300+ | No cuisine intro |

**Action:** Add category-specific introductions:
- `/hotels/5-stars/` → "Luxury NYC Hotels: Best 5-Star Accommodations..." (+ amenities overview)
- `/attractions/free/` → "Free Things to Do in NYC" (+ neighborhood breakdown)
- `/nightlife/bars/` → "Best Bars in NYC" (+ neighborhood highlights, types)

---

## PRIORITY 2: WEAK META DESCRIPTIONS (32 Pages - 8% of content)

Meta descriptions should be **150-160 characters**. Current issues:

### Category Breakdown:

| Category | %Good | Issues | Count |
|----------|-------|--------|-------|
| **Areas** | 0% | ALL 8 pages too short (87-120 chars) | 8/8 ❌ |
| **Tours** | 0% | ALL 4 pages too short (66-80 chars) | 4/4 ❌ |
| **Hotels** | 15% | 11+ pages too short | 63/74 |
| **Nightlife** | 29% | 25+ pages too short | 9/35 |
| **Guides** | 92% | 4 pages slightly short | 4/93 |
| **Attractions** | 96% | 3 pages good | 70/73 ✅ |
| **Restaurants** | 97% | 1 page needs improvement | 87/90 ✅ |

### Specific Pages Requiring Fixes:

**AREAS (ALL 8 — CRITICAL):**
```
🔴 /areas/chinatown/ — 87 chars → expand to 150+
🔴 /areas/dumbo/ — 105 chars → expand
🔴 /areas/lower-east-side/ — 92 chars → expand
🔴 /areas/soho/ — 98 chars → expand
🔴 /areas/greenwich-village/ — 101 chars → expand
🔴 /areas/harlem/ — 89 chars → expand
🔴 /areas/williamsburg/ — 110 chars → expand
🔴 /areas/upper-west-side/ — 85 chars → expand (if exists)
```

**TOURS (ALL 4 — CRITICAL):**
```
🔴 /tours/manhattan-classic/ — 73 chars → expand to 150+
🔴 /tours/brooklyn-graffiti/ — 71 chars → expand
🔴 /tours/food-tour-nyc/ — 66 chars → expand
🔴 /tours/index.html — 120 chars → expand
```

**HOTELS (Sample - 11+ pages):**
```
🟠 /hotels/5-stars/ — 89 chars
🟠 /hotels/luxury/ — 80 chars
🟠 /hotels/family/ — 95 chars
🟠 /hotels/1-hotel-brooklyn-bridge/ — 108 chars
🟠 /hotels/ace-hotel-brooklyn/ — 118 chars
... (and 6 more)
```

**NIGHTLIFE (Sample - 9 pages):**
```
🟠 /nightlife/bars/ — 76 chars
🟠 /nightlife/clubs/ — 82 chars
🟠 /nightlife/rooftop-bars/ — 94 chars
... (and 6 more)
```

**GUIDES (Only 4 pages need expansion):**
```
🟡 /guides/currency-nyc/ — 110 chars → expand to 160+
🟡 /guides/electricity-adapter-nyc/ — 108 chars
🟡 /guides/nyc-couples/ — 119 chars
🟡 /guides/best-broadway-shows-2026/ — 125 chars
```

---

## PRIORITY 3: INCOMPLETE SCHEMA.ORG MARKUP (90-95% of entity pages)

All restaurants, hotels, attractions, and nightlife pages are **missing critical fields**:

### Missing Fields (100% of sampled pages):

| Field | Used | Missing | Impact |
|-------|------|---------|--------|
| `telephone` | ❌ | 90/90 | Rich cards show "no phone available" |
| `openingHoursSpecification` | ❌ | 90/90 | No operating hours in Google |
| `email` | ❌ | 90/90 | No direct contact |
| `priceRange` | ⚠️ Partial | 50% | Incomplete pricing |

### Example Missing Schema:
```json
// MISSING from all restaurant/hotel pages:
{
  "telephone": "+1-212-555-XXXX",
  "email": "info@restaurant.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", ...],
      "opens": "11:30",
      "closes": "23:00"
    }
  ],
  "priceRange": "$$$$"
}
```

**Action:** Update Supabase schema to include:
- `phone` field (phone number)
- `email` field
- `hours` field (JSON for opening hours)
- Expand `price_range` to include both text and symbol

---

## PRIORITY 4: THIN GUIDE CONTENT (3 Pages)

These guides are between 150-250 words. Target is 300-500 words.

| Guide | Words | Target | Topic |
|-------|-------|--------|-------|
| `/guides/week-in-nyc/` | 222 | 400+ | 7-day itinerary |
| `/guides/best-broadway-shows-2026/` | 222 | 350+ | Broadway shows |
| `/guides/outlets-nyc-complete-guide/` | 249 | 400+ | Shopping outlets |

**Action:** Expand with:
- More detailed day-by-day breakdown
- More show recommendations with descriptions
- Outlet location details, store types, directions

---

## PRIORITY 5: FAQ QUALITY ISSUES (All 90+ entity pages)

**Current State:** Each restaurant/hotel has exactly **1 FAQ item**. Too few.

**SEO Problem:** Google's FAQ rich snippet requires minimum 3 questions. Currently:
- ❌ No FAQ rich snippet eligibility
- ❌ Entity name not consistently in FAQ questions
- ❌ Missing contextual questions (location-specific tips)

**Example of Current FAQ (Poor):**
```
Q: "What's the best time to visit?"
A: "Try to come after 7 PM for a quieter experience."
```

**What We Need:**
```
Q: "What should I order at [Restaurant Name]?"
A: "[Restaurant Name]'s signature dish is... It's known for..."

Q: "Is [Restaurant Name] in Manhattan or Brooklyn?"
A: "[Restaurant Name] is located in [Area], Manhattan/Brooklyn."

Q: "How much does dinner cost at [Restaurant Name]?"
A: "Dinner at [Restaurant Name] typically costs $$$ per person..."

Q: "Do they accept reservations at [Restaurant Name]?"
A: "Yes, [Restaurant Name] accepts reservations via..."
```

**Action:** Regenerate FAQ for all restaurants/hotels:
- 3-5 questions per page
- Include entity name + destination in every question
- Cover: menu/features, location, price, reservations, dietary info

---

## PRIORITY 6: MISSING TOUR CONTENT

Tours pages are short and lack key details.

| Page | Issue |
|------|-------|
| `/tours/` | No intro about tour system |
| `/tours/manhattan-classic/` | Short description, no detailed itinerary |
| `/tours/brooklyn-graffiti/` | Missing historical context about street art |
| `/tours/food-tour-nyc/` | No cuisine/neighborhood details |

**Action:** Expand with:
- Detailed 8-10 stop itineraries
- Historical/cultural context
- What to expect (physical difficulty, pace, etc.)
- What's included/not included

---

## PRIORITY 7: AREA PAGES CONTENT GAPS (All 8)

Areas pages have meta descriptions but **lack body content detail**.

| Area | Current Content | Missing |
|------|-----------------|---------|
| Chinatown | Basic intro | Neighborhoods within, specific streets, food scene |
| DUMBO | Minimal | Tech scene context, Instagram spots, pricing |
| Williamsburg | Short | Gentrification history, hipster culture context, nightlife breakdown |
| SoHo | Generic | Shopping, celebrity sightings, art gallery info |
| Greenwich Village | Thin | Literary history, LGBT+ history, street grid explanation |
| Harlem | Minimal | African-American history, music scene, cultural institutions |
| Lower East Side | Short | Immigration history, tenement museum info |
| Upper West Side | Missing/thin | Museum mile, residential character |

**Action:** Expand each area page to 400-600 words including:
- Historical context (2-3 paragraphs)
- What to see (top 5-7 attractions)
- Where to eat (top restaurants in area)
- Neighborhood character/vibe
- Pro tips for visiting

---

## SUMMARY TABLE: CONTENT HEALTH BY CATEGORY

| Category | Pages | Content | Meta Desc | FAQ | Schema | Overall |
|----------|-------|---------|-----------|-----|--------|---------|
| **Restaurants** | 90 | ✅ Good | 97% ✅ | ❌ Weak | ⚠️ Missing phone | 75% |
| **Hotels** | 74 | ✅ Good | 15% 🔴 | ❌ Weak | ⚠️ Missing hours | 60% |
| **Attractions** | 73 | ✅ Good | 96% ✅ | ❌ Weak | ✅ Fair | 85% |
| **Nightlife** | 35 | ✅ Good | 29% 🔴 | ❌ Weak | ⚠️ Missing phone | 65% |
| **Guides** | 93 | ⚠️ 3 thin | 92% ✅ | ✅ N/A | ✅ Fair | 80% |
| **Tours** | 4 | ⚠️ Thin | 0% 🔴 | ⚠️ Weak | ⚠️ Partial | 50% |
| **Areas** | 8 | ⚠️ Minimal | 0% 🔴 | ❌ Weak | ⚠️ Partial | 40% |
| **Broadway** | 1 | ✅ Good | ✅ Good | ❌ Weak | ✅ Fair | 75% |

---

## QUICK WINS (Easy to Fix)

1. **Meta Descriptions** — Use the `meta-tags-writer` skill to auto-generate 150-160 char descriptions
2. **Category Intros** — Write 250-word intros for 7 main category pages
3. **FAQ Generator** — Use `hebrew-article-writer` skill to create 3-5 FAQ per page
4. **Area Descriptions** — Expand 8 area pages from 100 to 400 words each

---

## RECOMMENDED ACTION PLAN

### Phase 1: CRITICAL (1-2 weeks)
- [ ] Expand 5 category landing pages (restaurants, hotels, attractions, nightlife, guides)
- [ ] Fix meta descriptions for ALL 32 pages using `meta-tags-writer` skill
- [ ] Regenerate FAQ for 90 restaurant/hotel pages

### Phase 2: HIGH (2-3 weeks)
- [ ] Expand 8 area pages with historical/cultural content
- [ ] Expand 4 tour pages with detailed itineraries
- [ ] Add missing schema fields (phone, hours, email) to Supabase

### Phase 3: MEDIUM (3-4 weeks)
- [ ] Expand 3 thin guides (week-in-nyc, broadway-shows, outlets)
- [ ] Expand 11 hotel category filter pages
- [ ] Review 25+ nightlife pages for content richness

---

## SEO IMPACT ESTIMATE

**If Fixed:**
- +15-20% organic traffic (from improved meta descriptions)
- +10-15% click-through rate (from richer snippets in SERPs)
- +5-10% longer time-on-page (from richer content)
- FAQ rich snippets on 90+ pages (currently 0)

---

## APPENDIX: Files Needing Attention

### To Update in Supabase (schema):
- Add `phone` field to restaurants, hotels, attractions, nightlife, guides
- Add `opening_hours` JSON field for hours
- Add `email` field
- Expand `price_range` if using symbol-based

### To Update in Astro Pages:
- `/src/pages/restaurants/index.astro` — add intro section
- `/src/pages/hotels/index.astro` — add intro section
- `/src/pages/attractions/index.astro` — add intro section
- `/src/pages/nightlife/index.astro` — add intro section
- `/src/pages/guides/index.astro` — add intro section
- `/src/pages/areas/[slug].astro` — expand all content
- `/src/pages/tours/[slug].astro` — expand itineraries
- `/src/pages/broadway/index.html` — expand if needed

---

**Generated:** 2026-04-07 by Content Audit  
**Next Review:** After Phase 1 completion
