import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'
import BingoView from '../views/BingoView.vue'
import ProfileView from '../views/ProfileView.vue'
import SignUpView from '../views/SignUpView.vue'
import CommunityView from '../views/CommunityView.vue'
import CreateView from '../views/CreateView.vue'
import CommunityDetailView from '../views/CommunityDetailView.vue'
import CommunityEditView from '../views/CommunityEditView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView
  },
  {
    path: '/:movieId',
    name: 'moviedetail',
    component: MovieDetailView
  },
  {
    path: '/bingo',
    name: 'bingo',
    component: BingoView
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/community',
    name: 'community',
    component: CommunityView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView
  },
  {
    path: '/communitydetail/:id',
    name: 'communitydetail',
    component: CommunityDetailView
  },
  {
    path: '/communityedit',
    name: 'communityedit',
    component: CommunityEditView
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
