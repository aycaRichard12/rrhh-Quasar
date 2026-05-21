/**
 * Convierte un objeto de datos (Payload) a un formato FormData aceptado por la API.
 * Ignora automáticamente los valores nulos o indefinidos.
 * * @param formData El objeto FormData donde se inyectarán los datos
 * @param datos El objeto con la información a enviar. Usamos 'unknown' por tipado estricto.
 */
export function appendFormData(formData: FormData, datos: Record<string, unknown>): void {
  Object.entries(datos).forEach(([key, value]) => {
    // 1. Omitimos la fila entera si el valor es undefined o null
    if (value !== undefined && value !== null) {
      
      if (value instanceof Blob) {
        // 2. Es un archivo físico (Blob o File), se envía tal cual
        formData.append(key, value);
      } else if (typeof value === 'object') {
        // 3. Si es un objeto o array, lo convertimos a JSON para evitar el error "[object Object]"
        formData.append(key, JSON.stringify(value));
      } else {
        // 4. Si es un tipo primitivo seguro (string, number, boolean), ESLint ya sabe 
        // que String() funcionará perfectamente sin arrojar "[object Object]".
        formData.append(key, String(value));
      }
      
    }
  });
}