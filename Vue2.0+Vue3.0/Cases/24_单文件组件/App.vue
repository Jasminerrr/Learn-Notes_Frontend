<template>
    <div>
        <School></School>
        <Student></Student>
    </div>
</template>

<script>
    // 引入文件
    import School from './School'
    import Student from './Student'
    // 导出文件
    export default {
        name:'App',
        components:{
            School,
            Student
        }
    }
</script>
