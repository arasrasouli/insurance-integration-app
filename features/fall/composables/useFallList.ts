import { ref, computed } from 'vue'
import type { FallModel } from '~/entities/fall/fall.model'
import { FallListService } from '~/features/fall/service/FallListService'
import { isIso } from '~/shared/lib/dateHelper'

export function useFallList() {
  const service = new FallListService()
  const falls = ref<FallModel[]>([])
  const isLoading = ref(false)
  const error = ref<unknown | null>(null)

  const fetch = async (startDate: string, endDate: string) => {
    if (!isIso(startDate) || !isIso(endDate)) {
      error.value = new Error('Invalid date range')
      return
    }
    isLoading.value = true
    error.value = null
    try {
      falls.value = await service.list({ startDate, endDate })
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  const roomOptions = computed(() => {
    const set = new Set<string>()
    for (const f of falls.value) {
      const v = f?.roomNo != null ? String(f.roomNo) : ''
      if (v) set.add(v)
    }
    return Array.from(set).sort().map(v => ({ label: v, value: v }))
  })

  const typeOptions = computed(() => {
    const set = new Set<string>()
    for (const f of falls.value) {
      const v = f?.fallType ?? ''
      if (v) set.add(v)
    }
    return Array.from(set).sort().map(v => ({ label: v, value: v }))
  })

  return { falls, isLoading, error, fetch, roomOptions, typeOptions }
}
