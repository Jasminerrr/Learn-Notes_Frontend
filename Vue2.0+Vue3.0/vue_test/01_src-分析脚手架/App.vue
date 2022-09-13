<template>
    <div>
        <img src="./assets/logo.png" alt="logo">
        <SchoolName></SchoolName>
        <StudentName></StudentName>
    </div>
</template>

<script>
    // 引入文件
    import SchoolName from './components/SchoolName'
    import StudentName from './components/StudentName'
    /* const school = Vue.extend({
        name:'App',
        components:{
            SchoolName,
            StudentName
        }
    })
    export default school; */
    
    // 默认暴露-直接暴露组件配置对象(简写)
    export default {
        name:'App',
        components:{
            SchoolName,
            StudentName
        }
    }
</script>
