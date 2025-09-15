import { ref } from 'vue'
import type { ClaimTypeModel, ClaimSubmissionModel } from '~/entities/claim/claim.model'
import { ClaimService } from '~/features/claim/service/ClaimService'

export function useClaim() {
  const service = new ClaimService()

  const claimTypes = ref<ClaimTypeModel[]>([])
  const isLoading = ref(false)
  const error = ref<unknown | null>(null)

  const fetchTypes = async () => {
    isLoading.value = true
    error.value = null
    try {
      claimTypes.value = await service.typeList()
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  const isSubmitting = ref(false)
  const submitError = ref<unknown | null>(null)
  const submitResult = ref<any>(null)

  const submitClaim = async (model: ClaimSubmissionModel) => {
    isSubmitting.value = true
    submitError.value = null
    submitResult.value = null
    try {
      submitResult.value = await service.submit(model)
      return submitResult.value
    } catch (e) {
      submitError.value = e
      throw e
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    claimTypes,
    isLoading,
    error,
    fetchTypes,
    isSubmitting,
    submitError,
    submitResult,
    submitClaim,
  }
}
