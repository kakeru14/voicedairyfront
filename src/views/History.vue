<template>
<div>
    <!-- <ul>
        <li v-for="(dai,index) in state.mineDairy" :key="index">
            {{dai.name}}
        </li>
    </ul> -->
</div>
    
</template>

<script lang="ts">
// // import { defineComponent } from 'vue'
// import { defineComponent, ref, reactive} from "vue";
// // import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
// import axios from 'axios'
// import {useStore} from 'vuex'

// const baseURL = 'http://localhost/todos'

// export default defineComponent({
//     setup() {
//          // let dairy = shallowReactive([ ])

//     // const doneLoading = ref(false)
//     const store = useStore();

//     const state = reactive({
//       dairy:[],
//       data:[],
//       mineDairy:[],
//       doneLoading:false,

//       thead: [
    
//         '日時',
//         '履歴',
//       ],
//       tbody: [
//         'date',
//         'name',
//         {
//           slot: 'actions'
//         }
//       ],
//       selectedRows: [1, 2, 4],
//       total: 3
//     })


//     const page = ref(Math.ceil(state.mineDairy.length / 10))


//     const fetchTodo = async() => {
//         await axios.get(baseURL).then(response => {
//         console.log(response);
//         state.dairy= response.data;
//         console.log(state.dairy);

//         const MineDairy = state.dairy.filter(el => el.user == store.getters.userInfo.email)
//         console.log(MineDairy);
//         state.mineDairy = MineDairy
//       });
//     }

//     const deleteTodo = async(id,data) => {
//       await axios.delete(`http://localhost/todos/${data._id}`).then(response => {
//         fetchTodo();
//         console.log(response);
//         console.log(data._id);
//         console.log(id);
//       });
//     }

//     fetchTodo()
//     // listenToEvents();



//     return {fetchTodo,deleteTodo,state,page}
//     },
// })
</script>
