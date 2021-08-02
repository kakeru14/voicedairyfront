<template>
<div>
    <h1>サインアップ</h1>
    <div>
      <ui-textfield outlined v-model="state.name">
    Your Name
    </ui-textfield>
    </div>
    <div>
      <ui-textfield
    v-model="state.mail"
  >
    Email Address
  </ui-textfield>
    </div>
    <div class="center">
      <ui-textfield
      v-model="state.password"
  input-type="password"
  required
  pattern=".{8,}"
  helper-text-id="pw-validation-msg"
  :attrs="{autocomplete: 'current-password'}"
>
  Choose password
</ui-textfield>


    </div>
    <ui-button raised @click="createUser()">登録</ui-button>
</div>   
</template>


<script lang="ts">
import { defineComponent, reactive} from "vue";
import axios from "axios"
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'

const baseURL = 'http://localhost/users'

export default defineComponent({
    name: "Login",
    setup() {

      const router = useRouter()
      const store = useStore();

        const state = reactive({
            name:"",
            mail:"",
            password:""
        })

        const fetchUser = async() => {
          await axios.post(`${baseURL}/fetch-user`).then((response:any) => {
        console.log('fetchだよ',response);
        
      });
        }

        const createUser = async() => {

          let user = {
        username: state.name,
        mail: state.mail,
        password: state.password,
      };

          await axios.post(`${baseURL}/create-user`,user).then((response:any) => {
        console.log(response);
        console.log(state.name)
        console.log(user);

        store.dispatch("setLoginUser",user)
        state.name = ""
        state.mail = ""
        state.password = ""

        console.log('ログイン状況',store.getters.userInfo);

        // this.$router.push({name:"Home"})
        
        router.push({name:"Home"})
        
      });
        }

        fetchUser();

        return {state,fetchUser,createUser}
    },
})
</script>

<style>
.center {
  text-align: center;
  margin: 0 auto;
}
</style>
