<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带params参数-to的字符串写法(不推荐)，太乱 -->
        <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->

        <!-- 跳转路由并携带query参数-to的对象写法 -->
        <router-link :to="{
          name:'xiangqing',
          // query参数方式携带参数
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