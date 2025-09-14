// features/fall/composables/useFallList.ts
import { ref } from 'vue'
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

  return { falls, isLoading, error, fetch }
}
