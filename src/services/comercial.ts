import axios from 'axios';

const url = import.meta.env.VITE_URL_APICM;

const api_cm = axios.create({
  baseURL: url,
  headers: {
    
    'Content-Type': 'application/json'
  }
});

api_cm.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // 1. Si ya es una instancia de Error (incluye AxiosError), lo rechazamos directamente
    if (error instanceof Error) {
      return Promise.reject(error);
    }

    // 2. Si es un error de red u otro tipo de objeto que no hereda de Error, 
    // lo convertimos en uno para satisfacer al Linter y a la trazabilidad
    return Promise.reject(new Error(String(error) || 'Error desconocido en el servidor industrial'));
  }
);

export default api_cm;