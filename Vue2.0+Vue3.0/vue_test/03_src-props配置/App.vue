<template>
  <div>
    <StudentInfo name="张三" sex="男" :age="18"/>   
  </div>
</template>

<script>
    // 引入SchoolName组件
    import StudentInfo from './components/StudentInfo'
    // 默认暴露-直接暴露组件配置对象
    export default {
        name:'App',
        // 注册组件
        components:{StudentInfo},
    }
</script>
