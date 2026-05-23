/**
 * Tipado estricto para los valores aceptados en un formulario con soporte de archivos (PDF, imágenes, etc.)
 */
export type ValorFormulario = string | number | boolean | File | Blob | null | undefined;

/**
 * Convierte un objeto de datos plano o con archivos en un objeto FormData limpio y tipado.
 * @param datos Objeto con los datos recolectados del formulario de la vista.
 * @returns FormData listo para ser enviado a los servicios de la API mediante Axios.
 */
export function prepararDatosFormulario(datos: Record<string, ValorFormulario | ValorFormulario[]>): FormData {
  const datosFormulario = new FormData();

  Object.entries(datos).forEach(([llave, valor]) => {
    // 1. Ignorar por completo valores nulos o indefinidos
    if (valor === undefined || valor === null) {
      return;
    }

    // 2. Si el valor es un Arreglo (ej. IDs múltiples o listas de archivos de Quasar)
    if (Array.isArray(valor)) {
      valor.forEach((elemento) => {
        if (elemento !== null && elemento !== undefined) {
          if (elemento instanceof File || elemento instanceof Blob) {
            datosFormulario.append(llave, elemento);
          } else {
            // Usamos String() de forma segura porque garantizamos que es primitivo
            datosFormulario.append(llave, String(elemento));
          }
        }
      });
      return;
    }

    // 3. Si el valor es un Archivo nativo (PDF, PNG, etc.) o un Blob binario
    if (valor instanceof File || valor instanceof Blob) {
      datosFormulario.append(llave, valor);
      return;
    }

    // 4. Para datos primitivos seguros (string, number, boolean)
    // Al evaluar los casos anteriores, TypeScript sabe al 100% que aquí no hay objetos
    datosFormulario.append(llave, String(valor));
  });

  return datosFormulario;
}