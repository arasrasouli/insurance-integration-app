export type StringKeyOf<T> = Extract<keyof T, string>

export type ColumnDef<T extends object = Record<string, unknown>> = {
  field: StringKeyOf<T>
  header?: string
  sortable?: boolean
  filter?: boolean
  style?: string | Record<string, string>
  frozen?: boolean
  alignFrozen?: 'left' | 'right'
  dataType?: 'text' | 'numeric' | 'date' | 'boolean'
  body?: (rowData: T) => any
}

export type DataTableProps<T extends object = Record<string, unknown>> = {
  rows: T[]
  columns: ColumnDef<T>[]
  loading?: boolean
  paginator?: boolean
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
  sortMode?: 'single' | 'multiple'
  selectionMode?: 'single' | 'multiple' | null
}

export type DataTableEmits<T extends object = Record<string, unknown>> = {
  (e: 'rowClick', row: T): void
  (e: 'selectionChange', selection: T | T[] | null): void
  (e: 'pageChange', meta: any): void
  (e: 'sortChange', meta: any): void
  (e: 'filterChange', meta: any): void
}
