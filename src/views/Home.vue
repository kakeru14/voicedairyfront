<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->

    <ui-textfield
      outlined
      input-type="textarea"
      rows="8"
      cols="40"
      v-model="text"
    >
      {{ recognitionText }}
    </ui-textfield>
    <div class="top-space">
      <ui-button raised class="left-space" @click="startSpeech"
        >Start</ui-button
      >
      <ui-button raised class="left-space" @click="stopSpeech">Stop</ui-button>
      <ui-button raised class="left-space" @click="routeSaveDairy">Route</ui-button>
      <ui-button raised class="left-space" @click="addDairy($event)">Save</ui-button>
    </div>
    <h2>使い方</h2>
    <h3>①STARTボタンを押して話しかける</h3>
    <h3>②長文で保存したい場合はこまめにROUTEボタンを押して一時保存</h3>
    <h3>③話し終えたらSTOPボタンで終了</h3>
    <h3>④SAVEボタンで日記を保存しよう！</h3>
    <h3></h3>
    <h3></h3>
  </div>
</template>

<script>
import { defineComponent, ref, computed} from "vue";
// import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import axios from 'axios'
import {useStore} from 'vuex'

const baseURL = 'http://voicedairy.herokuapp.com/todos'

const store = useStore()

export default defineComponent({
  name: "Home",
  components: {
    // HelloWorld,
  },
  setup() {
    // inject('vueResource')
    let text = ref("");

    const recognition = new (window).webkitSpeechRecognition();
    let recognitionText = ref("音声入力開始")
    const speech = new (window).webkitSpeechRecognition();
    speech.lang = "ja-JP";

    recognition.interimResults = true; // これこれ
    recognition.continuous = true;

    recognition.onstart = () => {
      recognitionText.value = "音声入力中...";
    };
    recognition.onend = () => {
      recognitionText.value = "音声入力開始";
    };
    recognition.onresult = (e) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = e.resultIndex; i < e.results.length; i++) {
        let transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript = transcript;
        }
        text.value = finalTranscript + interimTranscript;

      }
    };

    const startSpeech = () => {
      recognition.start();
      recognition.lang = "ja-JP";
    };

    const stopSpeech = () => {
      recognition.stop();
    };

    const clearTodo = () => {
      text.value =""
    }

    let routeText = ref("")

    const routeSaveDairy = () => {
      routeText.value += text.value
    }

    const clearRouteDairy = () => {
      routeText.value = ""
    }

    const store = useStore()

    const user = computed(() => store.getters.userInfo.email)



    const addDairy = async (e) => {

      if(store.getters.userInfo){
        const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();

      if (e) e.preventDefault();
      let dairy = {
        name: routeText.value,
        date: year + '年' + month + '月' + day + '日' + hour + ':' + minute + ':' + second,
        done: false, //false by default
        user: user.value
      };
      console.log(dairy);
      await axios
      // context.parent
        .post(baseURL, dairy)
        .then((response) => {
          clearTodo();
          clearRouteDairy();
          // this.typing = false;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        alert('ログインしてください')
      }
      
    }

    return{ startSpeech, stopSpeech,recognition, recognitionText,text,addDairy,routeSaveDairy}

   
  },
});
</script>

<style>
.top-space {
  margin-top: 50px;
}
.left-space {
  margin-left: 10px;
}
</style>
