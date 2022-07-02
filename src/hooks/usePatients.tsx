import { useState, useEffect } from 'react'
import { TPatientId, TPatients } from 'types/patient'

const usePatients = () => {
  const [patients, setPatients] = useState<TPatients>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(true)

  useEffect(() => {
    async function getAllPatients() {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
        const response = await fetch(`${process.env.REACT_APP_JSON_SERVER_API_URL}patients/`, requestOptions)

        if (!response.ok)
          throw new Error(`This is an HTTP error: The status is ${response.status}`)
        
        const responseData: TPatients = await response.json()
        setPatients(responseData)
        setError(null)
      } catch(err: any) {
        setError(err.message)
        setPatients(null)
      } finally {
        setLoading(false)
      }
    }
    getAllPatients()
    return () => {
      setPatients(null)
    }
  }, [])

  const removePatient = async (patientId: TPatientId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
      const response = await fetch(`${process.env.REACT_APP_JSON_SERVER_API_URL}patients/${patientId}/`, requestOptions)
      
      if (response.status !== 200)
        throw new Error(`This is an HTTP error: The status is ${response.status}`)

      const remainPatients: TPatients = patients?.filter((patient) => patient.id !== patientId)
      setPatients(remainPatients)
      setError(null)
    } catch(err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, patients, error, removePatient }
}

export default usePatients