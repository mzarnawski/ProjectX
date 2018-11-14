<template>
  <div class="container">
    <nav>
      <div class="nav-wrapper menu">
        <ul>
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li v-show="userRole=='admin'"><router-link :to="{ name: 'admin' }">Admin</router-link></li>
        </ul>
        <div class="welcome">
          <span v-show="userName">Witaj, {{ userName }}</span>
          <a href="" class="btn" v-show="userName" @click="logout">Wyloguj</a>
        </div>
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
  },
  methods: {
    logout() {
      localStorage.removeItem('projectx_user')
      localStorage.removeItem('role')
      localStorage.removeItem('token')
    }
  }
}
</script>

<style>
  .welcome {
    float: right;
    margin-right: 20px
  }
  .welcome span, .welcome a {
    margin-left: 10px
  }
</style>

