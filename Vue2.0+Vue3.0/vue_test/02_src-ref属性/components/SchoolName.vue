<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
export default {
    name:'SchoolName',
    data() {
        return {
            name:'尚硅谷',
            address:'北京'
        }
    },
}
</script>

<style>
.school{
    background-color: brown;
}
</style>