<template>
  <div>
    <h2 @click="showName">学校：{{name}}</h2>
  </div>
</template>

<script>
  // 局部混合：引入一个mixin
  // import {mixin,mixin2} from '../mixin'
  export default {
      name:'SchoolInfo',
      data() {
          return {
            name:'尚硅谷',
            x:300
          }
      },
      // mixins:[mixin,mixin2],
      mounted() {
        console.log('bbbbbb');
    }
  }
</script>