import { useCacheStore } from '~/stores/cache'

export async function cacheFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 3_60_000
): Promise<T> {
  const cache = useCacheStore()
  const entry = cache.get(key, ttl)
  if (entry) return entry as T

  try {
    const result = await fetcher()
    cache.set(key, result)
    return result
  } catch (err) {
    throw err
  }
}



export function clearCache() {
  const cache = useCacheStore()
  cache.clear()
}