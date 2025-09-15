export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit & { timeout?: number } = {},
  retries = 3,
  backoff = 500
): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), options.timeout ?? 10000)

  try {
    const res = await fetch(url, { ...options, signal: controller.signal })

    if (!res.ok) {
      if (res.status >= 500 && retries > 0) {
        await new Promise((r) => setTimeout(r, backoff))
        return fetchWithRetry<T>(url, options, retries - 1, backoff * 2)
      }
      throw new Error(`HTTP ${res.status}: ${await res.text()}`)
    }

    return (await res.json()) as T
  } finally {
    clearTimeout(timeout)
  }
}
