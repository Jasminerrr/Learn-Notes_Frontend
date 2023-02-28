<template>
  <div>
    <el-table :data="data" border>
      <el-table-column prop="prop" label="名称"></el-table-column>
      <el-table-column prop="prop" label="权限值"></el-table-column>
      <el-table-column prop="prop" label="跳转权限值"></el-table-column>
      <el-table-column prop="prop" label="操作">
        <template slot-scope="{row}">
          <hint-button type="primary" icon="el-icon-plus" size="mini" title="添加菜单"></hint-button>
          <hint-button type="primary" icon="el-icon-edit" size="mini" title="修改菜单"></hint-button>
          <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除"></hint-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>