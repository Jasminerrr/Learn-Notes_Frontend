<template>
  <div>
    <h2>学校：{{name | mySlice}}</h2>
    <button @click="test" >点我测试hello方法</button>
  </div>
</template>

<script>
  export default {
      name:'SchoolInfo',
      data() {
          return {
            name:'尚硅谷',
          }
      },
      methods:{
        test(){
          this.hello()
        }
      }
  }
</script>