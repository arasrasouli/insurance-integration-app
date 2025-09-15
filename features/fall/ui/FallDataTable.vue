<template>
  <div>
    <AppDataTable :rows="rows" :columns="columns" :loading="loading">
      <template #cell-fallAt="{ data }">
        {{ formatShortDateTime(data.fallAt) }}
      </template>

      <template #cell-actions="{ data }">
        <Button 
          icon="pi pi-info-circle"
          text
          rounded
          severity="info"
          aria-label="View Details"
          @click="openDetails(data)" 
        />
      </template>
    </AppDataTable>

    <Dialog v-model:visible="showDialog" modal header="Fall Details" :style="{ width: '40rem' }">
      <FallDetailsCard v-if="selectedFall" :fall="selectedFall" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import AppDataTable from '~/components/ui/AppDataTable.vue'
import FallDetailsCard from '~/features/fall/ui/FallDetailsCard.vue'
import type { FallModel } from '~/entities/fall/fall.model'
import type { ColumnDef } from '~/shared/ui/table.types'
import { formatShortDateTime } from '~/shared/lib/dateHelper'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const props = withDefaults(defineProps<{
  rows: FallModel[]
  loading?: boolean
}>(), { loading: false })

const { rows, loading } = toRefs(props)

const showDialog = ref(false)
const selectedFall = ref<FallModel | null>(null)

const openDetails = (fall: FallModel) => {
  selectedFall.value = fall
  showDialog.value = true
}

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
  { field: 'actions' as any, header: '', sortable: false }
]
</script>
