import { FC, useEffect, useRef } from 'react'
import s from './Popup.module.scss'
import cn from 'classnames'
import {
  IPatient,
  IPatientData,
  TGender,
  TSite,
  TSymptoms,
  TVaccinationStatus,
  TVaccineName,
} from 'types/patient'
import { IBtnPopupLblTitle, TPopup } from 'types/popup'

interface IPopup {
  isLoading: boolean
  onPopupClose: boolean
  setOnPopupClose: any
  genderOptions: Array<TGender> | []
  vaccinationStatusOptions: Array<TVaccinationStatus> | []
  vaccineNameOptions: Array<TVaccineName> | []
  symptomsOptions: Array<TSymptoms> | []
  popUpType: TPopup
  setPopupType: (popupType: TPopup) => void
  patient: IPatientData | IPatient | undefined
  setPatient: (patient?: IPatientData | IPatient | any) => void
  onSubmit: (patient: IPatientData | IPatient | any) => Promise<void>
  site: TSite
}

const Popup: FC<IPopup> = ({
  isLoading = false,
  onPopupClose,
  setOnPopupClose,
  genderOptions,
  vaccinationStatusOptions,
  vaccineNameOptions,
  symptomsOptions,
  popUpType,
  setPopupType,
  patient,
  setPatient,
  onSubmit,
  site,
}) => {
  const formEl = useRef(null)
  useEffect(() => {
    setPatient({ ...patient, site: site })
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

  const btnActionLbl: IBtnPopupLblTitle = {
    add: {
      title: 'Add Patient Details',
      lbl: 'Submit',
    },
    edit: {
      title: 'Edit Patient Details',
      lbl: 'Update',
    },
    view: {
      title: 'Patient Details',
      lbl: '',
    },
  }

  const readOnlyMode = popUpType === 'view'
  const popupTitle = popUpType && btnActionLbl[popUpType].title
  const btnLbl = popUpType && btnActionLbl[popUpType].lbl
  const btnText = isLoading ? (
    <span>
      <svg
        role='status'
        className='inline w-4 h-4 mr-3 text-white animate-spin'
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='#E5E7EB'
        />
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentColor'
        />
      </svg>
      Loading...
    </span>
  ) : (
    <span>{btnLbl}</span>
  )

  return (
    <>
      <div
        id='authentication-modal'
        aria-hidden='true'
        className={cn(
          s.popupContainer,
          !onPopupClose && 'hidden',
          'overflow-y-auto overflow-x-hidden text-left fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full'
        )}
      >
        <div className={cn(s.popupContnt, 'relative p-4 w-1/2	 h-full md:h-auto')}>
          <div
            className={cn(
              s.popupArea,
              'relative bg-white rounded-lg shadow dark:bg-gray-700'
            )}
          >
            <button
              type='button'
              className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
              data-modal-toggle='authentication-modal'
              onClick={() => setOnPopupClose(false)}
            >
              <svg
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
            <div className='px-6 py-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
                {popupTitle}
              </h3>
              <form className='space-y-6' action='#' id='popupForm' ref={formEl}>
                <div className='w-full'>
                  <label
                    htmlFor='firstName'
                    className='block px-1 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Full Name
                  </label>
                  <div className='flex'>
                    <div className='w-1/3 px-1 column'>
                      <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter First Name'
                        required
                        disabled={readOnlyMode}
                        onChange={(e) => {
                          setPatient({ ...patient, firstName: e.target.value })
                        }}
                        value={patient?.firstName}
                      />
                    </div>
                    <div className='w-1/3 px-1 column'>
                      <input
                        type='text'
                        name='middleName'
                        id='middleName'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter Middle Name'
                        required
                        disabled={readOnlyMode}
                        onChange={(e) => {
                          setPatient({ ...patient, middleName: e.target.value })
                        }}
                        value={patient?.middleName}
                      />
                    </div>
                    <div className='w-1/3 px-1 column'>
                      <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter Last Name'
                        required
                        disabled={readOnlyMode}
                        onChange={(e) => {
                          setPatient({ ...patient, lastName: e.target.value })
                        }}
                        value={patient?.lastName}
                      />
                    </div>
                  </div>
                </div>

                <div className='w-full'>
                  <div className='flex'>
                    <div className='w-1/3 px-1 column'>
                      <label
                        htmlFor='age'
                        className='block px-1 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Age
                      </label>
                      <input
                        type='text'
                        name='age'
                        id='age'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter Age'
                        required
                        disabled={readOnlyMode}
                        onChange={(e) => {
                          setPatient({ ...patient, age: e.target.value })
                        }}
                        value={patient?.age}
                      />
                    </div>
                    <div className='w-1/3 px-1 column'>
                      <label
                        htmlFor='gender'
                        className='block px-1 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Gender
                      </label>
                      <select
                        name='gender'
                        id='gender'
                        disabled={readOnlyMode}
                        onChange={(e) => {
                          setPatient({ ...patient, gender: e.target.value })
                        }}
                        value={patient?.gender}
                        className='bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      >
                        <option selected value={''}>
                          Choose an option
                        </option>
                        {genderOptions.map((option, index) => {
                          return (
                            <option key={`gender-${index}`} value={option}>
                              {option}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className='w-1/3 px-1 column'>
                      <label
                        htmlFor='phoneNo'
                        className='block px-1 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Phone Number
                      </label>
                      <input
                        type='text'
                        name='phoneNo'
                        id='phoneNo'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter Phone Number'
                        required
                        disabled={readOnlyMode}
                        onChange={(e) => {
                          setPatient({ ...patient, phoneNo: e.target.value })
                        }}
                        value={patient?.phoneNo}
                      />
                    </div>
                  </div>
                </div>

                <div className='w-full'>
                  <div className='flex'>
                    <div className='w-1/2 px-1 column'>
                      <label
                        htmlFor='vaccinationStatus'
                        className='block px-1 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Vaccination Status
                      </label>
                      <select
                        name='vaccinationStatus'
                        id='vaccinationStatus'
                        disabled={readOnlyMode}
                        onChange={(e) => {
                          /* eslint-disable */
                          const valueFinal =
                            e.target.value === 'Not vaccinated'
                              ? {
                                  ...patient,
                                  vaccinationStatus: e.target.value,
                                  vaccineName: '',
                                }
                              : { ...patient, vaccinationStatus: e.target.value }
                          setPatient(valueFinal)
                          /* eslint-enable */
                        }}
                        value={patient?.vaccinationStatus}
                        className='bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      >
                        <option selected value={''}>
                          Choose an option
                        </option>
                        {vaccinationStatusOptions.map((option, index) => {
                          return (
                            <option key={`vaccinationStatus-${index}`} value={option}>
                              {option}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                    <div className='w-1/2 px-1 column'>
                      <label
                        htmlFor='vaccineName'
                        className='block px-1 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Vaccine Name
                      </label>
                      <select
                        name='vaccineName'
                        id='vaccineName'
                        disabled={
                          patient?.vaccinationStatus === 'Not vaccinated' ||
                          readOnlyMode
                        }
                        onChange={(e) => {
                          setPatient({
                            ...patient,
                            vaccineName: e.target.value,
                          })
                        }}
                        value={patient?.vaccineName}
                        className='bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      >
                        <option selected value={''}>
                          Choose an option
                        </option>
                        {vaccineNameOptions.map((option, index) => {
                          return (
                            <option key={`vaccineName-${index}`} value={option}>
                              {option}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className='w-full'>
                  <div className='flex'>
                    <div className='w-full px-1 column'>
                      <label
                        htmlFor='symptoms'
                        className='block px-1 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Symptoms
                      </label>
                      <select
                        name='symptoms'
                        id='symptoms'
                        disabled={readOnlyMode}
                        className='bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-36 overflow-auto'
                        multiple={true}
                        value={patient?.symptoms}
                        onChange={(e) => {
                          const symptomsValue = Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                          setPatient({
                            ...patient,
                            symptoms: symptomsValue,
                          })
                        }}
                      >
                        <option selected value={''}>
                          Choose an option
                        </option>
                        {symptomsOptions.map((option, index) => {
                          return (
                            <option key={`vaccineName-${index}`} value={option}>
                              {option}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className='w-full'>
                  <div className='flex'>
                    <div className='w-full px-1 column'>
                      <label
                        htmlFor='anyMedicalHistory'
                        className='block px-1 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Medical History
                      </label>
                      <textarea
                        id='anyMedicalHistory'
                        name='anyMedicalHistory'
                        aria-rowspan={8}
                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none h-36'
                        placeholder='Your message...'
                        disabled={readOnlyMode}
                        value={patient?.anyMedicalHistory}
                        onChange={(e) => {
                          setPatient({
                            ...patient,
                            anyMedicalHistory: e.target.value,
                          })
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {!readOnlyMode && (
                  <div className='w-full px-1'>
                    <button
                      onClick={async () => {
                        await onSubmit(patient)
                        if (!isLoading) {
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
                          await setOnPopupClose(false)
                          await setPopupType(null)
                        }
                      }}
                      type='button'
                      className='w-full text-white bg-gradient-to-r from-purple-500 via-blue-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                    >
                      {btnText}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Popup
