<template>
  <div class="container login">
    <form @submit.prevent="login" class="card-panel">
      <div class="field">
        <label for="user">User:</label>
        <input type="text" name="user" v-model="userName">
      </div>
      <div class="field">
        <label for="pass">Password:</label>
        <input type="password" name="pass" v-model="userPass">
      </div>
      <button type="submit" class="btn">Zaloguj</button>
    </form>
  </div>
</template>

<script>
import backend from 'axios'

export default {
  data() {
    return {
      userName: localStorage.getItem('projectx_user'),
      userPass: null
    }
  },
  methods: {
    login() {
      backend.post('http://localhost:3000/login', {userName: this.userName, userPass: this.userPass})
      .then(res => {
        if(res.data.status == 'OK') {
          localStorage.setItem('projectx_user', this.userName)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('role', res.data.role)
          this.$router.push({ name: 'home'})
        }
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style>
  .login {
    max-width: 400px;
    margin-top: 60px;
  }
  .login .field {
    margin: 20px 0;
    text-align: left
  }
  .login .btn {
    margin-top: 25px;
  }
</style>

