import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { ApiError } from 'src/composables/apiError';
import { extractApiMessage } from 'src/types/extractApiMessage';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
console.log(import.meta.env.VITE_API_URL)
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, timeout: 15000 });

api.interceptors.response.use(
  (response) => response,

  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      // error del servidor (FastAPI)
      if (axiosError.response) {
        const message = extractApiMessage(axiosError.response.data);

        return Promise.reject(
          new ApiError(message, axiosError.response.status, axiosError.response.data),
        );
      }

      // error de red
      if (axiosError.request) {
        return Promise.reject(new ApiError('No se pudo conectar con el servidor'));
      }
    }

    //error desconocido
    return Promise.reject(new ApiError('Error inesperado'));
  },
);
export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
