import type { QTableColumn } from 'quasar'
import type { Area } from '../types/areas.types'

export const obtenerColumnasAreas = (t: (key: string) => string): QTableColumn<Area>[] => [
  { name: 'numero',     label: 'N°',                   align: 'center',field: () => '', style: 'width: 40px;'},
  { name: 'nombre',     label: t('areas.form.name'),   align: 'left',  field: 'nombre',     style: 'white-space: normal; width: 150px;'},
  { name: 'descripcion',label: t('tables.description'),align: 'left',  field: 'descripcion',style: 'white-space: normal; min-width: 150px;'},
  { name: 'sucursal',   label: t('areas.form.branch'), align: 'center',field: (row: Area) =>
    row.sucursal && typeof row.sucursal === 'object' ? `${row.sucursal.nombre} - ${row.sucursal.region}` : t('areas.form.noBranch'), style: 'white-space: normal; width: 150px;'},
  { name: 'opciones',   label: t('tables.options'),    align: 'center',field: () => '', style: 'width: 40px;'}]