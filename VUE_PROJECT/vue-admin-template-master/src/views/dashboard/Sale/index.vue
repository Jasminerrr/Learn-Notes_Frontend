<template>
  <el-card>
    <!-- 头部区域 -->
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- 日历 -->
        <!-- v-model="value1" -->
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yy-MM-dd"
          >
        </el-date-picker>
      </div>
    </div>
    <!-- 中间内容区域 -->
    <div>
      <!-- Layout布局 -->
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 准备左侧echarts图表的容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6" class="right">
          <h3>门店{{ title }}排名</h3>
          <ul>
            <li>
              <span class="rindex">1</span>
              <span>麦当劳</span>
              <span class="rvalue">3456</span>
            </li>
            <li>
              <span class="rindex">2</span>
              <span>麦当劳</span>
              <span class="rvalue">3456</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span>麦当劳</span>
              <span class="rvalue">3456</span>
            </li>
            <li>
              <span>4</span>
              <span>麦当劳</span>
              <span class="rvalue">3456</span>
            </li>
            <li>
              <span>5</span>
              <span>麦当劳</span>
              <span class="rvalue">3456</span>
            </li>
            <li>
              <span>6</span>
              <span>麦当劳</span>
              <span class="rvalue">3456</span>
            </li>
            <li>
              <span>7</span>
              <span>麦当劳</span>
              <span class="rvalue">3456</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
// 引入echarts包
import echarts from 'echarts'
// 引入dayjs
import dayjs from 'dayjs'

import {mapState} from 'vuex'
export default {
  name:'',
  data() {
    return {
      activeName:'sale',
      mycharts:null,
      date:[],
    }
  },
  // 当组件挂载完毕后
  mounted() {
    // 初始化echarts实例
    this.mycharts = echarts.init(this.$refs.charts)
    // 配置数据
    this.mycharts.setOption({
      title:{
        text:'销售额趋势',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [],
          color:'skyblue'
        }
      ]
    })
  },
  methods: {
    // 点击今日回调
    setDay(){
      // 通过dayjs方法获取今日日期
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day,day]
    },
    // 点击本周回调
    setWeek(){
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start,end]
    },
    // 点击本月回调
    setMonth(){
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start,end]
    },
    // 点击本年回调
    setYear(){
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start,end]
    },
  },
  // 计算属性
  computed:{
    // 标题
    title(){
      return this.activeName=='sale'?'销售额':'访问量'
    },
    ...mapState({
      listState:state => state.home.list
    })
  },
  // 监听属性
  watch:{
    // 重新修改图表配置的数据
    // 图表配置的数据可以再次修改，有新的就会替换旧的
    title(){
      this.mycharts.setOption({
        title:{
          text:this.title+'趋势',
        },
        xAxis:{
          data:this.title == '销售额'? this.listState.orderFullYearAxis:this.listState.userFullYearAxis
        },
        series:[
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            color:'skyblue',
            data:this.title == '销售额'? this.listState.orderFullYear:this.listState.userFullYear
          }
        ]
      })
    },
    // 监听listState，有数据的时候，立马使用（因为第一次挂载数据为空）
    listState(){
      this.mycharts.setOption({
      title:{
        text:this.title+'趋势',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: this.listState.orderFullYear,
          color:'skyblue'
        }
      ]
    })
    }
  }
}
</script>

<style scoped>
  .clearfix{
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  >>>.el-card__header{
    border-bottom:none;
  }
  .tab{
    width: 100%;
  }
  .right{
    position: absolute;
    right: 0;
  }
  .right span {
    margin: 0px 10px;
  }
  .date{
    width: 250px;
    margin: 0px 20px;
  }
  .charts{
    width: 100%;
    height: 300px;
  }
  ul{
    list-style: none;
    padding: 0px;
    width: 100%;
    height: 300px;
  }
  ul li{
    height: 8%;
    margin: 10px 0px;
  }
  .rindex{
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: black;
    color: white;
    text-align: center;
  }
  .rvalue{
    float: right;
  }
  /* .el-card__header{
  border-bottom:none;
} */
</style>