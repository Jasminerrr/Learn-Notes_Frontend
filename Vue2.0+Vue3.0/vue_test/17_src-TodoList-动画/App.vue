<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter 
          :todos="todos"
          @checkAllTodo="checkAllTodo" 
          @clearAllTodo="clearAllTodo" 
          />
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import MyList from "./components/MyList";
// 默认暴露-直接暴露组件配置对象
export default {
  name: "App",
  // 注册组件
  components: { MyHeader, MyFooter, MyList },
  data() {
    return {
      // 由于todos是MyHeader组件和MyFooter组件都在使用，所以放在父组件App中（状态提升）
      // 如果得到为真，返回这个对象，为空(假)，则返回空数组
      todos: JSON.parse(localStorage.getItem('todos')) || []
    };
  },
  methods: {
    // 添加一个todo对象
    addTodo(todoObj) {
      this.todos.unshift(todoObj);
    },
    // 勾选or不勾选todo对象
    checkTodo(id) {
      // 先循环遍历对象，找到对象的id，将done状态取反
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done;
      });
    },
    // 更新一个todo对象
    updateTodo(id,title) {
      // 先循环遍历对象，找到对象的id，将title改为传过来的title
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.title = title;
      });
    },
    // 删除一个todo对象（过滤掉不想要的）
    deleteTodo(id) {
      // filter过滤，会返回一个新数组，所以要重新赋值给数组
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    // 全选框状态
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        // 将全选done赋值给原来的done
        todo.done = done
      })
    },
    // 删除todo对象中done为真的值
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done
      })
    }
  },
  watch: {
    todos: {
      // 深度监视todos对象里面的所有属性
      deep: true,
      handler(value) {
        // 检测到todos数组里面的值放到本地存储，值要通过JSON.stringify()才能展现成对象
        localStorage.setItem('todos', JSON.stringify(value))
      }
    }
  },
  // 事件挂载后，绑定事件('事件名',回调名)
  mounted(){
    this.$bus.$on('checkTodo',this.checkTodo)
    this.$bus.$on('deleteTodo',this.deleteTodo)
    this.$bus.$on('updateTodo',this.updateTodo)
  },
  beforeDestroy(){
    this.$bus.$off('checkTodo')
    this.$bus.$off('deleteTodo')
    this.$bus.$off('updateTodo')
  }
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}
.btn-edit{
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(38, 218, 231);
  margin-right: 5px;
}
.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
