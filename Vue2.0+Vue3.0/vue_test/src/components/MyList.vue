<template>
  <ul class="todo-main">
    <!-- :todo="todoObj" 为 给MyItem传递todo对象 -->
    <transition-group name="todo" appear>
      <MyItem 
    v-for="todoObj in todos" 
    :key="todoObj.id" 
    :todo="todoObj" 
    />
    </transition-group>
  </ul>
</template>

<script>
import MyItem from "./MyItem.vue";
export default {
  name: "MyList",
  components: {
    MyItem
  },
  props: ["todos"],
};
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
/* transition名字交什么，样式名就要什么开头，不写默认为v-enter-active */
.todo-enter-active{
    animation: move .5s linear;
  }
  .todo-leave-active{
    /* reverse翻转 */
    animation: move .5s linear reverse;
  }
  /* 动画效果 */
  @keyframes move{
    /* 开始状态 */
    0% {
      transform: translateX(100%);
    }
    /* 结束状态 */
    100% {
      transform: translateX(0px);
    }
  }
</style>
