// features/fall/service/FallListService.ts
import type { FallDto } from '~/entities/fall/fall.dto'
import type { FallModel } from '~/entities/fall/fall.model'
import { toFallModels } from '~/entities/fall/fall.mapper'
import type { FallListQuery } from '~/shared/api/falls.types'

type FetchLike = <T>(url: string, opts?: { params?: Record<string, any> }) => Promise<T>

export class FallListService {
  constructor(
    private readonly endpoint: string = '/api/falls',
    private readonly fetcher: FetchLike = $fetch
  ) {}

  async list(params: FallListQuery): Promise<FallModel[]> {
    const data = await this.fetcher<FallDto[]>(this.endpoint, { params })
    return toFallModels(data)
  }
}
