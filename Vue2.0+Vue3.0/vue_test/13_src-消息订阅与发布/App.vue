<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <SchoolInfo/>
    <StudentInfo/>
  </div>
</template>

<script>
    // 引入SchoolName组件
    import StudentInfo from './components/StudentInfo'
    import SchoolInfo from './components/SchoolInfo'
    // 默认暴露-直接暴露组件配置对象
    export default {
        name:'App',
        // 注册组件
        components:{StudentInfo,SchoolInfo},
        data(){
          return {
            msg:'你好啊'
          }
        },
 
    }
</script>
<style scoped>
  .app{
    background-color: gray;
    padding: 5px;
  }
</style>
