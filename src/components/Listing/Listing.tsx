import { FC } from 'react'
import { TPatients, IPatient, TPatientId } from 'types/patient'
import s from './Listing.module.scss'
import cn from 'classnames'

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
      // <div key={patient.id} className={'block m-5'}>
      //   <div>{patient.firstName}</div>
      //   <div>{patient.middleName}</div>
      //   <div>{patient.lastName}</div>
      //   <div>{patient.age}</div>
      //   <div>{patient.gender}</div>
      //   <div>{patient.phoneNo}</div>
      //   <div>{patient.vaccinationStatus}</div>
      //   <div>{patient.vaccineName}</div>
      //   <div>{patient.symptoms.join(', ')}</div>
      //   <div>{patient.site}</div>
      //   <div>{patient.anyMedicalHistory}</div>
      //   <div onClick={() => removePatient(patient.id)}>Delete</div>
      // </div>
      <div
        key={patient.id}
        className='m-2 inline-block w-80 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'
      >
        <div className='flex justify-end px-4 pt-4'>
          <button
            id='dropdownButton'
            data-dropdown-toggle='dropdown'
            className='hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5'
            type='button'
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
            id='dropdown'
            className='hidden z-10 w-10 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700'
          >
            <ul className='py-1' aria-labelledby='dropdownButton'>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                >
                  ✎
                </a>
              </li>
              <li>
                <a
                  onClick={() => removePatient(patient.id)}
                  href='#'
                  className='block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                >
                  ⓧ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col items-center pb-10'>
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
            {patient.firstName} {patient.middleName} {patient.lastName}
          </h5>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Gender : {patient.gender}
          </span>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Age : {patient.age}
          </span>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Phone No : {patient.phoneNo}
          </span>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Vaccination Status : {patient.vaccinationStatus}
          </span>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Vaccination Name : {patient.vaccineName}
          </span>
          {/* <div className='flex mt-4 space-x-3 lg:mt-6'>
              <a href='#' className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add friend</a>
              <a href='#' className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'>Message</a>
          </div> */}
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
          />
        ))
      ) : (
        <div className={cn(s.emptyArea, 'inline-flex w-3/6')}>
          <img src='empty-img.png' alt='empty image' />
        </div>
      )}
    </div>
  )
}

export default Listing
