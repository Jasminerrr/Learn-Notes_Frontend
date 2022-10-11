<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带query参数-to的字符串写法(不推荐)，太乱 -->
        <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->

        <!-- 跳转路由并携带query参数-to的对象写法(推荐) -->
        <router-link :to="{
          // path:'/home/message/detail',

          // 命名路由可以简化路由的跳转
          name:'xiangqing',
          // query方式携带参数
          query:{
            id:m.id,
            title:m.title
          }
        }">
          {{m.title}}
        </router-link>
      </li>
    </ul>
    <br>
    <router-view> </router-view>
  </div>
</template>

<script>
  export default {
    name:'MyMessage',
    data(){
      return {
        messageList:[
          {id:'001',title:'消息1'},
          {id:'002',title:'消息2'},
          {id:'003',title:'消息3'},
        ]
      }
    }

  }
</script>

<style>

</style>