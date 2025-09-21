import { H3Event } from 'h3'
import { z } from 'zod'

export interface ApiResponse<T> {
  data?: T
  error?: {
    statusCode: number
    statusMessage: string
    data?: T
  }
}

export interface ApiConfig {
  hospitalBase: string
  hospitalToken: string
  hospitalDepartmentId: string
  apiVersion: string | number
}

export interface FetchOptions<TData, TQuery extends Record<string, any>> {
  event: H3Event
  endpoint: string
  querySchema?: z.ZodSchema<TQuery>
  query?: TQuery
  additionalHeaders?: Record<string, string>
}

export type FetchLike = <T>(url: string, opts?: { params?: Record<string, any> }) => Promise<T>
