import { defineEventHandler, getQuery, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import { isIso } from '~/shared/lib/dateHelper'
import type { FallListQuery } from '@/shared/api/falls.types'


export default defineEventHandler(async (event) => {
  const { startDate, endDate } = getQuery(event) as FallListQuery
  if (!isIso(startDate) || !isIso(endDate)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid or missing startDate/endDate (ISO 8601 expected)' })
  }

  const cfg = useRuntimeConfig()
  if (!cfg.public.tetonBase || !cfg.tetonToken || !cfg.public.tetonDepartmentId || !cfg.public.tetonApiVersion) {
    throw createError({ statusCode: 500, statusMessage: 'Missing env config' })
  }

  const url = `${cfg.public.tetonBase}/departments/${cfg.public.tetonDepartmentId}/falls`

  try {
    return await $fetch(url, {
      headers: {
        Authorization: `Bearer ${cfg.tetonToken}`,
        'x-teton-api-version': String(cfg.public.tetonApiVersion),
      },
      query: { startDate, endDate },
    })
  } catch (err: any) {
    console.error('[falls.get] upstream error', {
      url,
      startDate,
      endDate,
      status: err?.response?.status,
      data: err?.response?._data,
      msg: err?.message,
    })
    throw createError({ statusCode: err?.response?.status || 500, statusMessage: 'Falls upstream error' })
  }
})
