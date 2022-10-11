<template>
  <ul>
    <li :style="{opacity}">欢迎学习Vue</li>
    <li>news001 <input type="text"></li>
    <li>news002 <input type="text"></li>
    <li>news003 <input type="text"></li>
  </ul>
</template>

<script>
  export default {
    name:'MyNews',
    data(){
      return {
        opacity:1
      }
    },
    /* beforeDestroy(){
      clearInterval(this.timer)
    },
    mounted(){
      this.timer = setInterval(() => {
        this.opacity -= 0.01
        if(this.opacity <= 0) this.opacity = 1
      }, 16);
    } */
    
    /* 路由器独有的生命周期钩子：
        1. 用于捕获路由组件的激活状态。
        2. 该组件必须用缓存路由组件 <keep-alive> 包裹
        3. vue在关键时候会自动调用 */
    // actived：激活的，会在组件出现时调用
    activated(){
      this.timer = setInterval(() => {
        this.opacity -= 0.01
        if(this.opacity <= 0) this.opacity = 1
      }, 16);
    },
    // deactivated：失活的，会在组件切换时调用
    deactivated(){
      clearInterval(this.timer)
    }
  }
</script>

<style>

</style>