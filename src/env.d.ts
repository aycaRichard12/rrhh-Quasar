/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}


interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_URLMS: string;
  readonly VITE_URL_AUTH: string;
  readonly VITE_X_APP_TOKEN: string;
  readonly VITE_URL_APICM: string;
  readonly VITE_URL_APIC: string;
  readonly VITE_URL_APIP: string;
  readonly VITE_URL_APIR: string;
  readonly VITE_URL_APIE: string;
  readonly VITE_URL_APIA: string;
  readonly VITE_URL_APIAF: string;
  readonly VITE_URL_APIPANEL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
