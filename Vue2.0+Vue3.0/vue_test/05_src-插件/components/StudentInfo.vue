<template>
  <div>
    <h2>姓名：{{name}}</h2>
    <input type="text" v-fbind:value="name">
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