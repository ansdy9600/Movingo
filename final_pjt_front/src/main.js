import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueYoutube from 'vue-youtube'
import VueCarousel from 'vue-carousel'
import Carousel3d from 'vue-carousel-3d'
//  npm install carousel
// npm install -S vue-carousel-3d
// npm install

// Vue.use(BootstrapVue)
Vue.use(VueYoutube)
Vue.use(VueCarousel)
Vue.use('3DCaro', Carousel3d)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
