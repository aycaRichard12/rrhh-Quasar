import { ref, computed } from 'vue';

export interface ConfiguracionColumnaExcel {
campo: string;
titulo: string;
tipoDato?: 'texto' | 'numero' | 'estado';
esFiltrable?: boolean; // Propiedad nueva
}

/**
* useFiltroExcel - Ahora acepta T extends object para ser compatible con interfaces.
*/
export function useFiltroExcel<T extends object>(
  datosOriginales: T[],
  configuracion: ConfiguracionColumnaExcel[]
  ) {
    const filtrosActivos = ref<Record<string, string[]>>({});
   
    const valoresUnicosPorColumna = computed(() => {
      const mapaValores: Record<string, (string | number)[]> = {};
   
      configuracion.forEach((col) => {
        if (col.esFiltrable === false) {
          mapaValores[col.campo] = [];
          return;
        }
        // Usamos aserción a Record solo para el acceso dinámico interno
        const unicos = new Set(
          datosOriginales.map((item) =>
            String((item as Record<string, unknown>)[col.campo])
          )
      );
      mapaValores[col.campo] = Array.from(unicos).sort();
    });
  
    return mapaValores;
  });

  const datosFiltrados = computed(() => {
    return datosOriginales.filter((fila) => {
      return Object.keys(filtrosActivos.value).every((campo) => {
        const seleccionados = filtrosActivos.value[campo];
        if (!seleccionados || seleccionados.length === 0) return true;
        return seleccionados.includes(String((fila as Record<string, unknown>)[campo]));
      });
    });
  });
   
  return {
    filtrosActivos,
    valoresUnicosPorColumna,
    datosFiltrados
  };
}