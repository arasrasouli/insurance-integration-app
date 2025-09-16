import { beforeAll } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

beforeAll(() => {
  setActivePinia(createPinia())
})
