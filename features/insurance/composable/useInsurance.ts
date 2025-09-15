import { ref } from 'vue'
import { InsuranceService } from '~/features/insurance/service/InsuranceService'
import type { InsuranceNumberDto, InsuranceLevelDto } from '~/entities/insurance/insurance.dto'

export function useInsurance() {
  const service = new InsuranceService()
  const insuranceNumber = ref<InsuranceNumberDto | null>(null)
  const insuranceLevel = ref<InsuranceLevelDto | null>(null)
  const isLoading = ref(false)
  const error = ref<unknown | null>(null)

  const fetch = async (patientId: string) => {
    if (!patientId) {
      error.value = new Error('Missing patientId')
      return
    }

    isLoading.value = true
    error.value = null
    try {
      insuranceNumber.value = await service.getInsuranceNumber({ patientId })
      insuranceLevel.value = await service.getInsuranceLevel({ patientId })
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  return { insuranceNumber, insuranceLevel, isLoading, error, fetch }
}
