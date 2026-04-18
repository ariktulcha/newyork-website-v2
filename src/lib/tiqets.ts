// Tiqets Integration for WeNewYorker
// Partner: wenewyorker

export const TIQETS_PARTNER = 'wenewyorker'
export const TIQETS_BASE_URL = 'https://www.tiqets.com/en'
export const TIQETS_NYC_CITY = 'new-york-c72887'

// Build an affiliate URL — either a deep product link (if slug is known) or a
// search/city-landing link for discovery.
export function getTiqetsProductLink(productPath: string): string {
  // productPath should be e.g. "empire-state-building-p123456" or a NYC deep path
  return `${TIQETS_BASE_URL}/${TIQETS_NYC_CITY}/${productPath}/?partner=${TIQETS_PARTNER}`
}

export function getTiqetsSearchLink(query: string): string {
  const qs = new URLSearchParams({
    q: query,
    partner: TIQETS_PARTNER,
  })
  return `${TIQETS_BASE_URL}/search/?${qs.toString()}`
}

export function getTiqetsNYCLink(): string {
  return `${TIQETS_BASE_URL}/${TIQETS_NYC_CITY}/?partner=${TIQETS_PARTNER}`
}

// Internal slug -> Tiqets search query (we use search to be robust against
// Tiqets URL changes; user can swap to deep product links later if desired).
export const TIQETS_NYC_PRODUCTS: Record<string, string> = {
  // Observation decks
  'empire-state-building': 'Empire State Building',
  'top-of-the-rock': 'Top of the Rock',
  'edge-observation': 'Edge Hudson Yards',
  'summit-one-vanderbilt': 'Summit One Vanderbilt',
  'one-world-observatory': 'One World Observatory',

  // Museums
  'moma': 'MoMA Museum of Modern Art',
  'met-museum': 'Metropolitan Museum of Art',
  'guggenheim-museum': 'Guggenheim Museum',
  'natural-history-museum': 'American Museum of Natural History',
  'intrepid-museum': 'Intrepid Museum',
  'whitney-museum': 'Whitney Museum',
  '9-11-memorial': '9/11 Memorial Museum',
  'tenement-museum': 'Tenement Museum',
  'the-cloisters': 'The Met Cloisters',
  'brooklyn-museum': 'Brooklyn Museum',
  'ellis-island': 'Ellis Island',

  // Landmarks / cruises
  'statue-of-liberty': 'Statue of Liberty',

  // Parks / zoos / gardens
  'central-park-zoo': 'Central Park Zoo',
  'brooklyn-botanic-garden': 'Brooklyn Botanic Garden',

  // Entertainment
  'coney-island': 'Coney Island Luna Park',
  'madison-square-garden': 'Madison Square Garden Tour',

  // Sports (stadium tours)
  'yankee-stadium': 'Yankee Stadium Tour',
  'citi-field': 'Citi Field Tour',
  'barclays-center': 'Barclays Center Tour',

  // Food
  'chelsea-market': 'Chelsea Market food tour',
}

// Get an affiliate ticket link for an attraction by internal slug.
// Returns null if attraction is not ticketed (free landmarks, neighborhoods, etc).
export function getAttractionTiqetsLink(attractionId: string): string | null {
  const query = TIQETS_NYC_PRODUCTS[attractionId]
  if (!query) return null
  return getTiqetsSearchLink(query)
}

export function hasTiqetsIntegration(attractionId: string): boolean {
  return Boolean(TIQETS_NYC_PRODUCTS[attractionId])
}
