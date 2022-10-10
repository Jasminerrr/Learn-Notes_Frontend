<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <!-- 此处跳转需要带完整路径：to="/home/news" -->
          <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
        </li> 
        <li> 
          <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
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