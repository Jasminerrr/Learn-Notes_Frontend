<template>
  <div>
    <!-- gutter:col的间距 -->
    <el-row :gutter="10">
      <!-- 左侧搜索 -->
      <el-col :span="12">
          <Search/>
      </el-col>
      <!-- 右侧类别 -->
      <el-col :span="12">
          <Category/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from './Search'
import Category from './Category'
export default {
  // 注册子组件
  components:{
    Search,Category
  }
}
</script>

<style>

</style>