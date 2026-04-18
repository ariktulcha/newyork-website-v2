// TodayTix Integration for WeNewYorker (Broadway tickets)
// Partner: wenewyorker

export const TODAYTIX_PARTNER = 'wenewyorker'
export const TODAYTIX_BASE_URL = 'https://www.todaytix.com'

// Generate an affiliate link. `showSlug` optional — falls back to NYC shows list.
export function getTodayTixLink(showSlug?: string): string {
  const qs = `utm_source=${TODAYTIX_PARTNER}&utm_medium=affiliate`
  if (showSlug) {
    return `${TODAYTIX_BASE_URL}/nyc/shows/${showSlug}?${qs}`
  }
  return `${TODAYTIX_BASE_URL}/nyc/shows?${qs}`
}

// Search URL — use when the exact TodayTix slug isn't known
export function getTodayTixSearchLink(query: string): string {
  const qs = new URLSearchParams({
    q: query,
    utm_source: TODAYTIX_PARTNER,
    utm_medium: 'affiliate',
  })
  return `${TODAYTIX_BASE_URL}/nyc/shows?${qs.toString()}`
}

// Known show slug mapping (internal slug -> TodayTix slug). Where unknown,
// we fall back to a search URL built from name_en.
export const TODAYTIX_SHOWS: Record<string, string> = {
  'hamilton': 'hamilton',
  'the-lion-king': 'the-lion-king',
  'wicked': 'wicked',
  'aladdin': 'aladdin',
  'chicago': 'chicago',
  'the-book-of-mormon': 'the-book-of-mormon',
  'moulin-rouge': 'moulin-rouge-the-musical',
  'harry-potter-cursed-child': 'harry-potter-and-the-cursed-child',
  'mj-the-musical': 'mj-the-musical',
  'hadestown': 'hadestown',
  'six': 'six',
  'dear-evan-hansen': 'dear-evan-hansen',
  'phantom-of-the-opera': 'the-phantom-of-the-opera',
  'come-from-away': 'come-from-away',
  'beetlejuice': 'beetlejuice-the-musical',
  'cabaret': 'cabaret-at-the-kit-kat-club',
  'hells-kitchen': 'hells-kitchen',
  'the-great-gatsby': 'the-great-gatsby',
  'water-for-elephants': 'water-for-elephants',
  'suffs': 'suffs',
  'back-to-the-future': 'back-to-the-future-the-musical',
  'the-outsiders': 'the-outsiders',
  'maybe-happy-ending': 'maybe-happy-ending',
  'operation-mincemeat': 'operation-mincemeat',
  'oh-mary': 'oh-mary',
  'othello-denzel': 'othello',
  'romeo-and-juliet': 'romeo-and-juliet',
  'stranger-things-first-shadow': 'stranger-things-the-first-shadow',
  'gypsy-revival': 'gypsy',
  'glengarry-glen-ross-revival': 'glengarry-glen-ross',
  'elf-the-musical': 'elf-the-musical',
  'buena-vista-social-club': 'buena-vista-social-club',
  'sunset-boulevard': 'sunset-boulevard',
  'sunset-blvd-revival': 'sunset-boulevard',
  'stomp-off-broadway': 'stomp',
  'real-women-have-curves': 'real-women-have-curves',
  'boop-musical': 'boop-the-musical',
  'smash': 'smash',
  'tammy-faye': 'tammy-faye',
  'death-becomes-her': 'death-becomes-her',
  'and-juliet': 'and-juliet',
  'all-in-comedy-about-love': 'all-in-comedy-about-love',
  'cult-of-love': 'cult-of-love',
  'gutenberg-the-musical': 'gutenberg-the-musical',
  'a-wonderful-world': 'a-wonderful-world',
  'left-on-tenth': 'left-on-tenth',
  'merrily-we-roll-along': 'merrily-we-roll-along',
  'once-upon-a-mattress': 'once-upon-a-mattress',
  'our-town-revival': 'our-town',
  'stereophonic': 'stereophonic',
  'swept-away': 'swept-away',
  'the-hills-of-california': 'the-hills-of-california',
  'the-notebook': 'the-notebook-the-musical',
  'the-roommate': 'the-roommate',
  'the-whos-tommy': 'the-whos-tommy',
}

export function getShowTodayTixLink(showId: string, nameEn?: string): string {
  const slug = TODAYTIX_SHOWS[showId]
  if (slug) return getTodayTixLink(slug)
  return nameEn ? getTodayTixSearchLink(nameEn) : getTodayTixLink()
}
