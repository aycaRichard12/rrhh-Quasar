import type { QTableColumn } from 'quasar';
import type { FuncionYObligacion } from '../types/funcionesYObligaciones.types';

export const obtenerColumnasFuncionesYObligaciones = (
  t: (key: string) => string
): QTableColumn<FuncionYObligacion>[] => {
  return [
    {
      name: 'numero',
      label: t('N°'),
      align: 'center',
      field: () => '',
      sortable: false
    },
    {
      name: 'nombre',
      label: t('Función u Obligación'),
      align: 'left',
      field: row => row.nombre,
      sortable: true
    },
    {
      name: 'descripcion',
      label: t('Descripción'),
      align: 'left',
      field: row => row.descripcion,
      sortable: true
    },
    {
      name: 'cargo',
      label: t('Cargo'),
      align: 'left',
      field: row => row.cargo ?? '',
      sortable: true
    },
    {
      name: 'opciones',
      label: t('Opciones'),
      align: 'center',
      field: () => '',
      sortable: false
    }
  ];
};