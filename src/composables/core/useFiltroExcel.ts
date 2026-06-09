import { ref, computed } from 'vue';
import type { Ref } from 'vue';

export interface CondicionFiltro {
  operador: string;
  texto: string;
}

export interface FiltroConfig {
  modo: 'valores' | 'condiciones';
  valores?: unknown[];
  condicion?: CondicionFiltro;
}

// Magia Senior: Usamos un genérico 'T extends object' para que acepte cualquier interfaz (Beneficio, Area, etc.)
export function useFiltroExcel<T extends object>(listaOriginal: Ref<T[]>) {
  const filtrosActivos = ref<Record<string, FiltroConfig>>({});

  const aplicarFiltroColumna = (columna: string, config: FiltroConfig) => {
    filtrosActivos.value[columna] = config;
  };

  const limpiarFiltroColumna = (columna: string) => {
    delete filtrosActivos.value[columna];
  };

  const listaFiltrada = computed(() => {
    return listaOriginal.value.filter((fila) => {
      return Object.entries(filtrosActivos.value).every(([campo, config]) => {
        // 1. SOLUCIÓN: Verificamos que config exista para evitar 'possibly undefined'
        if (!config) return true; 

        // 2. SOLUCIÓN: Le decimos a TS que fila puede ser accedida dinámicamente
        const valorCelda = (fila as Record<string, unknown>)[campo];
        
        // 3. SOLUCIÓN: Evitamos el '[object Object]' usando JSON.stringify si es un objeto
        let valorStr = '';
        if (valorCelda !== null && valorCelda !== undefined) {
            valorStr = typeof valorCelda === 'object' 
            ? JSON.stringify(valorCelda).toLowerCase() 
            : String(valorCelda as string | number | boolean).toLowerCase();
        }

        if (config.modo === 'valores' && config.valores) {
          return config.valores.includes(valorCelda);
        }

        if (config.modo === 'condiciones' && config.condicion) {
          const textoBuscado = config.condicion.texto.toLowerCase();
          if (!textoBuscado) return true;

          switch (config.condicion.operador) {
            case 'Contiene': return valorStr.includes(textoBuscado);
            case 'Es igual a': return valorStr === textoBuscado;
            case 'Empieza con': return valorStr.startsWith(textoBuscado);
            case 'Termina con': return valorStr.endsWith(textoBuscado);
            default: return true;
          }
        }
        return true;
      });
    });
  });

  return {
    filtrosActivos,
    aplicarFiltroColumna,
    limpiarFiltroColumna,
    listaFiltrada
  };
}