export default {
  //异步操作//判断操作
  addToCart({
    state,
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      //context解构为{state,commit}
      let temp = state.cartList.find(item => {
        return item.iid === payload.iid
      }) //返回在数组中找到的元素

      if (temp) {
        commit('addCounter', temp)
      } else {
        commit('initInCart', payload)
      }
    })
  }
}
