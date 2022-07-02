export type TSymptoms = "Headache" | "Cough" | "Fatigue" | "Chest Pain" | "Loss of Smell & Taste" | "Shortness in breathing"

export type TPatientId = number | string

export interface IPatient {
  id: TPatientId
  firstName: string
  middleName?: string
  lastName: string
  age: number
  gender: "Male" | "Female" | "Transgender" | "Other"
  phoneNo: number
  vaccinationStatus: "Fully vaccinated" | "Partially vaccinated" | "Not vaccinated"
  vaccineName: "Covishield" | "Covaxin" | null
  symptoms: Array<TSymptoms> | []
  anyMedicalHistory: string
  site: "Mumbai" | "Banglore"
}

export type TPatients = [] | Array<IPatient> | null | undefined