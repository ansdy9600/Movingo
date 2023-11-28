import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

import router from '../router'

const API_URL = 'http://127.0.0.1:8000'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    articles: [],
    token: null,
    username: null,
    reviews: [],
    refresh: false,
    profile: [],
    
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    username(state){
      return state.username
    }
  },
  mutations: {
    GET_ARTICLES(state, articles) {
      state.articles = articles
    },
    POST_REVIEWS(state, reviews) {
      state.reviews = reviews
    },
    // auth
    // SIGN_UP(state, token){
    //   state.token = token
    // },

    // sign up && login
    SAVE_TOKEN(state, payload){
      state.token = payload.token
      state.username = payload.username
      router.push({name: 'main'})
    },
    LOG_OUT(state){
      state.token = null
      state.username = null
      router.push({name: 'main'})
    },
    GET_PROFILE(state, profile){
      state.profile = profile
    },
    REFRESH_PROFILE(state){
      state.refresh = !state.refresh
    }
  },
  actions: {
    getArticles(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/articles/`,
        headers: {
          Authorization: `Token ${ this.state.token }`
        }
      })
      .then((res) => {
        context.commit('GET_ARTICLES', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    sendReviewsToServer(context) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v2/reviews/`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
      .then((res) => {
        context.commit('POST_REVIEWS', res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    },
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
      .then(res => {
        payload = {
          token: res.data.key,
          username: username
        },
        context.commit('SAVE_TOKEN', payload)
        router.push({name: 'login'})
      })
      .catch(err => console.log(err))
    },
    logIn(context, payload) {
      const username = payload.username
      const password = payload.password
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
      .then(res => {
        payload = {
          token: res.data.key,
          username: username
        },
        context.commit('SAVE_TOKEN', payload)
      })
      .catch(err => console.log(err))
    },
    logOut(context) {
        context.commit('LOG_OUT')
    },
    getProfile(context) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/${this.user}/`
      })
      .then((res) => {
        context.commit('GET_PROFILE', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    refreshProfile(context) {
      context.commit('REFRESH_PROFILE')
    },
  },  
  modules: {
  }
})
