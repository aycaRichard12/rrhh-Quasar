import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { ApiError } from 'src/composables/apiError';
import { extractApiMessage } from 'src/types/extractApiMessage';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
    $apims: AxiosInstance; ////////api mistersoft
  }
}

// Extendemos el config de axios para poder guardar el contador de reintentos
interface RetryConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 800; // espera entre reintentos (ms)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Decide si vale la pena reintentar: errores de red o 5xx del servidor
function shouldRetry(error: AxiosError): boolean {
  // Sin response = error de red / timeout / host caído
  if (!error.response) return true;

  // Error de servidor (500, 502, 503, 504, etc.)
  if (error.response.status >= 500) return true;

  return false;
}

// Factory para no repetir el mismo interceptor dos veces (api y apims)
function attachRetryInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const config = axiosError.config as RetryConfig | undefined;

        if (config && shouldRetry(axiosError)) {
          config._retryCount = config._retryCount ?? 0;

          if (config._retryCount < MAX_RETRIES) {
            config._retryCount += 1;

            console.warn(
              `Reintentando petición (${config._retryCount}/${MAX_RETRIES}) -> ${config.url}`,
            );

            await delay(RETRY_DELAY_MS);
            return instance(config); // vuelve a intentar la misma petición
          }
        }

        // Ya se agotaron los reintentos (o no aplica reintento) -> manejamos el error como antes
        if (axiosError.response) {
          const message = extractApiMessage(axiosError.response.data);
          return Promise.reject(
            new ApiError(message, axiosError.response.status, axiosError.response.data),
          );
        }

        if (axiosError.request) {
          return Promise.reject(new ApiError('No se pudo conectar con el servidor'));
        }
      }

      return Promise.reject(new ApiError('Error inesperado'));
    },
  );
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
console.log(import.meta.env.VITE_API_URL);
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, timeout: 15000 });
attachRetryInterceptor(api);

///////////////////////Api MisterSoft en paralelo//////////////

console.log(import.meta.env.VITE_API_URLMS);
const apims = axios.create({ baseURL: import.meta.env.VITE_API_URLMS, timeout: 15000 });
attachRetryInterceptor(apims);

////////////////////////////////////////////////////////////////

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$apims = apims;
});

export { api, apims };







///////////////////////////////////////////////////////////////////////////



// import { defineBoot } from '#q-app/wrappers';
// import axios, { type AxiosInstance, type AxiosError } from 'axios';
// import { ApiError } from 'src/composables/apiError';
// import { extractApiMessage } from 'src/types/extractApiMessage';

// declare module 'vue' {
//   interface ComponentCustomProperties {
//     $axios: AxiosInstance;
//     $api: AxiosInstance;
//     $apims: AxiosInstance; ////////api mistersoft
//   }
// }

// // Be careful when using SSR for cross-request state pollution
// // due to creating a Singleton instance here;
// // If any client changes this (global) instance, it might be a
// // good idea to move this instance creation inside of the
// // "export default () => {}" function below (which runs individually
// // for each client)
// console.log(import.meta.env.VITE_API_URL)
// const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, timeout: 15000 });

// api.interceptors.response.use(
//   (response) => response,

//   (error: unknown) => {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;

//       // error del servidor (FastAPI)
//       if (axiosError.response) {
//         const message = extractApiMessage(axiosError.response.data);

//         return Promise.reject(
//           new ApiError(message, axiosError.response.status, axiosError.response.data),
//         );
//       }

//       // error de red
//       if (axiosError.request) {
//         return Promise.reject(new ApiError('No se pudo conectar con el servidor'));
//       }
//     }

//     //error desconocido
//     return Promise.reject(new ApiError('Error inesperado'));
//   },
// );

// ///////////////////////Api MisterSoft en paralelo//////////////

// console.log(import.meta.env.VITE_API_URLMS)
// const apims = axios.create({ baseURL: import.meta.env.VITE_API_URLMS, timeout: 15000 });

// apims.interceptors.response.use(
//   (response) => response,

//   (error: unknown) => {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;

//       // error del servidor (FastAPI)
//       if (axiosError.response) {
//         const message = extractApiMessage(axiosError.response.data);

//         return Promise.reject(
//           new ApiError(message, axiosError.response.status, axiosError.response.data),
//         );
//       }

//       // error de red
//       if (axiosError.request) {
//         return Promise.reject(new ApiError('No se pudo conectar con el servidor'));
//       }
//     }

//     //error desconocido
//     return Promise.reject(new ApiError('Error inesperado'));
//   },
// );
// ////////////////////////////////////////////////////////////////

// export default defineBoot(({ app }) => {
//   // for use inside Vue files (Options API) through this.$axios and this.$api

//   app.config.globalProperties.$axios = axios;
//   // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
//   //       so you won't necessarily have to import axios in each vue file

//   app.config.globalProperties.$api = api;
//   // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
//   //       so you can easily perform requests against your app's API
//   app.config.globalProperties.$apims = apims;
// });

// export { api, apims };