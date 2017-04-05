/**
 * Created by Administrator on 2017/4/5.
 */
import {fetch,rap} from 'js/fetch.js'

let url = {
  info: '/user/getUser.do',
  logout: '/user/logout.do',
  login: '/user/login.do'
}
url = rap(url)

class user {
  static login(data) {
    return fetch(url.login, data)
  }

  static getInfo() {
    return fetch(url.info)
  }

  static logout() {
    return fetch(url.logout)
  }
}

export default user
