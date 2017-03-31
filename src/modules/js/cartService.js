import { fetch, rap } from 'js/fetch.js'

// 查看一下数据结构，如果一样，可以传type来识别租、售、配件
let url = {
  list: '/cart/list.do',
  add: '/cart/add.do',
  reduce: '/cart/reduce.do',
  remove: '/cart/remove.do'
}
url = rap(url)

class cart {
  static add(data) {
    return fetch(url.add, data)
  }
}

export default cart
