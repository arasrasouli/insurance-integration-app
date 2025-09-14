export const toDate = (s: string | null): Date | null => (s ? new Date(s) : null)

export const isIso = (s?: string) => typeof s === 'string' && !Number.isNaN(Date.parse(s))

export const formatShortDateTime = (d: Date | null, locale = 'en-GB'): string => {
  if (!d) return ''
  const date = new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
  const time = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: false }).format(d)
  return `${date} ${time}`
}