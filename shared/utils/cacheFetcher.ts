import { useCacheStore } from '~/stores/cache'

export async function cacheFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 60_000
): Promise<T> {
  const cache = useCacheStore()
  const entry = cache.get(key, ttl)
  if (entry) return entry as T

  const data = await fetcher()
  cache.set(key, data)
  return data
}
