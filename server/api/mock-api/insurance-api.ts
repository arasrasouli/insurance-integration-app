import { readFileSync } from 'fs'
import { resolve } from 'path'
import { InsuranceLevelDto, InsuranceNumberDto } from '@/entities/insurance/insurance.dto'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const url = event.node.req.url

  if (method !== 'GET') {
    setResponseStatus(event, 405)
    return { error: 'Method not allowed' }
  }

  const filePath = resolve('./server/data/insurances-mock-data.json')
  const data: any[] = JSON.parse(readFileSync(filePath, 'utf-8'))

  const patientMatch = url?.match(/\/patients\/(\d+)\/(insurance-level|insurance-number)/)
  if (!patientMatch) {
    setResponseStatus(event, 400)
    return { error: 'Invalid path' }
  }

  const patientId = patientMatch[1]
  const type = patientMatch[2]

  const patient = data.find((p) => p.patient_id === patientId)
  if (!patient) {
    setResponseStatus(event, 404)
    return { error: 'Patient not found' }
  }

  if (type === 'insurance-level') {
    const response: InsuranceLevelDto = {
      'insurance-level': patient['insurance-level'],
      description: patient.description
    }
    setResponseStatus(event, 200)
    return response
  }

  if (type === 'insurance-number') {
    const response: InsuranceNumberDto = {
      'insurance-number': patient['insurance-number']
    }
    setResponseStatus(event, 200)
    return response
  }

  setResponseStatus(event, 404)
  return { error: 'Not found' }
})
