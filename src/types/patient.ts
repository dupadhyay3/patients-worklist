export type TSymptoms = "Headache" | "Cough" | "Fatigue" | "Chest Pain" | "Loss of Smell & Taste" | "Shortness in breathing"

export type TPatientId = number | string

export type TGender = "Male" | "Female" | "Other"

export type TVaccinationStatus =  "Fully vaccinated" | "Partially vaccinated" | "Not vaccinated"

export type TVaccineName = "Covishield" | "Covaxin" | ""

export type TSite = "Mumbai" | "Banglore"

export interface IPatient {
  id: TPatientId
  firstName: string
  middleName?: string
  lastName: string
  age: number
  gender: TGender
  phoneNo: number
  vaccinationStatus: TVaccinationStatus
  vaccineName: TVaccineName
  symptoms: Array<TSymptoms> | []
  anyMedicalHistory: string
  site: TSite
}

export type TPatients = [] | Array<IPatient> | null | undefined