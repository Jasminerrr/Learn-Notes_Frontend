<template>
  <div>
    <h2 class="demo">学校：{{name}}</h2>
  </div>
</template>

<script>
  export default {
      name:'SchoolInfo',
      data() {
          return {
            name:'尚硅谷',
          }
      },
  }
</script>

<style scoped>
  .demo{
    background-color: cornflowerblue;
  }
</style>