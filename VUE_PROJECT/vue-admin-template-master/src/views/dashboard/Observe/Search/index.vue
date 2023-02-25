<template>
    <el-card>
      <!-- 卡片的头部 -->
      <div slot="header">
        <div class="search-header">
          <span>线上热门搜索</span>
          <!-- 下拉框 -->
          <el-dropdown>
            <span>
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 卡片内容 -->
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <lineCharts></lineCharts>
          </el-col>
          <el-col :span="12">
            <lineCharts></lineCharts>
          </el-col>
        </el-row>
      </div>
      <!-- 卡片底部的表格 -->
      <!-- :default-sort = "{prop: 'date', order: 'descending'}" -->
      <el-table :data="tableData" style="width: 100%" border class="table">
        <el-table-column type="index" label="排名"  width="80">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="180">
        </el-table-column>
        <el-table-column prop="address" label="用户数" sortable>
        </el-table-column>
        <el-table-column prop="name" label="周涨幅" sortable width="180">
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        class="pagination"
        >
      </el-pagination>
    </el-card>
</template>

<script>
import lineCharts from './lineCharts'
export default {
  name:'',
  data() {
    return {
      tableData:[{}],
    }
  },
  components:{
    lineCharts,
  }
}
</script>

<style scoped>
  .search-header{
    display: flex;
    justify-content: space-between;
  }
  .table{
    margin:20px 0px;
  }
  .pagination{
    float:right;
  }
</style>