import { defineEventHandler, getQuery, H3Event } from 'h3'
import { isIso } from '~/shared/lib/dateHelper'
import type { FallDto } from '~/entities/fall/fall.dto'
import type { ApiResponse } from '~/shared/api/api.types'
import type { FallListQuery } from '~/shared/api/fall.types'
import { z } from 'zod'
import { fetchGetApi } from '~/server/utils/api'
import { useRuntimeConfig } from '#imports'

const querySchema = z.object({
  startDate: z.string().refine(isIso, { message: 'Invalid startDate format (ISO 8601 expected)' }),
  endDate: z.string().refine(isIso, { message: 'Invalid endDate format (ISO 8601 expected)' }),
})

export default defineEventHandler(async (event: H3Event): Promise<ApiResponse<FallDto[]>> => {
  const cfg = useRuntimeConfig()

  const query = getQuery(event) as FallListQuery
  const response = await fetchGetApi<FallDto[], FallListQuery>({
    event,
    endpoint: `/departments/${cfg.public.hospitalDepartmentId}/falls`,
    querySchema,
    query,
  })
  return response
})