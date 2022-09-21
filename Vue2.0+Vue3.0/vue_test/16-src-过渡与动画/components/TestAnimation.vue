<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition name="hello" appear>
      <h1 v-show="isShow">你好</h1>
    </transition>
  </div>
</template>

<script>
  export default {
    name:'TestAnimation',
    data(){
      return {
        isShow:true
      }
    }
  }
</script>

<style scoped>
  h1{
    background-color: coral;
  }
  /* transition名字交什么，样式名就要什么开头，不写默认为v-enter-active */
  .hello-enter-active{
    animation: move .5s linear;
  }
  .hello-leave-active{
    /* reverse翻转 */
    animation: move .5s linear reverse;
  }
  /* 动画效果 */
  @keyframes move{
    /* 开始状态 */
    0% {
      transform: translateX(-100%);
    }
    /* 结束状态 */
    100% {
      transform: translateX(0px);
    }
  }
</style>