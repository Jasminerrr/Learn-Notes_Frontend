<template>
  <div>
    <MyCount/>
    <br>
    <MyPerson/>
  </div>
</template>

<script>
  import MyCount from './components/MyCount';
  import MyPerson from './components/MyPerson';
  // 默认暴露-直接暴露组件配置对象
  export default {
    name: "App",
    components: { MyCount,MyPerson},
    mounted(){
      // console.log('App',this);
    }
  };
</script>

