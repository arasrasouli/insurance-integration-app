<template>
  <div class="p-6 space-y-4">
    <div class="fall_data_table_header">
      <h2>Falls</h2>
      <div class="summary" aria-live="polite">
        <span class="muted">Total Falls:</span>
        <span class="badge">{{ fallCount }}</span>
      </div>
    </div>

    <div class="flex space-x-4 filter-input">
      <DatePicker
        v-model="range"
        selectionMode="range"
        :manualInput="false"
        showIcon
        dateFormat="yy-mm-dd"
        :maxDate="new Date()"
        placeholder="Select date range"
      />

      <InputText
        v-model="patientIdFilter"
        placeholder="Patient ID"
        class="w-60 filter-input"
        aria-label="Filter by patient ID"
      />

      <Select
        v-model="selectedRoom"
        :options="roomOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Filter by Room Number"
        showClear
        class="w-60 filter-field"
        aria-label="Filter by room number"
      >
        <template #value="{ value, placeholder }">
          <span v-if="value">Room Number: {{ value }}</span>
          <span v-else>{{ placeholder }}</span>
        </template>
      </Select>

      <Select
        v-model="selectedType"
        :options="typeOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Type"
        showClear
        class="w-60 filter-input"
        aria-label="Filter by fall type"
      >
        <template #value="{ value, placeholder }">
          <span v-if="value">Type: {{ value }}</span>
          <span v-else>{{ placeholder }}</span>
        </template>
      </Select>
    </div>

    <p v-if="error" class="text-red-600 text-sm">Failed to load falls. Check console.</p>
    <FallDataTable :rows="filteredFalls" :loading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import FallDataTable from '~/features/fall/ui/FallDataTable.vue'
import { useFallList } from '~/features/fall/composables/useFallList'

import '~/assets/pages/fallList.css'

const { falls, isLoading, error, fetch, roomOptions, typeOptions } = useFallList()

const now = new Date()
const startOfYear = new Date(now.getFullYear(), 0, 1)
const range = ref<[Date | null, Date | null]>([startOfYear, now])

const patientIdFilter = ref<string>('')
const selectedRoom = ref<string | null>(null)
const selectedType = ref<string | null>(null)

const toIso = (d?: Date | null) => (d ? d.toISOString() : undefined)

const filteredFalls = computed(() => {
  return falls.value.filter(f => {
    const matchRoom = !selectedRoom.value || String(f?.roomNo ?? '') === selectedRoom.value
    const matchType = !selectedType.value || f?.fallType === selectedType.value
    const matchPatientId =
      !patientIdFilter.value ||
      String(f?.patientId ?? '').toLowerCase().includes(patientIdFilter.value.toLowerCase())
    return matchRoom && matchType && matchPatientId
  })
})

const fallCount = computed(() => filteredFalls.value.length)

watch(
  range,
  async ([start, end]) => {
    const s = toIso(start)
    const e = toIso(end)
    if (s && e) await fetch(s, e)
  },
  { immediate: true }
)
</script>
