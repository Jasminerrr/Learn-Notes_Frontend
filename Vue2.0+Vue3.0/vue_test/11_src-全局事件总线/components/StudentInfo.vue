<template>
  <div class="student">
    <h2>姓名：{{name}}</h2>
    <button @click="sendStudent">点我传数据给school</button>
  </div>
</template>

<script>
  export default {
    name:'StudentInfo',
    data() {
        return {
          name:'张三',
        }
    },
    methods:{
      sendStudent(){
        this.$bus.$emit('hello',this.name)
      }
    }
  }
</script>

<style scoped>
  .student{
    background-color:red;
    padding: 4px;
    margin: 20px;
  }
</style>