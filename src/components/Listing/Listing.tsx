import { FC } from 'react'
import { TPatients, IPatient, TPatientId } from 'types/patient'
import s from './Listing.module.scss'

interface IPatientCard {
  patient: IPatient
  removePatient: (id: TPatientId) => void
}
interface IListing {
  patients: TPatients
  removePatient: (id: TPatientId) => void
}

const Listing: FC<IListing> = ({ patients, removePatient }) => {
  const PatientCard: FC<IPatientCard> = ({ patient, removePatient }) => {
    return (
      <div key={patient.id} className={'block m-5'}>
        <div>{patient.firstName}</div>
        <div>{patient.middleName}</div>
        <div>{patient.lastName}</div>
        <div>{patient.age}</div>
        <div>{patient.gender}</div>
        <div>{patient.phoneNo}</div>
        <div>{patient.vaccinationStatus}</div>
        <div>{patient.vaccineName}</div>
        <div>{patient.symptoms.join(', ')}</div>
        <div>{patient.site}</div>
        <div>{patient.anyMedicalHistory}</div>
        <div onClick={() => removePatient(patient.id)}>Delete</div>
      </div>
    )
  }

  return (
    <div className={s.listingWrapper}>
      {patients?.map((patient, index) => (
        <PatientCard
          key={`PatientCard-${index}`}
          patient={patient}
          removePatient={removePatient}
        />
      ))}
    </div>
  )
}

export default Listing
