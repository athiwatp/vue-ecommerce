import { fetch, rap } from 'js/fetch.js'

let url = {
  add: '/collect/add.do',
  cancel: '/collect/cancel.do'
}
url = rap(url)

class collect {

  static add(data) {
    return fetch(url.add, data)
  }

  static cancel(data) {
    return fetch(url.cancel, data)
  }

}

export default collect
