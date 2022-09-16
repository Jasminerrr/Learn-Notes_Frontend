<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <!-- 通过父组件给子组件 传递函数类型的props实现：子给父传递数据 -->
    <SchoolInfo :getSchoolName="getSchoolName"/>

    <!-- 第一种写法：使用@ 或 v-on --> 
    <!-- 给谁绑定自定义事件，就找谁触发 -->
     <!-- 通过父组件给子组件 绑定一个自定义事件实现：子给父传递数据 -->
    <!-- <StudentInfo @atguigu="getStudentName" @demo="m1"/> -->
    <!-- 触发一次事件  -->
    <!-- <StudentInfo @atguigu.once="getStudentName"/> -->

    <!-- 第二种写法：使用ref -->
    <!-- 通过父组件给子组件 绑定一个自定义事件实现：子给父传递数据 -->
    <StudentInfo ref="student" @click.native="show"/>

 
  </div>
</template>

<script>
    // 引入SchoolName组件
    import StudentInfo from './components/StudentInfo'
    import SchoolInfo from './components/SchoolInfo'
    // 默认暴露-直接暴露组件配置对象
    export default {
        name:'App',
        // 注册组件
        components:{StudentInfo,SchoolInfo},
        data(){
          return {
            msg:'你好啊'
          }
        },
        methods:{
          getSchoolName(name){
            console.log(name);
          },
          // ...params接收剩余数组参数
          getStudentName(name,...params){
            console.log(name,params);
          },
          m1(){
            console.log('demo事件被触发了');
          },
          show(){
          alert('aaaa')
        }
        },
        // 挂载后
        mounted(){
          // this.$refs.student获得组件实例对象，$on：当atguigu事件触发时，调用回调函数
          // this.$refs.student.$on('atguigu',this.getStudentName)
          // 只能触发一次事件
          // this.$refs.student.$once('atguigu',this.getStudentName)
        },
        
    }
</script>
<style scoped>
  .app{
    background-color: gray;
    padding: 5px;
  }
</style>
