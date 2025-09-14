<template>
  <div class="app-data-table w-full">
    <ClientOnly>
      <DataTable
        class="w-full"
        :value="rows"
        :loading="loading"
        :paginator="paginator"
        :rows="rowsPerPage"
        :rowsPerPageOptions="rowsPerPageOptions"
        :sortMode="sortMode"
        :selectionMode="selectionMode || undefined"
        v-model:selection="selectionState"
        @row-click="e => emit('rowClick', e.data)"
        @selection-change="e => emit('selectionChange', e.value)"
        @page="e => emit('pageChange', e)"
        @sort="e => emit('sortChange', e)"
        @filter="e => emit('filterChange', e)"
      >
        <template v-if="$slots.header" #header>
          <slot name="header" />
        </template>

        <Column
          v-for="col in columns"
          :key="col.field"
          :field="col.field"
          :header="col.header ?? String(col.field)"
          :sortable="col.sortable ?? true"
          :filter="col.filter ?? false"
          :style="col.style"
          :frozen="col.frozen"
          :alignFrozen="col.alignFrozen"
        >
          <template v-if="$slots[`header-${col.field}`]" #header>
            <slot :name="`header-${col.field}`" />
          </template>

          <template v-if="$slots[`cell-${col.field}`]" #body="slotProps">
            <slot :name="`cell-${col.field}`" v-bind="slotProps" />
          </template>
        </Column>

        <template v-if="$slots.footer" #footer>
          <slot name="footer" />
        </template>
      </DataTable>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { DataTableProps, DataTableEmits } from '~/shared/ui/table.types'

const props = withDefaults(defineProps<DataTableProps<any>>(), {
  loading: false,
  paginator: true,
  rowsPerPage: 10,
  rowsPerPageOptions: () => [10, 20, 50],
  sortMode: 'single',
  selectionMode: null,
})

const emit = defineEmits<DataTableEmits<any>>()

// keep reactivity when accessing props
const { rows, columns, loading, paginator, rowsPerPage, rowsPerPageOptions, sortMode, selectionMode } = toRefs(props)

const selectionState = ref<any | any[] | null>(null)
</script>



<style scoped>
.app-data-table { width: 100%; }
</style>
