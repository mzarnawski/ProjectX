<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label for="user">User:</label>
        <input type="text" name="user" v-model="userName">
      </div>
      <div>
        <label for="pass">Password:</label>
        <input type="password" name="pass" v-model="userPass">
      </div>
      <button type="submit">Zaloguj</button>
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

