import Vue from 'vue'
import App from './App'
import store from './store'
import api from './api'
import loadingapi from './api/loadingapi.js'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$loadingapi = loadingapi
const app = new Vue({ 
    ...App,
	store
})
app.$mount()
