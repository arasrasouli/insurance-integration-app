import type { InsuranceNumberDto, InsuranceLevelDto } from '~/entities/insurance/insurance.dto'
import type { PatientInsuranceModel } from '~/entities/insurance/insurance.model'
import { toPatientInsuranceModel } from '~/entities/insurance/insurance.mapper'

type FetchLike = <T>(url: string, opts?: { params?: Record<string, any> }) => Promise<T>

export class InsuranceService {
  constructor(
    private readonly base: string = '/api',
    private readonly fetcher: FetchLike = $fetch
  ) {}

  async getPatientInsurance(patientId: string): Promise<PatientInsuranceModel> {
    const [numberDto, levelDto] = await Promise.all([
      this.fetcher<InsuranceNumberDto>(`${this.base}/insuranceNumber`, { params: { patientId } }),
      this.fetcher<InsuranceLevelDto>(`${this.base}/insuranceLevel`, { params: { patientId } }),
    ])

    return toPatientInsuranceModel(levelDto, numberDto)
  }
}
