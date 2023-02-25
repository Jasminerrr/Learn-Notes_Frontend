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
        // 设置x轴最小值和最大值
        min:0,
        max:100,
      },
      // y轴
      yAxis:{
        // 隐藏y轴
        show:false,
        // 均分
        type:'category',
      },
      // 系列
      series:[
        {
          // 柱状图
          type:'bar',
          // 数据
          data:[80],
          color:'orange',
          // 柱状图的宽度
          barWidth:10,
          // 设置背景颜色
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          // 文本标签的设置
          label:{
            show:true,
            // 改变文本内容，标签文本格式器：支持字符串模式和回调形式两个形式
            formatter:'|',
            // 文本的位置
            position:'right'
          },

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