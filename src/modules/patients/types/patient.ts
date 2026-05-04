// types/patient.ts

export type Gender = "male" | "female" | "other"

export interface Patient {
  _id: string
  name: string
  phone: string
  age?: number
  gender?: Gender
}

export interface IdentifyResponse {
  patient: Patient | null
  isNew: boolean
}

export interface PatientState {
  loading: boolean
  patient: Patient | null
  isNew: boolean | null
  error: string | null

  // 🔥 cache by phone
  cache: Record<string, IdentifyResponse>

  // create state
  creating: boolean
}