import type { ClaimTypeModel, ClaimSubmissionModel } from '~/entities/claim/claim.model'
import type { ClaimSubmissionDto, ClaimTypeDto } from '~/entities/claim/claim.dto'
import { toClaimTypeModels, toClaimDto } from '~/entities/claim/claim.mapper'
import { cacheFetch } from '~/shared/utils/cacheFetcher'

export class ClaimService {
  private readonly typesEndpoint = '/api/claimTypes'
  private readonly submitEndpoint = '/api/claimSubmission'

  constructor(private readonly fetcher: typeof $fetch = $fetch) {}

  async typeList(opts?: { fallback?: ClaimTypeModel[] }): Promise<ClaimTypeModel[]> {
    try {
      return await cacheFetch(this.typesEndpoint, async () => {
        const data = await this.fetcher<ClaimTypeDto[]>(this.typesEndpoint)
        return toClaimTypeModels(data)
      })
    } catch (err: any) {
      const message = err?.data?.statusMessage || err?.message || 'Failed to load claim types'
      if (opts?.fallback) {
        console.warn('[ClaimService.typeList] using fallback:', message)
        return opts.fallback
      }
      throw new Error(message)
    }
  }

  async submit(model: ClaimSubmissionModel): Promise<any> {
    const dto: ClaimSubmissionDto = toClaimDto(model)
    try {
      return await this.fetcher(this.submitEndpoint, {
        method: 'POST',
        body: dto,
      })
    } catch (err: any) {
      const message = err?.data?.statusMessage || err?.message || 'Failed to submit claim'
      console.error('[ClaimService.submit] error', { dto, msg: message })
      throw new Error(message)
    }
  }  
}
