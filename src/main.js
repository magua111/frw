import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import CryptoJS from 'crypto-js'
import vueResouce from 'vue-resource'
import vuebus from 'vue-bus'
import axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/store'
import vSelect from 'vue-select'
import VDistpicker from 'v-distpicker'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/main.css'
import getOrg from './assets/js/common'
import validate from './assets/js/validate'
import VueCoreImageUpload from 'vue-core-image-upload'
import 'babel-polyfill'
// import $ from 'jquery'
import 'element-ui/lib/theme-default/index.css'
Vue.use(vueResouce)
window.eventBus = new Vue();

Vue.prototype.$axios = axios;
Vue.prototype.router = router;
Vue.prototype.getOrg = getOrg
Vue.prototype.validate = validate

Vue.component('v-select', vSelect)
Vue.component('v-distpicker', VDistpicker)
Vue.use(ElementUI)
Vue.use(vuebus)
Vue.use(Vuex) 

Vue.config.debug = true;

axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  next()
});

Vue.http.interceptors.push((request,next)=>{
  next((response)=>{
    if(response.status == 0){
      router.replace({
        path : '/'
      })
    }
  })
})

new Vue({
  el: '#app',
  router,
  store,
  render: function (createElement) {
    return createElement(App)
  },
})



