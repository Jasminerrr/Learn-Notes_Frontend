<template>
  <div class="student">
    <h2>姓名：{{name}}</h2>
    <h2>number为{{number}}</h2>
    <button @click="add">点击number++</button>
    <button @click="sendStudentName">点我把学生名给App</button>
    <button @click="unbind">点击解绑事件</button>
    <button @click="death">点击销毁student组件实例</button>
    <br/>

    <!-- 组件通信方式的一种：sync属性修饰符，可以实现父子组件数据同步 -->
    
    <span>儿子每点一次花100</span>
    <button @click="$emit('update:money',money-100)">花100</button>
    <span>爸爸还剩{{money}}元</span>
  </div>
</template>

<script>
  export default {
    name:'StudentInfo',
    props:['money'],
    data() {
        return {
          name:'张三',
          number:0
        }
    },
    methods:{
      add(){
        console.log('number被调用了');
        this.number++
      },
      // $emit(触发事件名,数据):触发Student组件实例身上的atguigu事件
      sendStudentName(){
        this.$emit('atguigu',this.name,222,333,444)
        // this.$emit('demo')
      },
      unbind(){
        this.$off('atguigu')// 解绑单个自定义事件
        // this.$off(['atguigu','demo'])// 解绑多个自定义事件
        // this.$off()// 解绑所有自定义事件
      },
      death(){
        // 销毁当前组件的实例对象
        this.$destroy()
      }
    }
  }
</script>

<style scoped>
  .student{
    background-color:red;
    padding: 4px;
    margin: 20px;
  }
</style>