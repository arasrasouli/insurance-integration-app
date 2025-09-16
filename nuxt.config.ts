export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    tetonToken: process.env.TETON_TOKEN,
    bestInsuranceToken: process.env.BEST_INSURANCE_TOKEN,
    public: {
      tetonBase: process.env.NUXT_PUBLIC_TETON_BASE,
      bestInsuranceBase: process.env.NUXT_PUBLIC_BEST_INSURANCE_BASE,
      tetonDepartmentId: process.env.NUXT_PUBLIC_TETON_DEPARTMENT_ID,
      tetonApiVersion: process.env.NUXT_PUBLIC_TETON_API_VERSION,
    },
  },
  css: ['primeicons/primeicons.css'],
  build: { transpile: ['primevue', 'pinia', '@nuxt/test-utils/module'] },
})

