<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <!-- replace替换写法 —— :replace="true",默认true 简写为replace -->
          <router-link replace class="list-group-item" active-class="active" to="/home/news">News</router-link>
        </li> 
        <li> 
          <router-link replace class="list-group-item" active-class="active" to="/home/message">Message</router-link>
        </li>
      </ul>
      <!-- 指定组件呈现位置 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name:'MyHome'
  }
</script>