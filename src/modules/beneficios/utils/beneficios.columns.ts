import type { QTableColumn } from "quasar";
import type { Beneficio } from "../types/beneficios.types";

export const obtenerColumnasBeneficios = (t: (key: string) => string): QTableColumn<Beneficio>[] => [
  { name: 'numero',
    label: 'N°',
    align: 'center',
    field: () => '',
    style: 'width: 50px'
  },
  { name: 'nombre',
    label: t('beneficios.table.name'),
    align: 'left',
    field: 'nombre',
    style: 'white-space: normal; width: 150px;'
  },
  { name: 'descripcion',
    label: t('beneficios.table.description'),
    align: 'left',
    field: 'descripcion',
    style: 'white-space: normal; min-width: 150px;'
  },
  { name: 'tipo',
    label: t('beneficios.table.type'),
    align: 'center',
    field: 'tipo',
    style: 'width: 100px'
  },
  { name: 'cantidad',
    label: t('beneficios.table.amount'),
    align: 'right',
    field: 'cantidad',
    style: 'width: 80px'
  },
  { name: 'orden',
    label: t('beneficios.table.order'),
    align: 'center',
    field: 'orden',
    style: 'width: 80px'
  },
  { name: 'destino',
    label: t('beneficios.table.destination'),
    align: 'center',
    field: 'destino',
    style: 'width: 100px'
  },
  { name: 'estado',
    label: t('beneficios.table.status'),
    align: 'center',
    field: 'estado',
    style: 'width: 80px'
  },
  { name: 'opciones',
    label: t('beneficios.table.options'),
    align: 'center',
    field: () => '',
    style: 'width: 100px'
}]

// 2. Columnas para la tabla estándar (No tiene estado ni opciones)
export const obtenerColumnasBeneficiosEstandar = (t: (key: string) => string): QTableColumn<Beneficio>[] => [
  { name: 'numero',     label: 'N°',                             align: 'center',field: () => '',     style: 'width: 50px' },
  { name: 'nombre',     label: t('beneficios.table.name'),       align: 'left',  field: 'nombre',     style: 'white-space: normal; width: 180px' },
  { name: 'descripcion',label: t('beneficios.table.description'),align: 'left',  field: 'descripcion',style: 'white-space: normal' },
  { name: 'tipo',       label: t('beneficios.table.type'),       align: 'center',field: 'tipo',       style: 'width: 100px' },
  { name: 'cantidad',   label: t('beneficios.table.amount'),     align: 'right', field: 'cantidad',   style: 'width: 80px' },
  { name: 'orden',      label: t('beneficios.table.order'),      align: 'center',field: 'orden',      style: 'width: 80px' },
  { name: 'destino',    label: t('beneficios.table.destination'),align: 'center',field: 'destino',    style: 'width: 100px' }
];