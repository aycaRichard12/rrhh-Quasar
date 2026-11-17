import type { QTableColumn } from 'quasar';
import type { Postulante } from 'src/modules/postulantes/types/postulantes.types';

export const obtenerColumnasPostulantes = (t: (key: string) => string): QTableColumn<Postulante>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 50px' },
  { name: 'nombre', label: t('Nombre'), align: 'left', field: 'nombre'},
  { name: 'apellido', label: t('Apellidos'), align: 'left', field: 'apellido'},
  { name: 'ci', label: 'CI', align: 'right', field: 'ci'},
  { name: 'fecha', label: t('Fecha'), align: 'center', field: 'fecha'},
  { 
    name: 'conclucion', 
    label: 'Conclusión', 
    align: 'left', 
    field: (row: Postulante) => row.conclucion ?? 'No se agregó conclusión',
    style: 'white-space: normal; min-width: 150px;' 
  },
  { 
    name: 'promedio', 
    label: 'Promedio', 
    align: 'right', 
    field: (row: Postulante) => Number(row.promedio || 0).toFixed(2)
  },
  { name: 'opciones', label: t('Opciones'), align: 'center', field: () => '', style: 'width: 80px' }
];