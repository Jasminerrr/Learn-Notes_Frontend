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
          // 柱状图
          type:'bar',
          // 数据
          data:[5,8,39,25,14,32,13,33,12,47,14,22],
          color:'skyblue',
        },
      ],
      // 设置布局
      grid:{
        left:0,
        right:0,
        top:0,
        bottom:0
      },
      // 提示信息
      tooltip:{},
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