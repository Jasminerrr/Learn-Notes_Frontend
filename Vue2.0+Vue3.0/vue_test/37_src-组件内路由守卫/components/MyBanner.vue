<template>
  <div class="col-xs-offset-2 col-xs-8">
    <div class="page-header">
      <h2>Vue Router Demo</h2>
      <button @click="back">后退</button>
      <button @click="forward">前进</button>
      <button @click="test">测试go</button>
    </div>
  </div>
</template>

<script>
  export default {
    name:'MyBanner',
    methods:{
      back(){
        // back为后退
        this.$router.back()
      },
      forward(){
        // forward为前进
        this.$router.forward()
      },
      test(){
        // go里面要传入数字，正数为往前走，负数为往后退
        this.$router.go(2)
      }
    }
  }
</script>

<style>

</style>