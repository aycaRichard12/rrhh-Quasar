import { ref } from 'vue'
import type { QTableProps } from 'quasar'

/** Filas por defecto para todas las tablas del proyecto */
export const TABLE_ROWS_PER_PAGE = 5

/**
 * Configuración por defecto para todos los q-table del proyecto.
 *
 * Patrón de uso:
 * ```ts
 * const { tableProps, pagination } = useTableDefaults()
 * ```
 * ```vue
 * <q-table v-model:pagination="pagination" v-bind="tableProps" ...>
 *   <template #body-cell-id="p">
 *     <q-td :props="p">{{ (pagination.page - 1) * pagination.rowsPerPage + p.rowIndex + 1 }}</q-td>
 *   </template>
 * </q-table>
 * ```
 */
export function useTableDefaults() {
    /** Estado de paginación — usar con v-model:pagination en el q-table */
    const pagination = ref<NonNullable<QTableProps['pagination']>>({
        page: 1,
        rowsPerPage: TABLE_ROWS_PER_PAGE,
    })

    /** Props estáticas para v-bind en el q-table (sin pagination para evitar conflicto) */
    const tableProps = {
        rowsPerPageOptions: [5, 10, 25, 50, 0],
        rowsPerPageLabel: 'Filas',
        noDataLabel: 'Sin registros',
        noResultsLabel: 'Sin resultados para la búsqueda',
    } as const

    return { pagination, tableProps }
}
