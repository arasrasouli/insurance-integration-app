import { FallType, FallDetection, WasPatientAlone } from './fall.types'

export const parseFallType = (v: string): FallType =>
  Object.values(FallType).includes(v as FallType) ? (v as FallType) : FallType.Unknown

export const parseFallDetection = (v: string): FallDetection =>
  Object.values(FallDetection).includes(v as FallDetection) ? (v as FallDetection) : FallDetection.Unknown

export const parseWasPatientAlone = (v: boolean | null): WasPatientAlone =>
  v === true ? WasPatientAlone.Yes : v === false ? WasPatientAlone.No : WasPatientAlone.Unknown
