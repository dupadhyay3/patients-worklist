import { FC, useEffect } from 'react'
import { TPatients, IPatient, TPatientId, IPatientData } from 'types/patient'
import s from './Listing.module.scss'
import cn from 'classnames'
import { TPopup } from 'types/popup'

interface IPatientCard {
  patient: IPatient
  removePatient: (id: TPatientId) => void
  cardDropdwnOpenId: number
  setCardDropdwnOpenId: any
  setOnPopupClose: any
  setPopupType: (popupType: TPopup) => void
  setPatient: (patient?: IPatientData | IPatient | any) => void
}
interface IListing {
  patients: TPatients
  removePatient: (id: TPatientId) => void
  cardDropdwnOpenId: number
  setCardDropdwnOpenId: any
  setOnPopupClose: any
  setPopupType: (popupType: TPopup) => void
  setPatient: (patient?: IPatientData | IPatient | any) => void
}

const Listing: FC<IListing> = ({
  patients,
  removePatient,
  cardDropdwnOpenId,
  setCardDropdwnOpenId,
  setOnPopupClose,
  setPopupType,
  setPatient,
}) => {
  useEffect(() => {
    return () => {
      setPatient({
        firstName: '',
        middleName: '',
        lastName: '',
        age: '',
        gender: '',
        phoneNo: '',
        vaccinationStatus: '',
        vaccineName: '',
        symptoms: [],
        anyMedicalHistory: '',
        site: '',
      })
    }
  }, [])

  const PatientCard: FC<IPatientCard> = ({
    patient,
    removePatient,
    cardDropdwnOpenId,
    setCardDropdwnOpenId,
    setOnPopupClose,
    setPopupType,
    setPatient,
  }) => {
    return (
      <div key={patient.id} className={s.cardWrapper}>
        <div className={s.menu}>
          <button
            id='dropdownButton'
            data-dropdown-toggle='dropdown'
            className={s.btn}
            type='button'
            onClick={() =>
              setCardDropdwnOpenId(cardDropdwnOpenId == patient.id ? 0 : patient.id)
            }
          >
            <svg
              className='w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
            </svg>
          </button>
          <div
            id={`dropdown-${patient.id}`}
            className={cn(
              s.dropdownList,
              cardDropdwnOpenId != patient.id && 'hidden'
            )}
          >
            <ul className='py-1' aria-labelledby='dropdownButton'>
              <li>
                <span
                  onClick={() => {
                    setOnPopupClose(true)
                    setPopupType('view')
                    setPatient(patient)
                  }}
                >
                  👁 View
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    setOnPopupClose(true)
                    setPopupType('edit')
                    setPatient(patient)
                  }}
                >
                  ✎ Edit
                </span>
              </li>
              <li>
                <span
                  onClick={() => removePatient(patient.id)}
                  className={'!text-red-600'}
                >
                  ⓧ Delete
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className={s.cardBody}>
          <h5 className={s.name}>
            {patient.firstName} {patient.middleName} {patient.lastName}
          </h5>
          <span className={s.field}>Gender : {patient.gender}</span>
          <span className={s.field}>Age : {patient.age}</span>
          <span className={s.field}>Phone No : {patient.phoneNo}</span>
          <span className={s.field}>Site : {patient.site}</span>
          <span className={s.field}>
            Vaccination Status : {patient.vaccinationStatus}
          </span>
          <span className={s.field}>
            {patient.vaccineName && `Vaccination Name : ${patient.vaccineName}`}
            &nbsp;
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={s.listingWrapper}>
      {patients.length > 0 ? (
        patients?.map((patient, index) => (
          <PatientCard
            key={`PatientCard-${index}`}
            patient={patient}
            removePatient={removePatient}
            cardDropdwnOpenId={cardDropdwnOpenId}
            setCardDropdwnOpenId={setCardDropdwnOpenId}
            setOnPopupClose={setOnPopupClose}
            setPopupType={setPopupType}
            setPatient={setPatient}
          />
        ))
      ) : (
        <div className={s.emptyArea}>
          <img src='empty-img.png' alt='empty image' />
        </div>
      )}
    </div>
  )
}

export default Listing
