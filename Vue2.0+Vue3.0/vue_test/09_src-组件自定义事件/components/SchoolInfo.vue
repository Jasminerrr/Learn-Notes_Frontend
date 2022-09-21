<template>
  <div class="school">
    <h2>学校：{{name}}</h2>
    <button @click="sendSchoolName">点我把学校名给App</button>
  </div>
</template>

<script>
export default {
  name: 'SchoolInfo',
  props: ['getSchoolName'],
  data() {
    return {
      name: '尚硅谷',
    }
  },
  methods:{
    sendSchoolName(){
      this.getSchoolName(this.name)
    }
  }
}
</script>

<style scoped>
.school {
  background-color: cornflowerblue;
  padding: 4px;
  margin: 20px;
}
</style>