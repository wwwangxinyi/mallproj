import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import toast from 'components/common/toast/index.js'

import VueLazyload from 'vue-lazyload'
import fastClick from 'fastclick'
Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue() //全局的事件总线
//安装toast 插件
Vue.use(toast)
Vue.use(VueLazyload)

//解决移动端300ms延迟
fastClick.attach(document.body, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  toast, //an object
  render: h => h(App),
}).$mount('#app')
