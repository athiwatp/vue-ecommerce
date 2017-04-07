/**
 * Created by Administrator on 2017/4/5.
 */
import {fetch,rap} from 'js/fetch.js'

let url = {
  info: '/user/getUser.do',
  logout: '/user/logout.do',
  login: '/user/login.do',
  register: '/user/register.do',
  getCode: '/user/getCode.do'
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

  static register(data) {
    return fetch(url.register, data)
  }

  static getCode(data) {
    return fetch(url.getCode, data)
  }
}

export default user
