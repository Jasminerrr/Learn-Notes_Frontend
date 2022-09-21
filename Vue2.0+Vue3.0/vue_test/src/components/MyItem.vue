<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
      <!-- v-model也能实现勾选功能，但不推荐(修改了props，虽然Vue没监视到，但违反原则) -->
      <!-- <input type="checkbox" v-model="todo.done"/> -->
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input 
        type="text"
        v-show="todo.isEdit" 
        :value="todo.title"
        @blur="handleBlur(todo,$event)"
        ref="inputTitle"
        >
    </label>
    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)" >编辑</button>
  </li>
</template>

<script>

export default {
  name: "MyItem",
  // 声明接收todo对象
  props: ['todo'],
  methods:{
    // 表单勾选状态事件
    handleCheck(id){
      // 调用App组件里面的checkTodo，将todo对象的done值取反
      // this.checkTodo(id)
      this.$bus.$emit('checkTodo',id)
    },
    // 删除按钮事件
    handleDelete(id){
      // confirm确定框，点击确认则返回true,取消返回false
      if(confirm('确定删除吗')){
        // 通知(调用)App组件的删除方法
        // this.deleteTodo(id)
        this.$bus.$emit('deleteTodo',id)
      }
    },
    // 编辑
    handleEdit(todo){
      // 判断：如果对象身上有isEdit这个方法，有则直接改
      if(todo.hasOwnProperty('isEdit')){
        todo.isEdit = true
      }else{
        // Vue.$set()方法，在响应式对象里面添加一个属性
        this.$set(todo,'isEdit',true)
      }
      // 在执行代码改变数据后，下次更新的DOM模板解析完成后再调用nextTick
      this.$nextTick(function () {
        this.$refs.inputTitle.focus()
      })   
    },
    // 失去焦点回调(真正执行修改逻辑)
    handleBlur(todo,e){
      todo.isEdit = false
      // 校验：如果为空，则返回
      if(!e.target.value.trim()) return alert('输入不能为空')
      // 触发updateTodo事件，传id和表单的内容
      this.$bus.$emit('updateTodo',todo.id,e.target.value)
    }
  }
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover{
  background-color: #ddd;
}
li:hover button{
  display: block;
}
</style>