<template>
<!-- 当total返回值为0以外的长度，则true显示，否则不显示 -->
<div class="todo-footer" v-show="total">
  <label>
    <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
    <input type="checkbox" v-model="isAll" />
  </label>
  <span>
    <span>已完成{{ doneTotal }}</span> / 全部{{ total }}
  </span>
  <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
</div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  computed: {
    // 全部项
    total() {
      return this.todos.length;
    },
    // 已完成项
    doneTotal() {
      // reduce(回调函数(pre,current),初始值)统计数组方法
      /* const x = this.todos.reduce((pre, current) => {
        return pre + (current.done ? 1 : 0);// 上一次的值+当前的值(done真，反1，假 反0)
      }, 0);
      console.log(x); */
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },
    isAll: {
      get() {
        return this.doneTotal === this.total && this.total > 0;
      },
      set(value) {
        // this.checkAllTodo(value);
        // 自定义事件调用
        this.$emit('checkAllTodo',value)
      },
    },
  },
  methods: {
    /* checkAll(e) {
      // 调用App里面的全选框
      this.checkAllTodo(e.target.checked);
    }, */
    clearAll(){
      // this.clearAllTodo()
      // 自定义事件调用
      this.$emit('clearAllTodo')
    }
  }
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
