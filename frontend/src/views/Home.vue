<template>
  <div class="container">
    <nav class="home">
      <div class="nav-wrapper menu">
        <ul>
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li v-show="userRole=='admin'"><router-link :to="{ name: 'admin' }">Admin</router-link></li>
        </ul>
        <span v-show="userName" class="welcome">Witaj {{ userName }}</span>
      </div>
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      userName: localStorage.getItem('projectx_user'),
      userRole: localStorage.getItem('role')
    }
  }
}
</script>

<style>
  .welcome {
    text-align: center;
  }
</style>

