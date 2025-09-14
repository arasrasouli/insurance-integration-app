<template>
  <div class="p-6 space-y-4">
    <div class="fall_data_table_header">
      <h2>Falls</h2>
      <div class="summary" aria-live="polite">
        <span class="muted">Total Falls:</span>
        <span class="badge">{{ fallCount }}</span>
      </div>
    </div>

    <ClientOnly>
      <DatePicker
        v-model="range"
        selectionMode="range"
        :manualInput="false"
        showIcon
        dateFormat="yy-mm-dd"
        :maxDate="new Date()"
        placeholder="Select date range"
      />
    </ClientOnly>

    <p v-if="error" class="text-red-600 text-sm">Failed to load falls. Check console.</p>
    <FallDataTable :rows="falls" :loading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import DatePicker from 'primevue/datepicker'
import FallDataTable from '~/features/fall/ui/FallDataTable.vue'
import { useFallList } from '~/features/fall/composables/useFallList'

import '~/assets/pages/fallList.css'


const { falls, isLoading, error, fetch } = useFallList()

const now = new Date()
const startOfYear = new Date(now.getFullYear(), 0, 1)
const range = ref<[Date | null, Date | null]>([startOfYear, now])

const toIso = (d?: Date | null) => (d ? d.toISOString() : undefined)

const fallCount = computed(() => falls.value.length)

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
