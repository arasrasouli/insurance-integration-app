import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { ClaimSubmissionDto } from '@/entities/claim/claim.dto'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const url = event.node.req.url

  if (method !== 'POST') {
    setResponseStatus(event, 405)
    return { error: 'Method not allowed' }
  }

  if (url !== '/api/insurance/claims') {
    setResponseStatus(event, 404)
    return { error: 'Not found' }
  }

  const body = await readBody<ClaimSubmissionDto>(event)

  if (!body.fall_id || !body.insurance_number || !body.claim_type) {
    setResponseStatus(event, 400)
    return { error: 'Missing required fields: fall_id, insurance_number, claim_type' }
  }

  // Check insurance
  const insuranceFile = resolve('./server/data/insurances-mock-data.json')
  const insurances: any[] = JSON.parse(readFileSync(insuranceFile, 'utf-8'))

  const insurance = insurances.find(
    (i) => i['insurance-number'] === body.insurance_number
  )

  if (!insurance) {
    setResponseStatus(event, 404)
    return { error: 'Insurance not found' }
  }

  if (insurance.status !== 'Paid') {
    setResponseStatus(event, 402)
    return { error: insurance.description }
  }

  // Save claim
  const claimsFile = resolve('./server/data/claims-mock-data.json')
  let claims: ClaimSubmissionDto[] = []
  if (existsSync(claimsFile)) {
    claims = JSON.parse(readFileSync(claimsFile, 'utf-8'))
  }
  claims.push(body)
  writeFileSync(claimsFile, JSON.stringify(claims, null, 2), 'utf-8')

  setResponseStatus(event, 201)
  return { message: 'Claim submitted successfully', claim: body }
})
