<template>
  <div>
    <MyCount/>
  </div>
</template>

<script>
  import MyCount from './components/MyCount.vue';
  // 默认暴露-直接暴露组件配置对象
  export default {
    name: "App",
    components: { MyCount },
  };
</script>

<style>
  .container,.foot{
    /* css3弹性布局 */
    display: flex;
    /* 主轴对齐 */
    justify-content: space-around;
  }
  img{
    width: 100%;
  }
  video{
    width: 100%;
  }
  h4{
    text-align: center;
  }
</style>
