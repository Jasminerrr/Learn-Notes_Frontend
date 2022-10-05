<template>
  <div class="container">
    <MyCategory title="美食">
      <img src="https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF" alt="">
    </MyCategory>
    <MyCategory title="游戏">
      <ul>
        <li v-for="(g,index) in games" :key="index" >{{g}}</li>
      </ul>
    </MyCategory>
    <MyCategory title="电影">
      <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
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
  .container{
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
</style>