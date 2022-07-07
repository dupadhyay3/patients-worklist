import { useState, useEffect } from 'react'
import { IPatient, TPatientId, TPatients, IPatientData } from 'types/patient'

const usePatients = () => {
  const [patients, setPatients] = useState<TPatients>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(true)
  const [isAddEditloading, setAddEditLoading] = useState<boolean>(false)

  useEffect(() => {
    async function getAllPatients() {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const response = await fetch(
          `${process.env.REACT_APP_JSON_SERVER_API_URL}patients/`,
          requestOptions
        )

        if (!response.ok) {
          throw new Error(`This is an HTTP error: The status is ${response.status}`)
        }

        const responseData: TPatients = await response.json()
        setPatients(responseData)
        setError(null)
      } catch (err: any) {
        setError(err.message)
        setPatients([])
      } finally {
        setLoading(false)
      }
    }
    void getAllPatients()
    return () => {
      setPatients([])
    }
  }, [])

  const removePatient = async (patientId: TPatientId) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(
        `${process.env.REACT_APP_JSON_SERVER_API_URL}patients/${patientId}/`,
        requestOptions
      )

      if (response.status !== 200) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`)
      }

      const remainPatients: TPatients = patients?.filter(
        (patient) => patient.id !== patientId
      )
      setPatients(remainPatients)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addPatient = async (patient: IPatientData) => {
    setAddEditLoading(true)
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      }
      const response = await fetch(
        `${process.env.REACT_APP_JSON_SERVER_API_URL}patients/`,
        requestOptions
      )

      if (response.status !== 201) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`)
      }

      const newPatient: IPatient = await response.json()
      const updatedPatients: TPatients | any = [...patients]
      updatedPatients.push(newPatient)
      setPatients(updatedPatients)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
      setAddEditLoading(false)
    }
  }

  const editPatient = async (patient: IPatient) => {
    setAddEditLoading(true)
    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      }
      const response = await fetch(
        `${process.env.REACT_APP_JSON_SERVER_API_URL}patients/${patient.id}/`,
        requestOptions
      )

      if (response.status !== 200) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`)
      }

      const editedPatient: IPatient = await response.json()
      const updatedPatients: TPatients = [
        ...patients.map((patientData) => {
          return patientData.id === patient.id ? editedPatient : patientData
        }),
      ]
      setPatients(updatedPatients)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
      setAddEditLoading(false)
    }
  }

  return {
    loading,
    patients,
    error,
    removePatient,
    addPatient,
    editPatient,
    isAddEditloading,
  }
}

export default usePatients
