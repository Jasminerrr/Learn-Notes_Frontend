<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!-- 多个元素需要过渡，则须使用<transition-group>，且每个元素都要指定key值 -->
    <transition-group name="hello" appear>
      <h1 v-show="!isShow" key="1">你好</h1>
      <h1 v-show="isShow" key="2">你好</h1>
    </transition-group>
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
    /* 为了不破坏本身的样式，可以另外重新写，如下 */
    /* transition: .5s,linear; */
  }
  /* 过渡效果实现 */
  /* transition过渡名叫什么，样式名就要什么开头，不写默认为v-enter-active */
  /* 进入的起点、离开的终点 */
  .hello-enter,.hello-leave-to{
    transform: translateX(-100%);
  }
  /* 进入、离开的过渡效果 */
  .hello-enter-active,.hello-leave-active{
    transition: 0.5s linear;
  }
  /* 进入的终点、离开的起点 */
  .hello-enter-to,.hello-leave{
    transform: translateX(0);
  }

</style>