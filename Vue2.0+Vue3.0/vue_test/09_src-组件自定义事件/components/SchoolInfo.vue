<template>
  <div class="school">
    <h2>学校：{{name}}</h2>
    <button @click="sendSchoolName">点我把学校名给App</button>
    <br/>
    
    <!-- 组件通信方式的一种：sync属性修饰符，可以实现父子组件数据同步 -->
    <!-- :money.sync：代表父组件给子组件传递props（money），给当前子组件绑定了一个自定义事件 update:money（update是固定的） -->
    <span>爸爸有{{money}}元</span>
    <StudentInfo :money.sync="money" />
  </div>
</template>

<script>
import StudentInfo from './StudentInfo.vue'
export default {
  name: 'SchoolInfo',
  props: ['getSchoolName'],
  components:{StudentInfo},
  data() {
    return {
      name: '尚硅谷',
      money:1000
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