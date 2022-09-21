<template>
  <div>
  <TestAnimation/>
  <TestAnimation2/>
  <TestAnimation3/>
  </div>
</template>

<script>
  // 引入组件
  import TestAnimation from "./components/TestAnimation";
  import TestAnimation2 from "./components/TestAnimation2";
  import TestAnimation3 from "./components/TestAnimation3";
  // 默认暴露-直接暴露组件配置对象
  export default {
    name: "App",
    // 注册组件
    components: { TestAnimation,TestAnimation2,TestAnimation3 },
  };
</script>

