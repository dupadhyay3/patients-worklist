import { FC, useEffect, useState } from 'react'
import { NavLink, BrowserRouter } from "react-router-dom"
import cn from 'classnames'
import usePatients from 'hooks/usePatients'
import { IDashboard } from 'types/dashboard'
import { IFilters } from 'types/filters'
import { IPatient, TSite } from 'types/patient'
import { Dashboard, Listing, ToggleSwitch } from 'components'
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

interface IFilterBox {
  lbl: string
  filterName: keyof IFilters
  filterOptions: string[]
}

const App: FC = () => {
  const [switchToggle, setSwitchToggle] = useState<boolean>(false)
  const [currentSite, setSite] = useState<TSite>(SITE_MUMBAI)

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
    symptoms: []
  })

  const { loading, patients, error, removePatient } = usePatients()
  
  useEffect(() => {
    if (patients && patients.length > 0) {
      const fullyVaccinated = patients.filter((patient) => patient.vaccinationStatus === VACCINE_STATUS_FULLY).length || 0
      const partiallyVaccinated = patients.filter((patient) => patient.vaccinationStatus === VACCINE_STATUS_PARTIALLY).length || 0
      const notVaccinated = patients.filter((patient) => patient.vaccinationStatus === VACCINE_STATUS_NOT).length || 0
      const mumbaiPatients = patients.filter((patient) => patient.site === SITE_MUMBAI).length || 0
      const banglorePatients = patients.filter((patient) => patient.site === SITE_BANGLORE).length || 0
      const covishieldPatients = patients.filter((patient) => patient.vaccineName === VACCINE_COVISHIELD).length || 0
      const covaxinPatients = patients.filter((patient) => patient.vaccineName === VACCINE_COVAXIN).length || 0
      const malePatients = patients.filter((patient) => patient.gender === GENDER_MALE).length || 0
      const femalePatients = patients.filter((patient) => patient.gender === GENDER_FEMALE).length || 0
      const otherPatients = patients.filter((patient) => patient.gender === GENDER_OTHER).length || 0

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
      <div>Loading...</div>
    )
  }

  if (error) {
    console.log('Error', error)
  }

  const genderFilter = (patient: IPatient) => patient.gender.includes(filters.gender)
  const vaccinationStatusFilter = (patient: IPatient) => patient.vaccinationStatus.includes(filters.vaccinationStatus)
  const vaccineNameFilter = (patient: IPatient) => patient?.vaccineName?.includes(filters.vaccineName)
  const siteFilter = (patient: IPatient) => patient.site.includes(filters.site)

  const FilterBox: FC<IFilterBox> = ({lbl, filterName, filterOptions }) => {
    const currentFiltervalue = filters[filterName] || ''
    return (
      <div className={s.filterBox}>
        <div className={s.heading}>
          <div className={s.lbl}>{lbl}</div>
          {
            currentFiltervalue !== '' && (
              <div className={s.clearFilter} onClick={() => {
                setFilters({...filters, [filterName]: ''})
              }}>x</div>
            )
          }
        </div>
        <div className={s.body}>
          {
            filterOptions.map((option, index) => {
              return (
                <div key={`filterOption-${index}`} className={cn(s.filterOption)} onClick={() => setFilters({...filters, [filterName]: option})}>{option}</div>
              )
            })
          }
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className={s.app}>
        <div className={s.header}>
          <div className={s.headerContainer}>
            <nav className={s.navBar}>
              <div className={s.banner} role={'banner'}>
                <NavLink className={s.bannerTitle} to="/">
                  <img className={s.logo} src='./healthcare_icon.svg' alt={'M.G. Memorial Hospital'} />
                  <div className={s.navigator} role={'navigation'}>
                    {'M.G. Memorial Hospital'}
                  </div>
                </NavLink>
              </div>
              <div className={s.siteSwitcher}>
                <span>Mumbai</span>
                <ToggleSwitch id={'siteSwitcher'} checked={switchToggle} onChange={(checked) => {
                  setSwitchToggle(checked)
                  checked ? setSite(SITE_BANGLORE) : setSite(SITE_MUMBAI)
                }} />
                <span>Banglore</span>
              </div>
            </nav>
          </div>
        </div>
        <Dashboard dashboard={dashboard} />
        <div className={s.mainContainer}>
          <div className={s.leftPanel}>
            <div className={s.filtersTitle}>Filters</div>
            <FilterBox lbl={'By Gender'} filterName={'gender'} filterOptions={[GENDER_MALE, GENDER_FEMALE, GENDER_OTHER]} />
            <FilterBox lbl={'By Vaccine Status'} filterName={'vaccinationStatus'} filterOptions={[VACCINE_STATUS_FULLY, VACCINE_STATUS_PARTIALLY, VACCINE_STATUS_NOT]} />
            {!filters.vaccinationStatus.includes(VACCINE_STATUS_NOT) && <FilterBox lbl={'By Vaccine Name'} filterName={'vaccineName'} filterOptions={[VACCINE_COVISHIELD, VACCINE_COVAXIN]} />}
            <FilterBox lbl={'By Site'} filterName={'site'} filterOptions={[SITE_MUMBAI, SITE_BANGLORE]} />
          </div>
          <div className={s.listing}>
            {patients && <Listing patients={
              patients
              ?.filter(genderFilter)
              ?.filter(vaccinationStatusFilter)
              ?.filter(vaccineNameFilter)
              ?.filter(siteFilter)
            } removePatient={removePatient} />}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
