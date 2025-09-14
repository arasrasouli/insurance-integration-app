export interface FallDto {
  id: number
  fall_at: string
  fall_type: string
  resolved_at: string | null
  reaction_time: number
  lay_time: number
  reviewed_at: string | null
  patient_name: string
  thumbnail_url: string | null
  video_url: string | null
  room_no: number
  patient_id: string
  bed_id: number
  has_report: boolean
  was_annotated: boolean
  was_patient_alone: boolean | null
  reason: string
  updated_at: string
  fall_detection: string
}
