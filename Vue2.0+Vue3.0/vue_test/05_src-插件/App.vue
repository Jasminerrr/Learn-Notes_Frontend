<template>
  <div>
    <StudentInfo/>
    <hr>
    <SchoolInfo/>
    <input type="text" :value="msg" @input="msg = $event.target.value">
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
    }
</script>
