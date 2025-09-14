import type { FallDto } from './fall.dto'
import type { FallModel } from './fall.model'
import { parseFallType, parseFallDetection, parseWasPatientAlone } from './fall.validation'
import { toDate } from '~/shared/lib/dateHelper'

export const toFallModel = (dto: FallDto): FallModel => ({
  id: dto.id,
  fallAt: new Date(dto.fall_at),
  fallType: parseFallType(dto.fall_type),
  resolvedAt: toDate(dto.resolved_at),
  reactionTime: dto.reaction_time,
  layTime: dto.lay_time,
  reviewedAt: toDate(dto.reviewed_at),
  patientName: dto.patient_name,
  thumbnailUrl: dto.thumbnail_url,
  videoUrl: dto.video_url,
  roomNo: dto.room_no,
  patientId: dto.patient_id,
  bedId: dto.bed_id,
  hasReport: dto.has_report,
  wasAnnotated: dto.was_annotated,
  wasPatientAlone: parseWasPatientAlone(dto.was_patient_alone),
  reason: dto.reason,
  updatedAt: new Date(dto.updated_at),
  fallDetection: parseFallDetection(dto.fall_detection),
})

export const toFallModels = (list: FallDto[]): FallModel[] => list.map(toFallModel)
