<template>
  <div style="width:100vw; height:100vh; background-color: #121212; color: white; overflow: auto;">
    <br><br>
    <div class="d-flex justify-content-center" style="height:75vh; width: 100vw; margin-top:16px;">
      <form class="justify-content-center col-8" style="width: 32vw; text-align: center;" @submit.prevent="login">
        <span style="font-size: 3.5vw ">로그인</span><br>
        <span>아직 계정이 없습니까? <router-link style="color: white; text-decoration: none;" :to="{ name: 'signup' }">회원가입</router-link></span><br><br>

        <input class="form-control" type="text" id="username" placeholder="아이디" v-model="username"><br>
        <input class="form-control" type="password" id="password" placeholder="비밀번호" v-model="password"><br>

        <input class="form-control" type="submit" value="로그인">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    login() {
      const username = this.username
      const password = this.password

      const payload = {
        username, password
      }

      this.$store.dispatch('logIn', payload)

    }
  }
}
</script>

<style scoped>
span {
    text-shadow: 1px 1px 2px lightgray;
  }
</style>