<template>
  <div class="school">
    <h2>学校：{{name}}</h2>
  </div>
</template>

<script>
export default {
  name: 'SchoolInfo',
  data() {
    return {
      name: '尚硅谷',
    }
  },
  // 挂载完绑定hello事件
  mounted(){
    this.$bus.$on('hello',(data)=>{
      console.log('school组件收到了数据',data);
    })
  },
  // 最好在beforeDestroy钩子中，用$off去解绑当前组件用到的事件
  beforeDestroy(){
    this.$bus.$off('hello')
  }
}
</script>

<style scoped>
.school {
  background-color: cornflowerblue;
  padding: 4px;
  margin: 20px;
}
</style>