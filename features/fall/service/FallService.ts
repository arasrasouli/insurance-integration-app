import type { FallDto } from '~/entities/fall/fall.dto'
import type { FallModel } from '~/entities/fall/fall.model'
import { toFallModels } from '~/entities/fall/fall.mapper'
import type { FallListQuery } from '~/shared/api/fall.types'
import type { ApiResponse, FetchLike } from '~/shared/api/api.types'
import { type EndpointBuilder, DefaultEndpointBuilder } from '~/shared/api/apiEndpointBuilder'

export class FallService {
  constructor(
    private readonly fetcher: FetchLike = $fetch,
    private readonly endpointBuilder: EndpointBuilder = new DefaultEndpointBuilder('fall')
  ) {}

  async list(params: FallListQuery): Promise<FallModel[]> {
    const endpoint = this.endpointBuilder.buildEndpoint('list')
    const response: ApiResponse<FallDto[]> = await this.fetcher<ApiResponse<FallDto[]>>(endpoint, { params })
    return toFallModels(response.data as FallDto[])
  }
}
