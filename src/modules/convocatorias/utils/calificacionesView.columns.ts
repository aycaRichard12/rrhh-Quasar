import type { QTableColumn } from 'quasar';
import type { MetodoEvaluacionResumen } from '../types/convocatorias.types';

export const obtenerColumnasCalificaciones = (): QTableColumn<MetodoEvaluacionResumen>[] => [
  { name: 'numero', label: 'N°', align: 'right', field: () => '', style: 'width: 50px' },
  { name: 'metodo', label: 'Método', align: 'left', field: 'metodo'},
  { name: 'descripcion', label: 'Descripción', align: 'left', field: 'descripcion', style: 'white-space: normal; min-width: 250px;' },
  { name: 'estado', label: 'Conclusión / Máx. Permitida', align: 'left', field: 'estado' },
  { name: 'promedio', label: 'Calificación', align: 'right', field: 'promedio'},
  { name: 'opciones', label: 'Opciones', align: 'center', field: () => '', style: 'width: 80px' }
];