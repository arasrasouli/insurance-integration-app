import type { InsuranceNumberDto, InsuranceLevelDto } from './insurance.dto'
import type { PatientInsuranceModel } from './insurance.model'

export const toPatientInsuranceModel = (levelDto: InsuranceLevelDto, numberDto: InsuranceNumberDto): PatientInsuranceModel => ({
  insuranceNumber: numberDto['insurance-number'],
  insuranceLevel: levelDto['insurance-level'],
  description: levelDto.description,
})
