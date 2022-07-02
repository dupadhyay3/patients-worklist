import { FC } from 'react'
import usePatients from 'hooks/usePatients'
import s from './App.module.scss'

const App: FC = () => {

  const { loading, patients, error, removePatient } = usePatients()
  
  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    console.log('Error', error)
  }

  return (
    <div className={s["App"]}>
      {patients && patients?.map((patient) => {
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
            <div>{patient.anyMedicalHistory}</div>
            <div>{patient.site}</div>
            <div onClick={() => removePatient(patient.id)}>Delete</div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
