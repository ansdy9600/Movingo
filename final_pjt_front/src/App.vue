<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg" style="background-color: transparent; width: 98vw; position: fixed; top: 1%; left: 1%; z-index: 9999">
      <div class="container-fluid">
        <img class="mt-1 me-2" src="./assets/movingo.png" style="width:92px; filter: drop-shadow(4px 5px 5px black)" alt="">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <a class="nav-link" href="#">
              <router-link :to="{ name: 'main' }">Home</router-link></a>
            <a class="nav-link" href="#">
              <router-link :to="{ name: 'community' }">Community</router-link></a>
            <a class="nav-link" href="#">
              <router-link :to="{ name: 'bingo' }">Bingo</router-link></a>
      
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="검색" aria-label="Search" v-if="showSearchInput"
            v-model="searchKeyword" @keyup="searchMovie(searchKeyword)" @keyup.enter="goToPage()">
            <datalist id="datalistOptions">
              <option v-for="title in searchList" :key="title" :value="title.name"></option>
            </datalist>
            <button class="btn btn-outline text-light" type="button" @click="toggleSearchInput"><i :class="iconClass"></i></button>
          </form>

          <div class="dropdown dropstart">
            <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fas fa-user text-light mb-1"></i>
            </button>
            <ul class="dropdown-menu" style="background-color: #2D3134">
              <li v-if="isLogin"><router-link class="dropdown-item" style="text-decoration: none;" :to="{ name: 'profile', params: { username: username } }">Profile</router-link></li>
              <li v-if="!isLogin"><router-link class="dropdown-item" :to="{ name: 'login' }">Login</router-link></li>
              <li v-if="!isLogin"><router-link class="dropdown-item" :to="{ name: 'signup' }">Signup</router-link></li>
              <li v-if="isLogin"><a class="dropdown-item" href="#" @click="logOut()">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      showSearchInput: false,
      isSearchOpen: null,
      searchKeyword: null,
      searchList: [],
      apiKey: '5d04d2a1b7de0a896d4252e4e473a01b',
      searchedData: null,
    };
  },
  computed: {
    iconClass() {
      return this.showSearchInput ? 'fas fa-times' : 'fas fa-search'
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
    username() {
      return this.$store.getters.username
    }

  },
  methods: {
    searchMovie(kw) {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?query=${kw}&api_key=${this.apiKey}&include_adult=false&language=ko-KR&page=1`
      })
      .then((response) => {
        this.searchList = []
        const responseTemp = response.data.results.slice(0,10)
        for (let i=0; i<responseTemp.length; i++) {
          this.searchList.push({name:responseTemp[i].title, id:responseTemp[i].id})
        }
        this.searchedData = this.searchList[0]
      })

    },

    goSearch() {
      this.searchedData = this.searchList[0].id
      
    },

    goToPage() {
      window.location.href = 'http://localhost:8080/'+this.searchedData.id
    },

    toggleSearchInput() {
      this.showSearchInput = !this.showSearchInput;
    },
    logOut() {
      this.$store.dispatch('logOut')
    }
  }
}
</script>



<style scoped>
#app {
  position: relative;
}

nav a {
  text-shadow: 2px 2px 4px black;
  text-decoration: none;
  color: #E5E5E5;
  font-size: 110%

}

nav a.router-link-exact-active {
  text-decoration: none;
  color: white;
}

.text-light {
  text-shadow: 2px 2px 4px black;
  text-decoration: none;
  color: white;
}

.dropdown-item {
  text-decoration: none;
  text-shadow: none;
}

</style>