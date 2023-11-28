<template>
  <div style="width:100vw; height:100vh; background-color: #121212; color: white; overflow: auto;">
    <div class="container-lg overflow-auto" style="width:55%; height: 84%; background-color: #2D3134; margin-top: 9vh; border-radius: 32px;">
      <br>
      <div class="d-flex bd-highlight mb-3">
        <div class="p-2 bd-highlight">
          <span style="font-size: 56px; margin-left: 10px;">Community</span>
        </div>
        <div class="ms-auto p-2 bd-highlight mt-4">
          <router-link class="ms-2" :to="{ name: 'create' }">
          <button class="btn btn-outline-light btn-sm" style="margin-top: 12px">글작성</button>
          </router-link>
        </div>
      </div>
      <div><hr>
        <ArticleList />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'

export default {
  name: 'CommunityView',
  components: {
    ArticleList,
  },
  computed:{
    isLogin() {
      return this.$store.getters.isLogin // 로그인 여부
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      if (this.isLogin) {
        this.$store.dispatch('getArticles')
      } else {
        alert('로그인이 필요한 페이지입니다')
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style scoped>
span {
    text-shadow: 1px 1px 1px lightgray;
  }

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(40, 40, 40, 0.5); 
}

</style>