import Toast from './toast.vue'
const obj = {}

obj.install = function (Vue) {
  //创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //new的方式，根据组件构造器可以创造一个组件对象
  const toast = new toastConstructor()
  //将组件对象手动挂载
  toast.$mount(document.createElement('div'))
  //toast.$el对应的就是divt
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast //为app中注册的toast实例 非Toast组件
}

export default obj
