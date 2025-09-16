import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ClaimService } from '~/features/claim/service/ClaimService'
import type { ClaimTypeDto } from '~/entities/claim/claim.dto'
import type { ClaimTypeModel } from '~/entities/claim/claim.model'
import { clearCache } from '~/shared/utils/cacheFetcher'

beforeEach(() => {
  clearCache()
})

vi.mock('~/shared/utils/cacheFetch', () => ({
  cacheFetch: vi.fn((key, fetcher) => fetcher()),
}))

vi.mock('~/entities/claim/claim.mapper', () => ({
  toClaimTypeModels: (dtos: ClaimTypeDto[]) =>
    dtos.map(dto => ({ code: dto.code, description: dto.description })),
}))

describe('ClaimService.typeList', () => {
  let service: ClaimService
  let mockFetch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockFetch = vi.fn()
    service = new ClaimService(mockFetch as any)
  })

  it('should return mapped claim types on success', async () => {
    const dtos: ClaimTypeDto[] = [
      { code: 'FALL_INJURY', description: 'Fall Injury' },
      { code: 'NOT_FALL', description: 'Not Fall' },
    ]
    mockFetch.mockResolvedValueOnce(dtos)

    const result = await service.typeList()

    expect(result).toEqual([
      { code: 'FALL_INJURY', description: 'Fall Injury' },
      { code: 'NOT_FALL', description: 'Not Fall' },
    ])
    expect(mockFetch).toHaveBeenCalledWith('/api/claimTypes')
  })

  it('should return fallback if fetch fails and fallback is provided', async () => {
    mockFetch.mockRejectedValueOnce(new Error('upstream error'))

    const fallback: ClaimTypeModel[] = [
      { code: 'TEST', description: 'Test description' },
    ]

    const result = await service.typeList({ fallback })

    expect(result).toEqual(fallback)
    expect(mockFetch).toHaveBeenCalled()    
  })

  it('should throw if fetch fails and no fallback provided', async () => {
    mockFetch.mockRejectedValueOnce(new Error('upstream error'))

    await expect(service.typeList()).rejects.toThrow('upstream error')
  })  
})
