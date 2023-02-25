<template>
  <!-- 准备一个带有宽高的容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts资源包
import echarts from 'echarts'
export default {
  name:'',
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

<style>
  .charts{
    width: 100%;
    height: 100%;
  }
</style>