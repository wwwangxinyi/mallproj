export default {
  initInCart(state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  },
  addCounter(state, payload) {
    payload.count++
  },
}
