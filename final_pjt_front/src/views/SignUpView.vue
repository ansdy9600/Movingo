<template>
  <div style="width:100vw; height:100vh; background-color: #121212; color: white; overflow: auto;">
    <br><br>
    <div class="d-flex justify-content-center" style="height:75%; width: 100vw; margin-top:16px;">
      <form class="justify-content-center col-8" style="width: 32vw; text-align: center;" @submit.prevent="signUp">
        <span style="font-size: 3.5vw ">회원가입</span><br>
        <span>이미 계정이 있습니까? <router-link style="color: white; text-decoration: none;" :to="{ name: 'login' }">로그인</router-link></span><br><br>
        <!-- <label for="username">username : </label> -->
        <input class="form-control" type="text" id="username" placeholder="아이디" v-model="username"><br>
        <input class="form-control" type="password" id="password1" placeholder="비밀번호" v-model="password1"><br>
        <input class="form-control" type="password" id="password2" placeholder="비밀번호 확인" v-model="password2"><br>
        
        <input class="form-control" type="submit" value="가입하기">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  methods: {
    signUp() {
      // console.log('signup')
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username, password1, password2
      }

      this.$store.dispatch('signUp', payload)

    }
  }
}
</script>

<style scoped>
span {
    text-shadow: 1px 1px 2px lightgray;
  }

  </style>