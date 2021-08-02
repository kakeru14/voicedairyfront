<template>
    <div>
        <h1>日記の詳細画面</h1>
        <h2>{{state.dairyDiscription.date}}</h2>
        <div class="space"></div>
        <div class="name">
            <h2>{{state.dairyDiscription.name}}</h2>
        </div>

        <!-- <table>
            <tr>
                <th>日時</th>
                <th>内容</th>
            </tr>
            <tr>
                <td>{{state.dairyDiscription.date}}</td>
                <div class="space"></div>
                <td>{{state.dairyDiscription.name}}</td>
            </tr>
        </table> -->
    </div>
</template>

<script lang="ts">
import { defineComponent , reactive, ref } from 'vue'
// import bus from "./../bus.js";
import axios from "axios"
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

const baseURL = 'http://localhost/todos'
// const deleteURL = 'http://localhost'

export default defineComponent({
  setup() {

    // let dairy = shallowReactive([ ])

    // const doneLoading = ref(false)
    const store = useStore();
    const route = useRoute()
    // const router = useRouter()


    const state = reactive({
      dairy:[],
      data:[],
      mineDairy:[],
      dairyDiscription:{},
      doneLoading:false,

      thead: [
        '日時',
        '履歴',
      ],
      tbody: [
        {
          field: 'date',
          width:200
        },
        {
          field: 'name',
          width:1000
        },
        {
          slot: 'actions',
          fixed:'right',
        }
      ],
      selectedRows: [1, 2, 4],
      total: 3
    })

    // const mineDairy = state.dairy
    // // .filter(el => el.user == "bbb")

    // console.log(mineDairy);
    // console.log(state.dairy);

    const page = ref(Math.ceil(state.mineDairy.length / 10))


    const fetchTodo = async() => {
        await axios.get(baseURL).then((response:any) => {
        console.log(response);
        state.dairy= response.data;
        console.log('all',state.dairy);

        const MineDairy = state.dairy.filter((el:any) => el.user == store.getters.userInfo.email)
        console.log('mine',MineDairy);
        state.mineDairy = MineDairy

        MineDairy.forEach((el:any) => {
            if(el._id === route.params.dairy_id){
                state.dairyDiscription = el
            }
        })

        console.log('詳細',state.dairyDiscription);
        

        console.log('params',route.params);
        
        

        // state.dairyDiscription = target

      });
    }

    // const routing = () => {
    //   router.push({name:"HistoryDiscription",params:{dairy_id}})
    // }

    // const baseURL = 'http://localhost/todos'

    const deleteTodo = async(id:string,data:any) => {
      await axios.delete(`http://localhost/todos/${data._id}`).then((response:any) => {
        fetchTodo();
        console.log(response);
        console.log(data._id);
        console.log(id);
      });
    }

    // const listenToEvents = () => {
    //   bus.$on("refreshTodo", $event => {
    //     fetchTodo(); //update todo
    //     console.log($event);
    //   });
    // }



   fetchTodo()
    // listenToEvents();



    return {fetchTodo,deleteTodo,state,page}
  },
})
</script>

<style>
.space {
    padding: 30px;
}
.name {
    width: 50%;
    text-align: center;
    padding-left: 25%;
}
</style>
