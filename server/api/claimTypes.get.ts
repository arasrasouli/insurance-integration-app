import { defineEventHandler, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { ClaimTypeDto } from '~/entities/claim/claim.dto'
import { fetchWithRetry } from '~/shared/utils/fetchWithRetry'

interface ClaimTypesResponse {
  claim_types: ClaimTypeDto[]
}

export default defineEventHandler(async () => {
  const cfg = useRuntimeConfig()
  if (!cfg.public.bestInsuranceBase || !cfg.bestInsuranceToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing env config: bestInsuranceBase or bestInsuranceToken',
    })
  }

  const url = `${cfg.public.bestInsuranceBase}/claim-types`

  try {
    const response = await fetchWithRetry<ClaimTypesResponse>(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cfg.bestInsuranceToken}`,
      },
      timeout: 10000,
    })

    if (!Array.isArray(response.claim_types)) {
      throw new Error('Claim types response is not an array')
    }

    return response.claim_types
  } catch (err: any) {

    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'ClaimTypes upstream error',
    })
  }
})
