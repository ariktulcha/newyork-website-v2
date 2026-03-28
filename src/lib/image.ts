export function optimizedImageUrl(url: string | undefined, width: number = 400): string {
  if (!url) return ''
  if (url.includes('images.unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}w=${width}&q=80&auto=format`
  }
  if (url.includes('supabase.co/storage/v1/object/public/')) {
    return url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') + `?width=${width}&quality=80`
  }
  return url
}
