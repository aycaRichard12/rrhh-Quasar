import { ref, computed, toValue, type MaybeRefOrGetter } from 'vue';
import { date } from 'quasar';

export interface ConfiguracionColumnaExcel {
  campo: string;
  titulo: string;
  tipoDato?: 'texto' | 'numero' | 'estado' | 'cadena' | 'fecha' | 'booleano';
  esFiltrable?: boolean;
  opciones?: Record<string | number, string>; // Mapeo de valores (ej: { 1: 'Activo' })
  format?: (val: unknown) => string | number; // Función para formatear el valor para visualización y filtrado
}

/** * useFiltroExcel - Maneja filtrado y ordenamiento tipo Excel para tablas. */

export function useFiltroExcel<T extends object>( datosOriginales: MaybeRefOrGetter<T[]>, configuracion: ConfiguracionColumnaExcel[] ) {
  const filtrosActivos = ref<Record<string, string[]>>({});
  const orden = ref<{ campo: string; sentido: 'asc' | 'desc' | null }>({ campo: '',sentido: null, });

  const valoresUnicosPorColumna = computed(() => {
    const datos = toValue(datosOriginales);
    const mapaValores: Record<string, (string | number)[]> = {};
    configuracion.forEach((col) => {
      if (col.esFiltrable === false) {
        mapaValores[col.campo] = [];
        return;
      }
      const unicos = new Set( datos.map((item) => {
        const val = (item as Record<string, unknown>)[col.campo];
        if (col.format)
          return col.format(val);
        if (val instanceof Date)
          return date.formatDate(val, 'DD/MM/YYYY');
        return val as string | number;
      }));
    
      mapaValores[col.campo] = Array.from(unicos).sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number')
          return a - b;
        return String(a).localeCompare(String(b));
      });
    });
    return mapaValores;
  });
  
  const datosFiltrados = computed(() => { let datos = [...toValue(datosOriginales)];
    // 1. Filtrado
    datos = datos.filter((fila) => {
      return Object.keys(filtrosActivos.value).every((campo) => {
        const seleccionados = filtrosActivos.value[campo]; if (!seleccionados || seleccionados.length === 0) return true;
        const col = configuracion.find(c => c.campo === campo);
        const valFila = (fila as Record<string, unknown>)[campo];
        let valProcesado: string | number; if (col?.format) { valProcesado = col.format(valFila); } else if (valFila instanceof Date) { valProcesado = date.formatDate(valFila, 'DD/MM/YYYY'); } else { valProcesado = String(valFila); } return seleccionados.includes(String(valProcesado));
      });
    });
    // 2. Ordenamiento
    if (orden.value.campo && orden.value.sentido) {
      const { campo, sentido } = orden.value; datos.sort((a, b) => {
        const valA = (a as Record<string, unknown>)[campo];
        const valB = (b as Record<string, unknown>)[campo];
        if (valA === valB)
          return 0;
          let resultado = 0;
        if (typeof valA === 'number' && typeof valB === 'number') {
          resultado = valA - valB;
        } else {
          resultado = String(valA).localeCompare(String(valB));
        }
        return sentido === 'asc' ? resultado : -resultado;
      });
    }
    return datos;
  });

  const establecerOrden = (campo: string, sentido: 'asc' | 'desc' | null) => {
    orden.value = { campo, sentido };
  };

  const limpiarFiltrosColumna = (campo: string) => {
    if (filtrosActivos.value[campo]) {
      delete filtrosActivos.value[campo];
    }
    if (orden.value.campo === campo) {
      orden.value = { campo: '', sentido: null };
    }
  };
  
  return {
    filtrosActivos, valoresUnicosPorColumna, datosFiltrados, orden,
    establecerOrden, limpiarFiltrosColumna,
  };
}