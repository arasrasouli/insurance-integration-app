import { defineStore } from 'pinia'

interface CacheEntry<T = any> {
  data: T
  fetchedAt: number
}

export const useCacheStore = defineStore('cache', {
  state: () => ({
    store: {} as Record<string, CacheEntry>,
  }),

  actions: {
    set<T>(key: string, data: T) {
      this.store[key] = {
        data,
        fetchedAt: Date.now(),
      }
    },

    get<T>(key: string, ttlMs?: number): T | null {
      const entry = this.store[key]
      if (!entry) return null
      if (ttlMs && Date.now() - entry.fetchedAt > ttlMs) {
        return null
      }
      return entry.data as T
    },

    clear(key?: string) {
      if (key) {
        delete this.store[key]
      } else {
        this.store = {}
      }
    },
  },
})
