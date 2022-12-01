<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo == 1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间连续页码部分 -->
    <!-- 先遍历连续页码，大于等于 起始页的显示 -->
    <button 
    v-for="(page,index) in startNumAndEndNum.end" 
    :key="index" 
    v-show="page >= startNumAndEndNum.start" 
    @click="$emit('getPageNo',page)"
    :class="{active:pageNo == page}"
    >{{page}}</button>

    <button v-if="startNumAndEndNum.end < totalPage -1">···</button>
    <button 
    v-if="startNumAndEndNum.end < totalPage" 
    @click="$emit('getPageNo',totalPage)" 
    :class="{active:pageNo == totalPage}"
    >{{totalPage}}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo',pageNo + 1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  // pageNo：当前页，pageSize：每页的数据条数，total：总数据条数，continues：连续页码
  props:['pageNo','pageSize','total','continues'],
  computed:{
    // 1. 计算新属性：总共多少页,Math.ceil向上取整
    totalPage(){
      return Math.ceil(this.total / this.pageSize)
    },
    // 2. 计算出连续页码的起始页和结束页
    startNumAndEndNum(){
      // 定义两个变量存储起始页和结束页(随便赋初始值)
      let start = 0, end = 0
      let {pageNo,continues,totalPage} = this
      // 判断连续页码大于总页数
      if(continues > totalPage){
        start = 1
        end = totalPage
      }else{
        // 总页数 > 连续页码，则当前页面+或- 取整(连续页码/2)
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 再次判断：起始页至少要为1
        if(start < 1){
          start = 1
          end = continues
        }
        // 判断结束页大于总页数
        if(end > totalPage){
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return{start,end}
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  // 居中
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
