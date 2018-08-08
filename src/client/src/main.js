// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from "./store/store.js"
import App from './App'
import router from './router'
import Vuetify from "vuetify"
import 'vuetify/dist/vuetify.min.css'
import VueSweetalert2 from 'vue-sweetalert2';
import VueLodash from 'vue-lodash'
import 'pretty-checkbox/dist/pretty-checkbox.css'

// Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueSweetalert2)
Vue.use(VueLodash)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
