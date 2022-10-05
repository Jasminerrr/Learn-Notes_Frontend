<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 作用域插槽，也可以命名-->
    <!-- games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定 -->
    <slot :games="games">一些默认值，当使用者没有传递具体结构时，会出现</slot>
  </div>
</template>

<script>
  export default {
    name:'MyCategory',
    props:['title'],
    data(){
      return {
        games: ['红色警戒', '穿越火线', '劲舞团'],
      }
    }
  }
</script>

<style scoped>
  .category{
    background-color: skyblue;
    width: 200px;
    height: 300px;
  }
  h3{
    text-align: center;
    background-color: coral;
  }
</style>