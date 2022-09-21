<template>
  <div class="school">
    <h2>学校：{{name}}</h2>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'
  export default {
    name: 'SchoolInfo',
    data() {
      return {
        name: '尚硅谷',
      }
    },
    mounted(){
      /* this.$bus.$on('hello',(data)=>{
        console.log('school组件收到了数据',data);
      }) */
      // 此处要写成箭头函数 this 指向组件实例对象
      this.pubID = pubsub.subscribe('hello',(msgName,data)=>{
        console.log('有人发布hello消息，hello回调执行了',msgName,data);
      })
    },
    beforeDestroy(){
      // this.$bus.$off('hello')
      // 通过订阅消息的ID来取消订阅
      this.pubsub.unsubcribe(this.pubId)
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