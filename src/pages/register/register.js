import 'normalize.css'
import './register.scss'

import { Message } from 'element-ui'
import { checkphone, checkpwd, checksame } from 'js/validate.js'
import { fetch, rap } from 'js/fetch.js'

let url = {
  register: '/user/register.do',
  getCode: '/user/getCode.do'
}
url = rap(url)

let ss = 11

new Vue({
  el: '.register',
  data: {
    phone: '',
    phoneMsg: '',
    code: '',
    codeMsg: '',
    pwd: '',
    pwdMsg: '',
    same: '',
    sameMsg: '',
    seconds: ss,
    timer: null,
    isSuccess: false
  },
  methods: {
    validatePhone() {
      if (!this.phone) {
        this.phoneMsg = '请填写手机号'
        return false
      }
      if (!checkphone(this.phone)) {
        this.phoneMsg = '请输入11位正确的手机号码'
        return false
      }
      this.phoneMsg = ''
      return true
    },
    getCode() {
      if (this.validatePhone()) {
        if(this.seconds != ss){
          return false
        }
        this.seconds=10
        this.timer = setInterval(this.countDown,1000)
        fetch(url.getCode, {
          mobile: this.phone
        }).then(res => {
          Message({
            message: res.message,
            type: 'success'
          })
        })
      }
    },
    countDown() {
      this.seconds--;
      if(this.seconds <= 0){
        clearInterval(this.timer)
        this.timer = null
        this.seconds = ss
      }
    },
    validateCode() {
      if(!this.code) {
        this.codeMsg = '请输入验证码'
        return false
      }
      this.codeMsg = ''
      return true
    },
    validatePwd() {
      if (!this.pwd) {
        this.pwdMsg = '请输入密码'
        return false
      }
      if (!checkpwd(this.pwd)) {
        this.pwdMsg = '密码至少需6位'
        return false
      }
      this.pwdMsg = ''
      return true
    },
    validateSame() {
      if (!this.pwd) {
        this.sameMsg = '请输入密码'
        return false
      }
      if (!checksame(this.pwd, this.same)) {
        this.sameMsg = '密码不一致'
        return false
      }
      this.sameMsg = ''
      return true
    },
    register() {
      // 表单的校验、请求参数
      if (this.validatePhone() && this.validateCode() && this.validatePwd() && this.validateSame()) {
        fetch(url.register,{
          code: this.code,
          mobile: this.phone,
          pwd: this.pwd
        }).then(res => {
          console.log(res)
          this.isSuccess = true
        },
        res => {
          console.log(res)
        })
      }
    }
  }
})
