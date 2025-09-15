import { defineEventHandler, getQuery, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import { InsuranceLevelDto } from '~/entities/insurance/insurance.dto'
import type { InsuranceQuery } from '@/shared/api/insurance.types'

export default defineEventHandler(async (event) => {
  const { patientId } = getQuery(event) as InsuranceQuery
  if (!patientId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required query param: patientId' })
  }

  const cfg = useRuntimeConfig()
  if (!cfg.public.bestInsuranceBase || !cfg.bestInsuranceToken) {
    throw createError({ statusCode: 500, statusMessage: 'Missing env config: insuranceBase or insuranceToken' })
  }

  const url = `${cfg.public.bestInsuranceBase}/patients/${patientId}/insurance-level`

  try {
    return await $fetch<InsuranceLevelDto>(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cfg.bestInsuranceToken}`,
      },
    })
  } catch (err: any) {
    console.error('[insuranceLevel.get] upstream error', {
      url,
      patientId,
      status: err?.response?.status,
      data: err?.response?._data,
      msg: err?.message,
    })
    throw createError({
      statusCode: err?.response?.status || 500,
      statusMessage: 'InsuranceLevel upstream error',
    })
  }
})

