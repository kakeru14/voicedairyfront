<template>
<div>
    <h1>ログイン</h1>
    <ui-textfield outlined v-model="state.name">
    Your Name
    </ui-textfield>
    <ui-textfield
    v-model="state.mail"
  >
    Email Address
  </ui-textfield>
</div>   
</template>

<script>
import { defineComponent, reactive} from "vue";

export default defineComponent({
    name: "Login",
    setup() {
        const state = reactive({
            name:"",
            mail:""
        })

        return {state}
    },
})
</script>