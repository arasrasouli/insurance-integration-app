import { createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { ApiResponse, ApiConfig, FetchOptions } from '~/shared/api/api.types'

export async function fetchGetApi<TData, TQuery extends Record<string, any>>({
  event,
  endpoint,
  querySchema,
  query = {} as TQuery,
  additionalHeaders = {},
}: FetchOptions<TData, TQuery>): Promise<ApiResponse<TData>> {
  if (querySchema) {
    const queryResult = querySchema.safeParse(query)
    if (!queryResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid query parameters',
        data: z.treeifyError(queryResult.error),
      })
    }
    query = queryResult.data
  }

  const cfg = useRuntimeConfig()
  const requiredConfig: (keyof ApiConfig)[] = ['hospitalBase', 'hospitalToken', 'hospitalDepartmentId', 'apiVersion']
  if (!requiredConfig.every(key => cfg.public[key] || cfg[key])) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error',
      data: { missing: requiredConfig.filter(key => !cfg.public[key] && !cfg[key]) },
    })
  }

  const url = `${cfg.public.hospitalBase}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  try {
    const response = await $fetch<TData>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cfg.hospitalToken}`,
        'x-api-version': String(cfg.public.apiVersion),
        ...additionalHeaders,
      },
      query,
    })

    return { data: response as TData }
  } catch (err: any) {
    const errorDetails = {
      url,
      query,
      status: err?.response?.status,
      data: err?.response?._data,
      message: err?.message,
      stack: process.env.NODE_ENV !== 'production' ? err?.stack : undefined,
    }
    console.error(`[api.get] Upstream API error for ${endpoint}`, errorDetails)

    throw createError({
      statusCode: err?.response?.status || 500,
      statusMessage: `Failed to fetch data from ${endpoint}`,
      data: {
        message: 'Upstream API error',
        details: errorDetails,
      },
    })
  }
}