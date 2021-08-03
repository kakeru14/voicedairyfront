<template>
<div>
  <!-- <div v-bind:show="dairy.length>0" class="col align-self-center">
    <div class="form-row align-items-center center" v-for="dai in dairy" :key="dai._id">
      <div class="col-auto my-1">
        <div class="input-group mb-3 todo__row">
          <span class="input-group-prepend">
            <span class="input-group-text">
              <input
                type="checkbox"
                v-model="dai.done"
                :checked="dai.done"
                :value="dai.done"
                v-on:change="updateTodo(dai)"
                title="Mark as done?"
              />
            </span>
          </span>
          <input
            type="text"
            class="form-control"
            :class="dai.done?'todo__done':''"
            v-model="dai.name"
            @keypress="dai.editing=true"
            @keyup.enter="updateTodo(dai)"
          />
          <span class="input-group-append">
            <span class="input-group-text">
              <span
                class="input-group-addon addon-left"
                title="Delete todo?"
                v-on:click="deleteTodo(dai._id)"
              >
                削除
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div
      class="alert alert-primary todo__row"
      v-show="dairy.length==0 && doneLoading"
    >Hardest worker in the room. No more todos now you can rest.</div>
  </div> -->
  <h1>履歴</h1>
  <!-- <ul>
    <li v-for="(dai,index) in state.dairy" :key="index">
      {{dai.name}}
    </li>
  </ul> -->

  <ui-table
  v-model="state.selectedRows"
  fullwidth
  :data="state.mineDairy"
  :thead="state.thead"
  :tbody="state.tbody"
  :default-col-width="200"
  :scroll="{ x: 1600, y: 300 }"
  style="max-width: 100%"
  row-checkbox
  selected-key="_id"
  class="max20"
>
  <!-- <template #th-dessert>
    Dessert
    <ui-icon v-tooltip="'100g serving'" aria-describedby="th-cell-1">
      error_outline
    </ui-icon>
  </template> -->
  <!-- <template #dessert="{ data }">
    <div class="dessert">{{ data.dessert }}</div>
  </template> -->
  <template #actions="{ data }">
    <!-- <ui-icon @click="show(data)">description</ui-icon>
    <ui-icon @click="show(data)">edit</ui-icon> -->
    <!-- <ui-icon @click="show(data)">delete</ui-icon> -->
    <ui-icon @click="deleteTodo(_id,data)">delete</ui-icon>
    <router-link :to="{ name:'HistoryDiscription',params:{dairy_id:data._id}}">
      <ui-icon>description</ui-icon>
    </router-link>
  </template>

  <ui-pagination
    v-model="page"
    :total="state.mineDairy.length"
    
  ></ui-pagination>
</ui-table>
</div>
  
</template>

<script>


import { defineComponent , reactive, ref, computed } from 'vue'
// import bus from "./../bus.js";
import axios from "axios"
import {useStore} from 'vuex'
import {useRoute,useRouter} from 'vue-router'

const baseURL = 'https://voicedairyfront.herokuapp.com'
console.log('asasasa');
// const deleteURL = 'http://localhost'

export default defineComponent({
  setup() {

    // let dairy = shallowReactive([ ])

    // const doneLoading = ref(false)
    const store = useStore();
    // const route = useRoute()
    // const router = useRouter()


    const state = reactive({
      dairy:[],
      data:[],
      mineDairy:[],
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
        await axios.get(baseURL).then(response => {
        console.log(response);
        state.dairy= response.data;
        console.log(state.dairy);

        const MineDairy = state.dairy.filter(el => el.user == store.getters.userInfo.email)
        console.log(MineDairy);
        state.mineDairy = MineDairy
      });
    }

    // const routing = () => {
    //   router.push({name:"HistoryDiscription",params:{dairy_id}})
    // }

    const updateTodo = (todo) => {
      let id = todo._id;
      // this.$http
      axios
        .put(baseURL`/${id}`, todo)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }

    // const baseURL = 'http://localhost/todos'

    const deleteTodo = async(id,data) => {
      await axios.delete(`http://localhost/todos/${data._id}`).then(response => {
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

    const addDairy = (e) => {
      if (e) e.preventDefault();
      let todo = {
        name: this.name,
        done: false //false by default
      };
      console.log(todo);
      // this.$http
      axios
        .post(baseURL, todo)
        .then(response => {
          this.clearTodo();
          this.refreshTodo();
          this.typing = false;
          console.log(response);
          console.log(this.$http);
        })
        .catch(error => {
          console.log(error);
        });
    }

    computed(fetchTodo())
    // listenToEvents();



    return {fetchTodo,updateTodo,deleteTodo,addDairy,state,page}
  },
})
</script>




<style lang="scss" scoped>
.todo__done {
  text-decoration: line-through !important;
}

.no_border_left_right {
  border-left: 0px;
  border-right: 0px;
}

.flat_form {
  border-radius: 0px;
}

.mrb-10 {
  margin-bottom: 10px;
}

.addon-left {
  background-color: none !important;
  border-left: 0px !important;
  cursor: pointer !important;
}

.addon-right {
  background-color: none !important;
  border-right: 0px !important;
}
.center {
    text-align: center;
}
// .max20 {
//   display: block;
//   width: 100%;
//   font-family: "Courier New", Consolas, monospace;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   overflow: hidden;
// }
</style>
