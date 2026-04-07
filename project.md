# יאללה ניו יורק — Project Definition

## Company
**Name:** יאללה ניו יורק
**Language:** Hebrew
**Target Audience:** Israeli travelers
**Domain:** https://yalla-ny.co.il
**Supabase Destination ID:** newyork

---

## Clone Checklist

### Config (do first):
- [ ] Edit `src/config/site.ts` — brand, WhatsApp, socials, nav, footer
- [ ] Verify `.env` has correct keys

### Special Pages (decide per page):
- [ ] `visa.astro` — keep/delete/rewrite
- [ ] `beaches.astro` — keep/delete/rewrite
- [ ] `weather.astro` — keep/delete/rewrite
- [ ] `shopping.astro` — keep/delete/rewrite
- [ ] `plan.astro` — keep/delete/rewrite

### Category Pages (verify data exists):
- [ ] `areas/index.astro` — verify data, update SEO text
- [ ] `attractions/free/index.astro` — verify data, update SEO text
- [ ] `attractions/index.astro` — verify data, update SEO text
- [ ] `attractions/kids/index.astro` — verify data, update SEO text
- [ ] `guides/index.astro` — verify data, update SEO text
- [ ] `hotels/5-stars/index.astro` — verify data, update SEO text
- [ ] `hotels/beach/index.astro` — verify data, update SEO text
- [ ] `hotels/family/index.astro` — verify data, update SEO text
- [ ] `hotels/index.astro` — verify data, update SEO text
- [ ] `hotels/luxury/index.astro` — verify data, update SEO text
- [ ] `nightlife/bars/index.astro` — verify data, update SEO text
- [ ] `nightlife/beach-clubs/index.astro` — verify data, update SEO text
- [ ] `nightlife/clubs/index.astro` — verify data, update SEO text
- [ ] `nightlife/index.astro` — verify data, update SEO text
- [ ] `nightlife/rooftop/index.astro` — verify data, update SEO text
- [ ] `restaurants/fine-dining/index.astro` — verify data, update SEO text
- [ ] `restaurants/index.astro` — verify data, update SEO text
- [ ] `restaurants/japanese/index.astro` — verify data, update SEO text
- [ ] `restaurants/kosher/index.astro` — verify data, update SEO text
- [ ] `restaurants/meat/index.astro` — verify data, update SEO text
- [ ] `tours/index.astro` — verify data, update SEO text

### Content:
- [ ] Rewrite `index.astro` homepage — hero, featured, intro
- [ ] Rewrite `about.astro` — brand story
- [ ] Rewrite `contact.astro` — contact details
- [ ] Rewrite `faq.astro` — destination Q&As
- [ ] Add hero image to `public/images/heroes/`
- [ ] Add favicon

### Verify:
- [ ] `npm run build` — 0 errors
- [ ] Run SEO crawler — all pages have title, description, schema
- [ ] Compare with old site URLs — no missing pages
