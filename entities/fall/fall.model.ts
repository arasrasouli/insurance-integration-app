import type { FallType, FallDetection, WasPatientAlone } from './fall.types'

export interface FallModel {
  id: number
  fallAt: Date
  fallType: FallType
  resolvedAt: Date | null
  reactionTime: number
  layTime: number
  reviewedAt: Date | null
  patientName: string
  thumbnailUrl: string | null
  videoUrl: string | null
  roomNo: number
  patientId: string
  bedId: number
  hasReport: boolean
  wasAnnotated: boolean
  wasPatientAlone: WasPatientAlone
  reason: string
  updatedAt: Date
  fallDetection: FallDetection
}
