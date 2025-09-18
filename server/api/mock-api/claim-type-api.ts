import { readFileSync } from 'fs'
import { resolve } from 'path'
import { ClaimTypeDto } from '@/entities/claim/claim.dto'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const url = event.node.req.url

  if (method !== 'GET') {
    setResponseStatus(event, 405)
    return { error: 'Method not allowed' }
  }

  if (url !== '/api/insurance/claim-types') {
    setResponseStatus(event, 404)
    return { error: 'Not found' }
  }

  const filePath = resolve('./server/data/claim-types-mock-data.json')
  const data: ClaimTypeDto[] = JSON.parse(readFileSync(filePath, 'utf-8'))

  setResponseStatus(event, 200)
  return { claim_types: data }
})
