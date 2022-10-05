<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="keyWord" />&nbsp;
      <button @click="searchUsers" >Search</button>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import pubsub from 'pubsub-js';
  export default {
    name: 'MySearch',
    data(){
      return {
        keyWord:''
      }
    },
    methods:{
      searchUsers(){
        // 在发请求前更新MyList得数据
        pubsub.publish('updateListData',{isFirst:false,isLoading:true,errMsg:'',users:[]})
        axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
          response => {
            console.log('请求成功了');
            // 当请求成功时，触发事件 response.data.items：用户信息
            pubsub.publish('updateListData',{isLoading:false,errMsg:'',users:response.data.items})
          },
          error => {
            // 请求失败后 更新MyList的数据
            pubsub.publish('updateListData',{isLoading:false,errMsg:'',users:[]})
          }
        )
      },
    }
  }
</script>

<style>

</style>