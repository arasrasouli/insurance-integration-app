export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    tetonToken: process.env.HOSPITAL_TOKEN,
    bestInsuranceToken: process.env.BEST_INSURANCE_TOKEN,
    public: {
      hospitalBase: process.env.NUXT_PUBLIC_HOSPITAL_BASE,
      bestInsuranceBase: process.env.NUXT_PUBLIC_BEST_INSURANCE_BASE,
      tetonDepartmentId: process.env.NUXT_PUBLIC_HOSPITAL_DEPARTMENT_ID,
      tetonApiVersion: process.env.NUXT_PUBLIC_HOSPITAL_API_VERSION,
    },
  },
  css: ['primeicons/primeicons.css'],
  build: { transpile: ['primevue', 'pinia', '@nuxt/test-utils/module'] },
    serverHandlers: [
      {
        route: '/api/hospital/departments/**',
        handler: '~/server/api/mock-api/hospital-api.ts',
      },
      {
        route: '/api/insurance/patients/**',
        handler: '~/server/api/mock-api/insurance-api.ts',
      },
      {
        route: '/api/insurance/claim-types',
        handler: '~/server/api/mock-api/claim-type-api.ts',
      },
      {
        route: '/api/insurance/claims',
        handler: '~/server/api/mock-api/claim-api.ts',
        method: 'post'
      }      
    ]
})

