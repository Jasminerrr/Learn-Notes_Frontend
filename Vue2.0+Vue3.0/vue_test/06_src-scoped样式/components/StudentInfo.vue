<template>
  <div class="demo">
    <h2>姓名：{{name}}</h2>
  </div>
</template>

<script>
  export default {
    name:'StudentInfo',
    data() {
        return {
          name:'张三'
        }
    }
  }
</script>

<style scoped>
  .demo{
    background-color:red;
  }
</style>