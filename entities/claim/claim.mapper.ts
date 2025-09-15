import type { ClaimTypeDto, ClaimSubmissionDto } from './claim.dto'
import type { ClaimTypeModel, ClaimSubmissionModel } from './claim.model'

export const toClaimTypeModel = (dto: ClaimTypeDto): ClaimTypeModel => ({
  code: dto.code,
  description: dto.description,
})

export const toClaimDto = (model: ClaimSubmissionModel): ClaimSubmissionDto => ({
  fall_id: model.fallId,
  insurance_number: model.insuranceNumber,
  claim_type: model.claimType,
})

export const toClaimTypeModels = (payload: unknown): ClaimTypeModel[] => {
  const list = unwrapToArray(payload)
  return list.map(toClaimTypeModel)
}

function unwrapToArray(payload: unknown): ClaimTypeDto[] {
  if (Array.isArray(payload)) return payload as ClaimTypeDto[]

  if (payload && typeof payload === 'object') {
    const obj = payload as any

    if (typeof obj.error === 'string' && obj.error) {
      throw new Error(obj.error)
    }

    const arr = obj.types ?? obj.data ?? obj.claim_types ?? obj.items
    if (Array.isArray(arr)) return arr as ClaimTypeDto[]
  }

  throw new Error('Invalid claim types payload')
}
