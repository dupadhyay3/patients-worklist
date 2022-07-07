import { FC, useEffect, useState } from 'react'
import { NavLink, BrowserRouter } from 'react-router-dom'
import cn from 'classnames'
import usePatients from 'hooks/usePatients'
import { IDashboard } from 'types/dashboard'
import { IFilters } from 'types/filters'
import {
  IPatient,
  TGender,
  TPatients,
  TSite,
  TSymptoms,
  TVaccinationStatus,
  TVaccineName,
} from 'types/patient'
import { Dashboard, Listing, ToggleSwitch, Popup } from 'components'
import s from './App.module.scss'

const SITE_MUMBAI = 'Mumbai'
const SITE_BANGLORE = 'Banglore'
const VACCINE_STATUS_FULLY = 'Fully vaccinated'
const VACCINE_STATUS_PARTIALLY = 'Partially vaccinated'
const VACCINE_STATUS_NOT = 'Not vaccinated'
const VACCINE_COVISHIELD = 'Covishield'
const VACCINE_COVAXIN = 'Covaxin'
const GENDER_MALE = 'Male'
const GENDER_FEMALE = 'Female'
const GENDER_OTHER = 'Other'

const GENDER_OPTIONS: Array<TGender> = [GENDER_MALE, GENDER_FEMALE, GENDER_OTHER]
const VACCINE_STATUS_OPTIONS: Array<TVaccinationStatus> = [
  VACCINE_STATUS_FULLY,
  VACCINE_STATUS_PARTIALLY,
  VACCINE_STATUS_NOT,
]
const VACCINE_NAME_OPTIONS: Array<TVaccineName> = [
  VACCINE_COVISHIELD,
  VACCINE_COVAXIN,
]
const SYMPTOMS_OPTIONS: Array<TSymptoms> = [
  'Headache',
  'Cough',
  'Fatigue',
  'Chest Pain',
  'Loss of Smell & Taste',
  'Shortness in breathing',
]
const SITE_OPTIONS: Array<TSite> = [SITE_MUMBAI, SITE_BANGLORE]

interface IFilterBox {
  lbl: string
  filterName: keyof IFilters
  filterOptions: string[]
}

const App: FC = () => {
  const [switchToggle, setSwitchToggle] = useState<boolean>(false)
  const [currentSite, setSite] = useState<TSite>(SITE_MUMBAI)
  const [dataFromPaginate, setDataFromPaginate] = useState<TPatients>([])
  const [cardDropdwnOpenId, setCardDropdwnOpenId] = useState<number>(0)
  const [onPopupClose, setOnPopupClose] = useState<boolean>(false)

  const [dashboard, setDashboard] = useState<IDashboard>({
    totalPatients: 0,
    fullyVaccinated: 0,
    partiallyVaccinated: 0,
    notVaccinated: 0,
    mumbaiPatients: 0,
    banglorePatients: 0,
    covishieldPatients: 0,
    covaxinPatients: 0,
    malePatients: 0,
    femalePatients: 0,
    otherPatients: 0,
  })

  const [filters, setFilters] = useState<IFilters>({
    gender: '',
    vaccinationStatus: '',
    vaccineName: '',
    site: '',
    symptoms: [],
  })

  const { loading, patients, error, removePatient, addPatient, editPatient } =
    usePatients()

  useEffect(() => {
    if (patients && patients.length > 0) {
      const fullyVaccinated =
        patients.filter(
          (patient) => patient.vaccinationStatus === VACCINE_STATUS_FULLY
        ).length || 0
      const partiallyVaccinated =
        patients.filter(
          (patient) => patient.vaccinationStatus === VACCINE_STATUS_PARTIALLY
        ).length || 0
      const notVaccinated =
        patients.filter((patient) => patient.vaccinationStatus === VACCINE_STATUS_NOT)
          .length || 0
      const mumbaiPatients =
        patients.filter((patient) => patient.site === SITE_MUMBAI).length || 0
      const banglorePatients =
        patients.filter((patient) => patient.site === SITE_BANGLORE).length || 0
      const covishieldPatients =
        patients.filter((patient) => patient.vaccineName === VACCINE_COVISHIELD)
          .length || 0
      const covaxinPatients =
        patients.filter((patient) => patient.vaccineName === VACCINE_COVAXIN)
          .length || 0
      const malePatients =
        patients.filter((patient) => patient.gender === GENDER_MALE).length || 0
      const femalePatients =
        patients.filter((patient) => patient.gender === GENDER_FEMALE).length || 0
      const otherPatients =
        patients.filter((patient) => patient.gender === GENDER_OTHER).length || 0

      setDashboard({
        totalPatients: patients.length || 0,
        fullyVaccinated: fullyVaccinated,
        partiallyVaccinated: partiallyVaccinated,
        notVaccinated: notVaccinated,
        mumbaiPatients: mumbaiPatients,
        banglorePatients: banglorePatients,
        covishieldPatients: covishieldPatients,
        covaxinPatients: covaxinPatients,
        malePatients: malePatients,
        femalePatients: femalePatients,
        otherPatients: otherPatients,
      })
    }
  }, [patients])

  if (loading) {
    return (
      <div className={cn(s.pageLoader, 'text-center absolute top-1/2 left-1/2')}>
        <svg
          role='status'
          className='inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
      </div>
    )
  }

  if (error) {
    console.log('Error', error)
  }

  const genderFilter = (patient: IPatient) => patient.gender.includes(filters.gender)
  const vaccinationStatusFilter = (patient: IPatient) =>
    patient.vaccinationStatus.includes(filters.vaccinationStatus)
  const vaccineNameFilter = (patient: IPatient) =>
    patient?.vaccineName?.includes(filters.vaccineName)
  const siteFilter = (patient: IPatient) => patient.site.includes(filters.site)

  const FilterBox: FC<IFilterBox> = ({ lbl, filterName, filterOptions }) => {
    const currentFiltervalue = filters[filterName] || ''
    return (
      <div className={s.filterBox}>
        <div className={s.heading}>
          <div className={s.lbl}>{lbl}</div>
          {currentFiltervalue !== '' && (
            <div
              className={s.clearFilter}
              onClick={() => {
                setFilters({ ...filters, [filterName]: '' })
              }}
            >
              <img src='cancel.png' alt='Cancel icon' />
            </div>
          )}
        </div>
        <div className={s.body}>
          {filterOptions.map((option, index) => (
            <div
              key={`filterOption-${index}`}
              className={cn(
                filters[filterName] == option && s.selected,
                s.filterOption
              )}
              onClick={() => setFilters({ ...filters, [filterName]: option })}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const patientsData = dataFromPaginate.length ? dataFromPaginate : patients

  return (
    <BrowserRouter>
      <div className={cn(s.app)}>
        <div
          className={cn(s.header, 'bg-gradient-to-br from-purple-600 to-blue-500')}
        >
          <div className={s.headerContainer}>
            <nav className={s.navBar}>
              <div className={s.banner} role={'banner'}>
                <NavLink className={s.bannerTitle} to='/'>
                  <img
                    className={s.logo}
                    src='./healthcare_icon.svg'
                    alt={'M.G. Memorial Hospital'}
                  />
                  <div className={cn(s.navigator, 'text-2xl')} role={'navigation'}>
                    {'M.G. Memorial Hospital'}
                  </div>
                </NavLink>
              </div>
              <div className={s.siteSwitcher}>
                <span>Mumbai</span>
                <ToggleSwitch
                  id={'siteSwitcher'}
                  checked={switchToggle}
                  onChange={(checked) => {
                    setSwitchToggle(checked)
                    checked ? setSite(SITE_BANGLORE) : setSite(SITE_MUMBAI)
                  }}
                />
                <span>Banglore</span>
              </div>
            </nav>
          </div>
        </div>
        <Dashboard dashboard={dashboard} />
        <span className={s.lineBrek}></span>
        <div className={s.mainContainer}>
          <div className={s.leftPanel}>
            <div className='inline-block w-56 max-w-sm p-3 m-2 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
              <div className='flex flex-col items-center pb-10'>
                <div className={s.filtersTitle}>FILTERS</div>
                <FilterBox
                  lbl={'By Gender'}
                  filterName={'gender'}
                  filterOptions={GENDER_OPTIONS}
                />
                <FilterBox
                  lbl={'By Vaccine Status'}
                  filterName={'vaccinationStatus'}
                  filterOptions={VACCINE_STATUS_OPTIONS}
                />
                {!filters.vaccinationStatus.includes(VACCINE_STATUS_NOT) && (
                  <FilterBox
                    lbl={'By Vaccine Name'}
                    filterName={'vaccineName'}
                    filterOptions={VACCINE_NAME_OPTIONS}
                  />
                )}
                <FilterBox
                  lbl={'By Site'}
                  filterName={'site'}
                  filterOptions={SITE_OPTIONS}
                />
              </div>
            </div>
          </div>
          <div className={s.listing}>
            <div className='block float-right w-full mr-2'>
              <h2 className='relative float-left pt-1 ml-6 text-2xl font-bold uppercase'>
                PATIENTS LISTING
              </h2>
              <button
                onClick={() => setOnPopupClose(true)}
                className='float-right  relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
              >
                <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                  ➕ ADD PATIENT
                </span>
              </button>
            </div>
            <Popup
              head={'Add New Patient'}
              onPopupClose={onPopupClose}
              setOnPopupClose={setOnPopupClose}
              addPatient={addPatient}
              editPatient={editPatient}
              genderOptions={GENDER_OPTIONS}
              vaccinationStatusOptions={VACCINE_STATUS_OPTIONS}
              vaccineNameOptions={VACCINE_NAME_OPTIONS}
              symptomsOptions={SYMPTOMS_OPTIONS}
            ></Popup>
            {patientsData.length && (
              <Listing
                patients={patientsData
                  ?.filter(genderFilter)
                  ?.filter(vaccinationStatusFilter)
                  ?.filter(vaccineNameFilter)
                  ?.filter(siteFilter)}
                removePatient={removePatient}
                cardDropdwnOpenId={cardDropdwnOpenId}
                setCardDropdwnOpenId={setCardDropdwnOpenId}
                setOnPopupClose={setOnPopupClose}
              />
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
