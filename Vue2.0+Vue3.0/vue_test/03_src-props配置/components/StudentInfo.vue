<template>
  <div>
    <h2>{{msg}}</h2>
    <h2>姓名：{{name}}</h2>
    <h2>性别：{{sex}}</h2>
    <h2>年龄：{{myAge+1}}</h2>
    <button @click="updateAge">修改收到的年龄</button>
  </div>
</template>

<script>
export default {
    name:'StudentInfo',
    data() {
        return {
          msg:'你好',
          myAge:this.age
        }
    },
    methods:{
      updateAge(){
        this.myAge++
      }
    },
    // 1. 简单声明接收 props优先级高于data
    props:['name','sex','age']

    // 2. 接收的同时对数据进行类型限制
    /* props:{
      name:String,
      age:Number,
      sex:String
    } */

    // 3. 接收同时对数据进行：类型限制 + 默认值的指定 + 必要性限制
    /* props:{
      name:{
        type:String,// name类型为字符串
        required:true// 必须有name
      },
      age:{
        type:Number,
        default:99
      },
      sex:{
        type:String,
        required:true
      }
    } */
}
</script>