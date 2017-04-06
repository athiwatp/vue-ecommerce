import 'normalize.css'
import './login.scss'
import { Button } from 'element-ui'
import {checkphone, checkpwd} from 'js/validate.js'
import user from 'js/userService'
Vue.component(Button.name, Button)

import Top from 'components/top/top.vue'
import Foot from 'components/foot/foot.vue'

new Vue({
  el: '#body',
  data: {
    phone: '',
    pwd: '',
    phoneMsg: '',
    pwdMsg: '',
    load: false
  },
  methods: {
    validatePhone() {
      if (!this.phone) {
        this.phoneMsg = "请输入手机号"
        return false
      }
      if (!checkphone(this.phone)) {
        this.phoneMsg = '请输入11位正确的手机号'
        return false
      }
      this.phoneMsg = ''
      return true
    },
    validatePwd() {
      if (!this.pwd) {
        this.pwdMsg = '请输入密码'
        return false
      }
      if (!checkpwd) {
        this.pwdMsg = '密码错误'
        return false
      }
      this.pwdMsg = ''
      return true
    },
    login() {
      if (this.validatePhone() && this.validatePwd()) {
        this.load = true
        user.login({
          mobile: this.phone,
          pwd: this.pwd
        }).then(res => {
          console.log(res)
          location.href="index.html"
        },
        res => {
          console.log(res)
          this.load = false
        })
      }
    }
  },
  components: {
    Top,
    Foot
  }
})
