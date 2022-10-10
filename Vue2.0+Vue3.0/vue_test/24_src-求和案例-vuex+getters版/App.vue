<template>
  <div>
    <MyCount/>
  </div>
</template>

<script>
  import MyCount from './components/MyCount';
  // 默认暴露-直接暴露组件配置对象
  export default {
    name: "App",
    components: { MyCount },
    mounted(){
      console.log('App',this);
    }
  };
</script>

