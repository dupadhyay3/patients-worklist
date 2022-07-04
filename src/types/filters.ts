import { TGender, TVaccinationStatus, TVaccineName, TSite, TSymptoms } from './patient'

export interface IFilters {
  gender: TGender | ''
  vaccinationStatus: TVaccinationStatus | ''
  vaccineName: TVaccineName | ''
  site: TSite | ''
  symptoms: Array<TSymptoms> | []
}
