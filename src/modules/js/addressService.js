/**
 * Created by Administrator on 2017/4/24.
 */
import { fetch, rap } from 'js/fetch.js'

let url = {
  list: '/address/lists.do',

}
url = rap(url)

class address {
  static list(data) {
    return fetch(url.list, data)
  }

}

export default address
