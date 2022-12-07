<template>
  <div>
    <!-- <el-button type="primary" icon="el-icon-edit" size="mini">测试Element-UI</el-button> -->

    <!-- <h2>封装自定义带hover提示的button</h2> -->
    <!-- 可以巧妙地利用a标签来实现按钮带有提示功能 -->
    <a :title="title">
      <!-- 此处绑定v-bind不能简写成: ，v-on 不能简写成 @-->
      <!-- v-bind="$attrs"--把$attrs接收到的所有属性都绑定在元素上 -->
      <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
    
  </div>
</template>

<script>
export default {
  name:'',
  props:['title'],
  mounted(){
    // $attrs是属于组件身上的一个属性，可以获取到父组件传递过来的props数据
    // 与子组件：可以用props接收父组件给的数据，但如果子组件通过props接受的属性，则在$attrs属性中是获取不到的
    console.log(this.$attrs);
    // $listeners也是组件实例自身的一个属性，可以获取到父组件给子组件传递自定义事件
    console.log(this.$listeners);
  }
}
</script>

<style>

</style>