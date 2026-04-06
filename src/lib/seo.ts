/**
 * SEO utilities shared across all pages.
 */

const MIN_DESC_LENGTH = 80

/**
 * Picks the best meta description from available fields.
 * Priority: meta_description > description > excerpt > fallback.
 * Ensures minimum length for SEO value.
 */
export function pickMetaDescription(
  item: {
    meta_description?: string | null
    description?: string | null
    excerpt?: string | null
    name_he?: string | null
  },
  fallbackSuffix: string
): string {
  const candidates = [
    item.meta_description,
    item.description,
    item.excerpt,
  ]

  for (const candidate of candidates) {
    if (candidate && candidate.length >= MIN_DESC_LENGTH) {
      // Trim to ~155 chars for meta description
      return candidate.length > 155 ? candidate.substring(0, 152) + '...' : candidate
    }
  }

  // If all are short, use the longest one we have
  const longest = candidates
    .filter((c): c is string => !!c && c.length > 0)
    .sort((a, b) => b.length - a.length)[0]

  if (longest && longest.length >= 30) {
    return longest
  }

  // Absolute fallback
  return `${item.name_he || ''} — ${fallbackSuffix}`
}
