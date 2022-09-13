<template>
  <div>
    <h2 @click="showName">姓名：{{name}}</h2>
  </div>
</template>

<script>
  // 引入一个mixin
  // import {mixin,mixin2} from '../mixin'
  export default {
    name:'StudentInfo',
    data() {
        return {
          name:'张三'
        }
    },
    // 局部混入
    // mixins:[mixin,mixin2]
  }
</script>