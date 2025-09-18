import { readFileSync } from 'fs'
import { resolve } from 'path'
import { FallDto } from '@/entities/fall/fall.dto'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  const filePath = resolve('./server/data/falls-mock-data.json')
  let data: FallDto[] = JSON.parse(readFileSync(filePath, 'utf-8'))

  const match = event.node.req.url?.match(/\/departments\/(\d+)\/falls/)
  const departmentId = match ? parseInt(match[1]) : null

  if (method === 'GET') {
    const query = getQuery(event)
    const { startDate, endDate } = query

    if (!startDate || !endDate) {
      setResponseStatus(event, 400)
      return { error: 'startDate and endDate query parameters are required' }
    }

    if (departmentId !== 72) {
      setResponseStatus(event, 403)
      return { error: 'You are not authorized to access this department' }
    }

    const filteredData = data
      .filter((item) => item.department_id === departmentId)
      .filter((item) => {
        const fallTime = new Date(item.fall_at).getTime()
        return (
          fallTime >= new Date(startDate as string).getTime() &&
          fallTime <= new Date(endDate as string).getTime()
        )
      })

    setResponseStatus(event, 200)
    return filteredData
  }
})
