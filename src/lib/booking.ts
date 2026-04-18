// Booking.com Affiliate Integration for WeNewYorker
// Affiliate ID: 2162759 — label scoped per destination

export const BOOKING_AID = '2162759'
export const BOOKING_LABEL = 'wenewyorker'
export const BOOKING_BASE_URL = 'https://www.booking.com'

// Generate affiliate link for a specific hotel in the US
export function getBookingLink(hotelSlug: string, checkIn?: string, checkOut?: string): string {
  const params = new URLSearchParams({
    aid: BOOKING_AID,
    label: BOOKING_LABEL,
  })

  if (checkIn) params.set('checkin', checkIn)
  if (checkOut) params.set('checkout', checkOut)

  return `${BOOKING_BASE_URL}/hotel/us/${hotelSlug}.html?${params.toString()}`
}

// Generic search link for New York City hotels
export function getBookingSearchLink(options?: {
  checkIn?: string
  checkOut?: string
  adults?: number
  rooms?: number
  stars?: number[]
  city?: string
}): string {
  const params = new URLSearchParams({
    aid: BOOKING_AID,
    label: BOOKING_LABEL,
    ss: options?.city || 'New York, New York, United States',
    dest_type: 'city',
  })

  if (options?.checkIn) params.set('checkin', options.checkIn)
  if (options?.checkOut) params.set('checkout', options.checkOut)
  if (options?.adults) params.set('group_adults', options.adults.toString())
  if (options?.rooms) params.set('no_rooms', options.rooms.toString())
  if (options?.stars) params.set('nflt', options.stars.map(s => `class%3D${s}`).join('%3B'))

  return `${BOOKING_BASE_URL}/searchresults.html?${params.toString()}`
}

// Known NYC hotels on Booking.com (slug mapping)
// Add entries as needed — the Supabase `hotels` table slug should match the key.
export const BOOKING_HOTELS: Record<string, string> = {
  'the-plaza': 'the-plaza',
  'the-pierre': 'the-pierre-a-taj',
  'st-regis-new-york': 'the-st-regis-new-york',
  'mandarin-oriental-new-york': 'mandarin-oriental-new-york',
  'four-seasons-new-york-downtown': 'four-seasons-new-york-downtown',
  'ritz-carlton-central-park': 'ritz-carlton-new-york-central-park',
  'the-peninsula-new-york': 'the-peninsula-new-york',
  'baccarat-hotel': 'baccarat-hotel-and-residences-new-york',
  'park-hyatt-new-york': 'park-hyatt-new-york',
  '1-hotel-central-park': '1-hotel-central-park',
  '1-hotel-brooklyn-bridge': '1-hotel-brooklyn-bridge',
  'ace-hotel-brooklyn': 'ace-hotel-brooklyn',
  'arlo-williamsburg': 'arlo-williamsburg',
  'william-vale': 'the-william-vale',
  'wythe-hotel': 'wythe-hotel',
  'hoxton-williamsburg': 'the-hoxton-williamsburg',
  'moxy-times-square': 'moxy-nyc-times-square',
  'moxy-downtown': 'moxy-nyc-downtown',
  'pod-39': 'pod-39',
  'pod-51': 'pod-51',
  'citizenm-times-square': 'citizenm-new-york-times-square',
  'standard-high-line': 'the-standard-high-line',
  'bowery-hotel': 'the-bowery-hotel',
  'greenwich-hotel': 'the-greenwich-hotel',
  'nomad-hotel': 'the-nomad-hotel',
  'public-hotel': 'public-hotel',
  'soho-grand': 'soho-grand',
  'ludlow-hotel': 'the-ludlow-hotel',
}

// Get Booking link for a known hotel by its internal slug/ID
export function getHotelBookingLink(hotelId: string, checkIn?: string, checkOut?: string): string | null {
  const slug = BOOKING_HOTELS[hotelId]
  if (!slug) return null
  return getBookingLink(slug, checkIn, checkOut)
}

// Check if a hotel has a direct Booking mapping
export function hasBookingMapping(hotelId: string): boolean {
  return Boolean(BOOKING_HOTELS[hotelId])
}

// Ensure any booking.com URL carries the affiliate ID + label.
// Accepts all Booking URL variants: /hotel/us/X.html, /Share-XXXX, /searchresults.html, bare domain.
// If the URL is not a booking.com URL or is falsy, returns a search fallback.
export function ensureBookingAffiliate(url: string | null | undefined, fallbackName?: string): string {
  if (!url || !url.includes('booking.com')) {
    return getBookingSearchLink({ city: fallbackName ? `${fallbackName} New York` : undefined })
  }
  try {
    const u = new URL(url)
    u.searchParams.set('aid', BOOKING_AID)
    if (!u.searchParams.get('label')) {
      u.searchParams.set('label', BOOKING_LABEL)
    }
    return u.toString()
  } catch {
    return getBookingSearchLink({ city: fallbackName ? `${fallbackName} New York` : undefined })
  }
}
