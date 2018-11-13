<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/admin" v-show="userRole=='admin'">Admin</router-link>
      <span v-show="userName">Witaj {{ userName }}</span>
    </div>
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
