<template>
  <div class="container">
    <MyCategory title="游戏">
      <!-- 作用域插槽必须用template 且要用scope命名一个变量接收games数据 -->
      <template scope="atguigu">
        <ul>
        <li v-for="(g,index) in atguigu.games" :key="index" >{{g}}</li>
        </ul>
      </template>
    </MyCategory>

    <MyCategory title="游戏">
      <!-- {games}为es6语法的解构赋值 -->
      <template scope="{games}">
        <ol>
        <li v-for="(g,index) in games" :key="index" >{{g}}</li>
        </ol>
      </template>
    </MyCategory>

    <MyCategory title="游戏">
      <!-- slot-scope 为新语法 {games}为es6语法的解构赋值 -->
      <template slot-scope="{games}">
        <h4 v-for="(g,index) in games" :key="index" >{{g}}</h4>
      </template>
    </MyCategory>
  </div>
</template>

<script>
  import MyCategory from './components/MyCategory.vue';
  // 默认暴露-直接暴露组件配置对象
  export default {
    name: "App",
    components: { MyCategory },
  };
</script>

<style>
  .container,.foot{
    /* css3弹性布局 */
    display: flex;
    /* 主轴对齐 */
    justify-content: space-around;
  }
  img{
    width: 100%;
  }
  video{
    width: 100%;
  }
  h4{
    text-align: center;
  }
</style>