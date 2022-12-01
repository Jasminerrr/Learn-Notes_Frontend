<template>
  <div>
    <button>原生按钮</button>
    <input type="text">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <el-date-picker
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    <br/>
    <br/>
    <el-button type="primary" icon="el-icon-edit" size="mini">测试Element-UI</el-button>
    <br/>
    <br/>
    <h2>封装自定义带hover提示的button</h2>
    <!-- 下面写法相当于是传props -->
    <HintButton 
    type="success" 
    icon="el-icon-delete" 
    size="mini" 
    title="提示"
    @click="handler"
    />


  </div>
</template>

<script>
import HintButton from "./HintButton";
  // 默认暴露-直接暴露组件配置对象
  export default {
    name: "App",
    components:{HintButton},
    methods:{
      handler(){
        alert(6666);
      }
    }
};
</script>

