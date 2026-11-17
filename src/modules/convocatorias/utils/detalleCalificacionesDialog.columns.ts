import type { QTableColumn } from 'quasar';
import type { CalificacionPostulante } from '../../postulantes/types/postulantes.types';

// Pasamos la calificación máxima como parámetro para armar el título dinámico
export const obtenerColumnasDetalle = (maxPermitida: number): QTableColumn<CalificacionPostulante>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 50px' },
  { name: 'fechahora', label: 'Fecha y Hora', align: 'center', field: 'fecha'},
  { name: 'actividad', label: 'Actividad', align: 'left', field: 'nombreactividad', style: 'white-space: normal;' },
  { name: 'justificacion', label: 'Justificación', align: 'left', field: 'justificacion', style: 'white-space: normal;' },
  { name: 'puntaje', label: `Puntaje / ${maxPermitida}`, align: 'right', field: 'nota'}
];