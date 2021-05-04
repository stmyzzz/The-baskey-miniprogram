import Vue from 'vue'
import App from './App'
import store from './store'
import api from './api'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api
const app = new Vue({ 
    ...App,
	store
})
app.$mount()
