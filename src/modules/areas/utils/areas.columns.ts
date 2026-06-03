import type { QTableColumn } from 'quasar'
import type { Area } from '../types/areas.types'

export const obtenerColumnasAreas = (t: (key: string) => string): QTableColumn<Area>[] => [
  { name: 'numero',     label: 'N°',                   align: 'right', field: () => '',     style: 'width: 50px'},
  { name: 'nombre',     label: t('areas.name'),        align: 'left',  field: 'nombre',     style: 'width: 153px; white-space: normal'},
  { name: 'descripcion',label: t('tables.description'),align: 'left',  field: 'descripcion',style: 'min-width:210px; white-space: normal'},
  { name: 'sucursal',   label: t('areas.branch'),      align: 'center',field: (row: Area) =>
    row.sucursal && typeof row.sucursal === 'object' ? `${row.sucursal.nombre} - ${row.sucursal.region}` : t('areas.form.noBranch'), style: 'white-space: normal; width: 190px;'},
  { name: 'opciones',   label: t('tables.options'),    align: 'center',field: () => '',     style: 'width: 110px;'}]