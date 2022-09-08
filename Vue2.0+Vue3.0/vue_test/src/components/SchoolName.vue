<!-- 组件的结构 -->
<template>
<div class="demo">
    <h2>学校名字：{{ schoolName }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click = "showName">点我提示学校</button>
</div>
</template>

<!-- 组件交互代码（数据、方法等） -->
<script>
export default {
    name:'SchoolName',// 组件名最好跟文件名保持一致
    data() {
        return {
            schoolName: '尚硅谷',
            address: '北京',
        };
    },
    methods: {
        showName() {
            alert(this.schoolName)
        }
    }
}
</script>

<!-- 组件的样式 -->
<style>
.demo{
    background-color: blue;
}
</style>
