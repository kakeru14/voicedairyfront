import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "balm-ui/dist/balm-ui.css";
// import Vue from 'vue';
import axios from 'axios';
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus';
// import vueResource from 'vue-resource'

import firebase from 'firebase'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAJ4-aQIaqml0xG4_P6mgii22PmutBESxE",
    authDomain: "voicedairy-456c5.firebaseapp.com",
    projectId: "voicedairy-456c5",
    storageBucket: "voicedairy-456c5.appspot.com",
    messagingSenderId: "768453810883",
    appId: "1:768453810883:web:c30690c4b6745e35eae076",
    measurementId: "G-C996KNGXMF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const http = axios.create({
    baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost/voiceDairy',
    // baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'https://voicedairy.herokuapp.com/',
  });
  
  console.log('MongoDB');
  const app = createApp(App)

  app.config.globalProperties.$http = http

  export default {
    install (app:any) {
      // Vueのインスタンスメソッドとしてプラグインの機能を使えるようにする
      app.config.globalProperties.$http = axios
    }
  }

  
  // Vue.prototype.$http = http;
  
  
  // Vue.config.productionTip = false;
  
  // new Vue({
  //   render: (h:any) => h(App),
  // }).$mount('#app');
  // createApp(App).mount('#app')


app.use(store).use(router).use(BalmUI).use(BalmUIPlus).mount('#app')



// createApp(App).use(BalmUI).use(BalmUIPlus).mount('#app')
