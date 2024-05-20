/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'js-cookie';

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}