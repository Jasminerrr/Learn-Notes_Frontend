<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <svg t="1677152720685" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2760" width="16" height="16"><path d="M512 0a512 512 0 1 0 0 1024A512 512 0 0 0 512 0z m0 896A384 384 0 0 1 512 128a384 384 0 0 1 0 768z m29.696-194.88c-11.136 10.112-24.96 17.344-31.488 15.36-6.08-1.792-9.536-7.424-8.384-13.056l89.344-248c7.424-31.488-12.736-60.16-55.424-63.872-44.8 0-110.976 40.128-151.232 90.944 0 6.08-1.344 21.12 0.128 30.208l53.632-54.208c11.008-10.176 23.808-17.344 30.336-15.424 6.592 1.92 10.112 8.384 8 14.464l-88.704 246.848c-10.176 28.864 9.152 57.152 56.192 63.616 68.928 0 109.888-39.168 150.208-89.984 0-6.08 2.368-22.08 0.96-31.104l-53.568 54.208zM575.744 192c-35.584 0-64.448 25.728-64.448 63.808 0 37.952 28.864 63.744 64.448 63.744 35.648 0 64.448-25.728 64.448-63.744 0-38.08-28.8-63.808-64.448-63.808z" p-id="2761" fill="#8a8a8a"></path></svg>
    </div>
    <div class="main">
      <span class="main-left">1234</span>
      <span>17.1</span>
      <svg t="1677156502036" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2298" width="16" height="16"><path d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z" fill="#34ca06" p-id="2299"></path></svg>
      <svg t="1677156682656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2629" width="16" height="16"><path d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z" fill="#d81e06" p-id="2630"></path></svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  // 在组件挂载完毕后初始化echarts实例
  mounted() {
    // 初始化echarts实例
    // 通过ref打标识获取节点
    let lineCharts = echarts.init(this.$refs.charts)
    // 配置数据
    lineCharts.setOption({
      // x轴
      xAxis:{
        // 隐藏x轴
        show:false,
        // 均分
        type:'category',
        
      },
      // y轴
      yAxis:{
        // 隐藏y轴
        show:false,
      },
      // 系列
      series:[
        {
          // 折线图
          type:'line',
          // 数据
          data:[10,30,19,15,34,22,43],
          // 设置折线拐点标志的样式
          itemStyle:{
            // 图形透明度0-1
            opacity:0
          },
          // 线条的样式
          lineStyle:{
            color:'purple',
          },
          // 区域填充的颜色
          areaStyle:{
            // 设置为渐变色
            color:{
              type:'linear',
              x:0,
              y:0,
              x2:0,
              y2:1,
              colorStops:[
                {
                  offset:0,
                  color:'purple',// 0%处的颜色
                },
                {
                  offset:1,
                  color:'#fff',// 100%处的颜色
                }
              ],
              global:false,
            },
          }
        },
      ],
      // 设置布局
      grid:{
        left:0,
        right:0,
        top:0,
        bottom:0
      },
    })
  },
}
</script>

<style scoped>
  .header{
    display: flex;
    align-items: center;
    color:gray;
  }
  .header .icon{
    margin-left: 15px;
  }
  .main{
    margin-top: 10px;
  }
  .main-left{
    margin-right: 40px;
  }
  .main .icon{
    margin-left: 6px;
  }
  .charts{
    width: 100%;
    height: 50px;
  }
</style>