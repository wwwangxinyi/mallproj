import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

Vue.config.productionTip = false

//涉及到非父子组件中的通信
Vue.prototype.$bus = new Vue() //全局的事件总线
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
