<template>
  <div>
    <!-- 网格布局，一行占24个 -->
    <el-row :gutter="10">
      <el-col :span="6">
        <!-- 阴影效果需要用card -->
        <el-card>
          <!-- 第一个card -->
          <Detail title="销售总额" count="￥ 126543">
            <template slot="charts">
              <span>周同比  56.87% <svg t="1677156502036" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2298" width="16" height="16"><path d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z" fill="#34ca06" p-id="2299"></path></svg></span>
              &nbsp;
              <span>日同比  16.87% <svg t="1677156682656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2629" width="16" height="16"><path d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z" fill="#d81e06" p-id="2630"></path></svg></span>
            </template>
            <template slot="footer">
             <span>日销售额 ￥ 126543</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第二个card -->
          <Detail title="访问量" count="543">
            <template slot="charts">
              <lineCharts/>
            </template>
            <template slot="footer">
             <span>日访问量 543</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第三个card -->
          <Detail title="支付笔数" count="26543">
            <template slot="charts">
              <barCharts/>
            </template>
            <template slot="footer">
             <span>转化率 43%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第四个card -->
          <Detail title="运营活动效果" count="80%">
            <template slot="charts">
              <progressCharts/>
            </template>
            <template slot="footer">
              <span>周同比  56.87% <svg t="1677156502036" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2298" width="16" height="16"><path d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z" fill="#34ca06" p-id="2299"></path></svg></span>
              &nbsp;
              <span>日同比  16.87% <svg t="1677156682656" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2629" width="16" height="16"><path d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z" fill="#d81e06" p-id="2630"></path></svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineCharts from './lineCharts'
import barCharts from './barCharts'
import progressCharts from './progressCharts'
export default {
  name:'Card',
  data() {
    return {
      
    }
  },
  components:{
    Detail,lineCharts,barCharts,progressCharts
  }
}
</script>

<style>

</style>