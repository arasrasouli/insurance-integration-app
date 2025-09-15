import { defineEventHandler, getQuery, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { InsuranceNumberDto } from '~/entities/insurance/insurance.dto'
import type { InsuranceQuery } from '@/shared/api/insurance.types'

const TIMEOUT_MS = 7000

function tryExtractNumber(text: string): string | null {
  const m = text.match(/"insurance-number"\s*:\s*"([^"]+)"/)
  return m?.[1] ?? null
}

export default defineEventHandler(async (event) => {
  const { patientId } = getQuery(event) as InsuranceQuery
  if (!patientId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required query param: patientId' })
  }

  const cfg = useRuntimeConfig()
  if (!cfg.public.bestInsuranceBase || !cfg.bestInsuranceToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing env config: insuranceBase or insuranceToken',
    })
  }

  const url = `${cfg.public.bestInsuranceBase}/patients/${patientId}/insurance-number`

  try {
    const res = await $fetch.raw(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cfg.bestInsuranceToken}`,
      },
      timeout: TIMEOUT_MS,
    })

    let data: unknown = res._data
    const contentType = res.headers.get('content-type') || ''

    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch {
        const num = tryExtractNumber(data)
        if (num) {
          data = { 'insurance-number': num }
        }
      }
    }

    if (!data || typeof data !== 'object' || !('insurance-number' in (data as Record<string, unknown>))) {
      console.error('[insuranceNumber.get] invalid payload', { url, contentType, data })
      throw createError({
        statusCode: 502,
        statusMessage: 'Invalid insurance-number payload from upstream',
      })
    }

    return data as InsuranceNumberDto
  } catch (err: any) {
    console.error('[insuranceNumber.get] upstream error', {
      url,
      patientId,
      status: err?.response?.status,
      data: err?.response?._data,
      msg: err?.message,
    })
    throw createError({
      statusCode: err?.response?.status || 500,
      statusMessage: 'InsuranceNumber upstream error',
    })
  }
})
