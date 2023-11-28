<template>
  <div style="width:100vw; height:100vh; background-color: #121212; color: white; overflow: auto;">
    <div class="container-lg overflow-auto" style="width:55%; height: 84%; background-color: #2D3134; margin-top: 9vh; border-radius: 32px;">
      <br>
      <div class="d-flex bd-highlight mt-1">
        <div class="p-2 flex-grow-1 bd-highlight">
          <span style="font-size: 40px; margin-left: 12px;"><i class="fas fa-user"></i> {{ username }}</span>
        </div>

        <div class="p-2 bd-highlight me-4 mt-1">
          <div class="d-flex">

            <!-- <div style="text-align: center">
              <span>게시물</span><br>
              <span>22</span>
            </div>
            
            <div class="ms-4" style="text-align: center;">
              <span>팔로워</span><br>
              <span>100</span>
            </div>

            <div class="ms-4" style="text-align: center;">
              <span>팔로잉</span><br>
              <span>98</span>
            </div> -->
          </div><br>
          <div class="ms-auto bd-highlight">
          </div> 
          
        </div> 
      </div>
      <hr>
      <!-- <button class="btn" :class="isFollowed ? 'btn-secondary' : 'btn-primary'" style="width: 100%;" @click="changeFollow()">{{ isFollowed ? '팔로잉' : '팔로우' }}</button> -->
        <div v-for="article in articles" :key="article">
        <div class="d-flex bd-highlight mb-3">
          <div class="p-2 bd-highlight">
            <span style="margin-left: 2px; font-size: 17px;"><i class="fa-solid fa-hashtag ms-1"></i> {{ article.id }}</span><br>
            <span style="margin-left: 3px; font-size: 36px;">{{ article.title }}</span><br><br>
            <span style="margin-left: 5px; font-size: 17px;">{{ article.content }}</span>
          </div>
          <div class="ms-auto p-2 bd-highlight">
            <span style="color: lightgray; font-size: 13px">{{ article.created_at.slice(5,7) }}.{{ article.created_at.slice(8,10) }}
            {{ article.created_at.slice(11,13) }}:{{ article.created_at.slice(14,16) }}</span><br>
          </div>
        </div>
        <hr>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ProfileView',
  data() {
    return {
      articles: [],
      profile: [],
      refresh: this.$store.state.refresh,
      username: this.$route.params.username
    }
  },
  mounted() {
    this.fetchUserArticles()
  },
  methods: {
    fetchUserArticles() {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/user_article/`,
        headers: {
          Authorization: `Token ${ this.$store.state.token }`
        }
    })
      .then(response => {
        this.articles = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    getProfile() {
      if (this.user) {
        axios({
          method: 'get',
          url: `${API_URL}/accounts/${this.user}/`
        })
        .then((res) => {
          this.$store.dispatch('getProfile', res.data)
          this.profile = this.$store.state.profile
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    refreshProfile() {
      this.getProfile()
    },  
  },
  created: function () {
    const token = localStorage.getItem('jwt')
    if (token) {
      this.getProfile()
    }
  },
  computed: {
    getRefresh () {
        return this.$store.state.refresh
    }
  },
  }
</script>

<style scoped>
span {
    text-shadow: 1px 1px 1px lightgray;
    margin-left: 10px;
  }
.textshadow {
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