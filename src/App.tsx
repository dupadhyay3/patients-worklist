import { FC, useEffect, useState } from 'react'
import { NavLink, BrowserRouter } from "react-router-dom"
import usePatients from 'hooks/usePatients'
import { IDashboard } from 'types/dashboard'
import { IFilters } from 'types/filters'
import { IPatient } from 'types/patient'
import s from './App.module.scss'
import { Dashboard, ToggleSwitch } from 'components'

const App: FC = () => {
  const [switchToggle, setSwitchToggle] = useState<boolean>(false);

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
      const fullyVaccinated = patients.filter((patient) => patient.vaccinationStatus === 'Fully vaccinated').length || 0
      const partiallyVaccinated = patients.filter((patient) => patient.vaccinationStatus === 'Partially vaccinated').length || 0
      const notVaccinated = patients.filter((patient) => patient.vaccinationStatus === 'Not vaccinated').length || 0
      const mumbaiPatients = patients.filter((patient) => patient.site === 'Mumbai').length || 0
      const banglorePatients = patients.filter((patient) => patient.site === 'Banglore').length || 0
      const covishieldPatients = patients.filter((patient) => patient.vaccineName === 'Covishield').length || 0
      const covaxinPatients = patients.filter((patient) => patient.vaccineName === 'Covaxin').length || 0
      const malePatients = patients.filter((patient) => patient.gender === 'Male').length || 0
      const femalePatients = patients.filter((patient) => patient.gender === 'Female').length || 0
      const otherPatients = patients.filter((patient) => patient.gender === 'Other').length || 0

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

  return (
    <BrowserRouter>
      <div className={s.app}>
        <div className={s.header}>
          <div className={s.headerContainer}>
            <nav className={s.navBar}>
              <div className={s.banner} role={'banner'}>
                <NavLink
                  className="navbar-item"
                  to="/"
                >
                  <img className={s.logo} src='./healthcare_icon.svg' alt={'M.G. Memorial Hospital'} />
                </NavLink>
              </div>
              <div className={s.navigator} role={'navigation'}>
                {'M.G. Memorial Hospital'}
              </div>
              <div className={s.siteSwitcher}>
                <span>Mumbai</span>
                <ToggleSwitch id={'siteSwitcher'} checked={switchToggle} onChange={(checked) => setSwitchToggle(checked)} />
                <span>Banglore</span>
              </div>
            </nav>
          </div>
        </div>
        <Dashboard dashboard={dashboard} />
        {patients && patients
          ?.filter(genderFilter)
          ?.filter(vaccinationStatusFilter)
          ?.filter(vaccineNameFilter)
          ?.filter(siteFilter)
          ?.map((patient) => {
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
        })}
      </div>
    </BrowserRouter>
  );
}

export default App;
