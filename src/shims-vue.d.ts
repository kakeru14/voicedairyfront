/* eslint-disable */

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'axios';
declare module 'vue';
declare module 'balm-ui';
declare module 'balm-ui/dist/balm-ui-plus';



declare module "@vue/runtime-core" {
  import { ComponentCustomProperties } from "vue";
  interface ComponentCustomProperties {
    $http: typeof void;
  }
}