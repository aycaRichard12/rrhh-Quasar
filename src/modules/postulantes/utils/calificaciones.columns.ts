import type { QTableColumn } from 'quasar';
import { date } from 'quasar';
import type { CalificacionPostulante } from '../types/postulantes.types';

export const obtenerColumnasCalificaciones = (): QTableColumn<CalificacionPostulante>[] => [
  {
    name: 'numero',
    label: 'N°',
		align: 'left',
		field: () => '',
		style: 'width: 50px'
	},
  { 
    name: 'fecha',
		label: 'Fecha',
		align: 'left',
		field: 'fecha', 
    format: (val: string) => date.formatDate(val, 'DD/MM/YYYY HH:mm:ss') 
  },
  { name: 'actividad',
		label: 'Actividad',
		align: 'left',
		field: 'nombreactividad',
		style: 'white-space: normal'
	},
  {
		name: 'justificacion',
		label: 'Justificación',
		align: 'left',
		field: 'justificacion',
		style: 'white-space: normal'
	},
  {
		name: 'calificacion',
		label: 'Calificación',
		align: 'center',
		field: 'nota'
	},
  {
		name: 'opciones',
		label: 'Opciones',
		align: 'center',
		field: () => '',
		style: 'width: 80px'
	}
];