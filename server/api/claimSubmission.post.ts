import { defineEventHandler, createError, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { ClaimSubmissionDto } from '~/entities/claim/claim.dto'

export default defineEventHandler(async (event) => {
  const body = await readBody<ClaimSubmissionDto>(event)

  if (!body?.fall_id || !body?.insurance_number || !body?.claim_type) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: fall_id, insurance_number, claim_type',
    })
  }

  const cfg = useRuntimeConfig()
  if (!cfg.public.bestInsuranceBase || !cfg.bestInsuranceToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing env config: bestInsuranceBase or bestInsuranceToken',
    })
  }

  const url = `${cfg.public.bestInsuranceBase}/claims`

  try {
    return await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cfg.bestInsuranceToken}`,
      },
      body,
    })
  } catch (err: any) {
    const status = err?.response?.status || 500
    const message =
      err?.response?._data?.error ||
      err?.message ||
      'ClaimSubmission upstream error'

    console.error('[claimSubmission.post] upstream error', {
      url,
      body,
      status,
      data: err?.response?._data,
      msg: err?.message,
    })

    throw createError({
      statusCode: status,
      statusMessage: message,
    })
  }
})
