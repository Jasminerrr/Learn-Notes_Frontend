<template>
  <div>
    <!-- 行内表格 -->
    <el-form inline>
      <el-form-item>
        <el-input placeholder="角色名称"></el-input>
      </el-form-item>
      <!-- 查询与情况的按钮 -->
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button>清空</el-button>
    </el-form>
    <div style="margin-bottom: 20px">
      <!-- 添加与批量删除的按钮 -->
    <el-button type="primary">添加</el-button>
    <el-button type="danger">批量删除</el-button>
    </div>
    <!-- table表单 -->
    <el-table :data="data" border style="width: 960px">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
      <el-table-column prop="prop" label="角色名"></el-table-column>
      <el-table-column prop="prop" label="操作">
        <template slot-scope="{row}">
          <hint-button type="info" icon="el-icon-user-solid"></hint-button>
          <hint-button type="primary" icon="el-icon-edit"></hint-button>
          <el-popconfirm title="确定删除吗？">
            <el-button slot="reference" type="danger" icon="el-icon-delete"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- @current-change="getUsers"
      @size-change="handleSizeChange" -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 7, 10]"
      style="padding: 20px 0;"
      layout="prev, pager, next, jumper, ->, sizes, total"  
    />
    
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>