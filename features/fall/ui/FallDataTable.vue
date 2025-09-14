<template>
  <AppDataTable :rows="rows" :columns="columns" :loading="loading">
    <template #cell-fallAt="{ data }">
      {{ formatShortDateTime(data.fallAt) }}
    </template>
  </AppDataTable>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import AppDataTable from '~/components/ui/AppDataTable.vue'
import type { FallModel } from '~/entities/fall/fall.model'
import type { ColumnDef } from '~/shared/ui/table.types'
import { formatShortDateTime } from '~/shared/lib/dateHelper'

const props = withDefaults(defineProps<{
  rows: FallModel[]
  loading?: boolean
}>(), { loading: false })

const { rows, loading } = toRefs(props)

const columns: ColumnDef<FallModel>[] = [
  { field: 'patientName', header: 'Patient', sortable: true, filter: true },
  { field: 'patientId', header: 'Patient Id', sortable: true, filter: true },
  { field: 'roomNo', header: 'Room', sortable: true, filter: true },
  { field: 'fallAt', header: 'Fall At', sortable: true, dataType: 'date' },
  { field: 'fallType', header: 'Type', sortable: true, filter: true },
  { field: 'fallDetection', header: 'Detection', sortable: true, filter: true },
  { field: 'layTime', header: 'Lay (s)', sortable: true },
  { field: 'reactionTime', header: 'Reaction (s)', sortable: true },
  { field: 'hasReport', header: 'Report', sortable: true },
  { field: 'wasPatientAlone', header: 'Alone', sortable: true, filter: true },
]
</script>

