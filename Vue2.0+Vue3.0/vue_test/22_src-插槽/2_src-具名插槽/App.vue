<template>
  <div class="container">
    <MyCategory title="美食">
      <img slot="center" src="https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF" alt="">
      <a slot="footer" href="http://www.baidu.com">更多美食</a>
    </MyCategory>
    <MyCategory title="游戏">
      <ul slot="center">
        <li v-for="(g,index) in games" :key="index" >{{g}}</li>
      </ul>
        <div class="foot" slot="footer" >
          <a href="http://www.baidu.com">单机游戏</a>
          <a href="http://www.baidu.com">双机游戏</a>
        </div>
    </MyCategory>
    <MyCategory title="电影">
      <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
      <!-- v-slot:footer只能在template中使,template可以将结构隐藏 -->
      <template v-slot:footer>
        <div class="foot">
          <a href="http://www.baidu.com">经典</a>
          <a href="http://www.baidu.com">热门</a>
          <a href="http://www.baidu.com">推荐</a>
        </div>
        <h4>欢迎你</h4>
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
    data(){
      return {
        foods: ['火锅', '烧烤', '小龙虾'], 
        games: ['红色警戒', '穿越火线', '劲舞团'],
        films: ['《教父》', '《拆弹专家》', '《你好，李焕英》']
      }
    }
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