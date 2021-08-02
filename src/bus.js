// import Vue from 'vue';
import App from './App.vue'
import { createApp } from 'vue'

// const app = createApp(App)

const bus = createApp(App)
bus.mount('#app')
export default bus;