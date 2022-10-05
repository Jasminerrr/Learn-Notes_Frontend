<template>
  <div class="container">
    <MySearch/>
    <MyList/>
  </div>
</template>

<script>
  import MySearch from './components/MySearch.vue';
  import MyList from './components/MyList.vue';
  // 默认暴露-直接暴露组件配置对象
  export default {
    name: "App",
    components: { MySearch, MyList }
  };
</script>

<style>
  

</style>