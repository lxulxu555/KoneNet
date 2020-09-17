import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/config/rem'
import {Message,Modal} from "ant-design-vue";
Vue.use(Modal)

Vue.prototype.$message = Message
Vue.config.productionTip = false

// if (process.env.NODE_ENV == 'development') require('@/api/mock')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
