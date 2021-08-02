import { createStore } from 'vuex'
import firebase from 'firebase'

export default createStore({
  state: {
    userInfo:null
  },
  getters: {
    userInfo:(store:any) => {
      return store.userInfo
    },
    userName:(store:any) => {
      store.userInfo ? store.userInfo.displayName : ''
    },
    photoUrl:(store:any) => {
      store.userInfo ? store.userInfo.photoURL : ''
    },
  },
  mutations: {
    setLoginUser(state,user){
      state.userInfo = user
    },
    deleteLoginUser(state){
      state.userInfo = null
    }
  },
  actions: {
    setLoginUser({commit},user){
      commit('setLoginUser',user)
    },
    deleteLoginUser({commit}){
      commit('deleteLoginUser')
    },
    login(){
      const google = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google)
    },
    logout() {
      firebase.auth().signOut()
    }
  },
  modules: {
  }
})
