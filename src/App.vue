<template>
  <div id="nav">
    <ui-top-app-bar type="1" id="header">
      VoiceDairy
      <span id="header-menu">
        <router-link to="/" class="header-left">Home</router-link> |
        <router-link to="/about" class="header-left">History</router-link> |
        <!-- <router-link to="/history" class="header-left">History2</router-link> | -->
        <!-- <router-link v-show="!$store.getters.userInfo" to="/signin" class="header-left">SignUp</router-link> -->
        <ui-button v-show="$store.getters.userInfo" raised @click="logout()">ログアウト</ui-button>
        <ui-button v-show="!$store.getters.userInfo" raised @click="login()">ログイン</ui-button>
      </span>
      <span id="header-name">
        <span v-if="$store.getters.userInfo">{{$store.getters.userInfo.displayName}}さんこんにちは！</span>
        <span v-else>ゲストさんこんにちは！</span>
        <!-- <img v-show="$store.getters.userInfo" :src="$store.getters.userInfo.photoURL"> -->
      </span>
    </ui-top-app-bar>
    <div id="body">

    <router-view/>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent } from 'vue'
import {useStore} from 'vuex'
import firebase from 'firebase'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {

    const store = useStore()
    const router = useRouter()

    // const setLoginUser = () => {
    //   if(store.getters.userInfo){
    //     console.log('ログイン中です'); 
    //   }else{
    //     console.log('ログアウト中です');
        
    //   }
    // }

    // setLoginUser();

    const deleteLoginUser = () => {
      store.dispatch('deleteLoginUser')

      console.log('ログアウトできてる？',store.getters.userInfo);
      
    }

    const login = () => {
      store.dispatch('login')
      router.push({name:"Home"})
    }

    const logout = () => {
      store.dispatch('logout')
      router.push({name:"Home"})
    }

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        store.dispatch('setLoginUser',user)
      }else{
        store.dispatch('deleteLoginUser')
      }
    })

    console.log('user',store.getters.userInfo);
    

    return {deleteLoginUser,login,logout}
    
  },
})
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#header {
  position: fixed;
  top:0;
  margin:0;
  padding:4px;
  width:100%;
  z-index:10;
  left:0;
}

#body {
  margin-top: 50px;
}

.header-left {
  margin-right: 20px;

}

#header-menu {
  text-align:right;
}

#header-name {
  text-align:center;
  float:right;
  display:flex;
  flex-direction: column;
   margin-left: 600px;
}

img {
  width: 20px;
  height: 20px;
}

</style>
