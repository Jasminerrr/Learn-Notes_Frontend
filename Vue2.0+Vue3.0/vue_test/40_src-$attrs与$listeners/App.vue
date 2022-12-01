<template>
  <div>
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

