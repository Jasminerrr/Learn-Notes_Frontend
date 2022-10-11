<template>
  <ul>
    <!-- 接收参数 -->
    <li>消息编号：{{id}}</li>
    <li>消息标题：{{title}}</li>
  </ul>
</template>

<script>
  export default {
    name:'MyDetail',
    // 接收路由的props参数,让路由组件更方便的收到参数
    props:['id','title']
  }
</script>

<style>

</style>