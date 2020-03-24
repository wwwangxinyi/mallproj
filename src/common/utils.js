export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) { //匹配所有yyyy/yy/
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str)); //根据格式补0
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

//防抖函数
//如果直接执行refresh，将执行30次
//将refresh函数传入debouce函数中，生成一个新函数
export function debounce(func, delay) {
  let timer = null //虽然是局部变量，但是被闭包函数引用后，不被销毁

  return function (...args) {
    //reset timer //将先前延迟执行的函数取消 直至最后一次
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
