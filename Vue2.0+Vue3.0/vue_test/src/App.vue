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
    // 导出文件
    export default {
        name:'App',
        components:{
            SchoolName,
            StudentName
        }
    }
</script>
