<template>
  <div class="register">
    <!--      注册         -->
    <div class=" register-import" v-show="!isSuccess">
      <dl>
        <dt>注册手机号：</dt>
        <dd><input type="tel" v-model.trim="phone" @blur="validatePhone"></dd>
        <dd><span @click="getCode" >{{seconds==11?'获取验证码':seconds+'s'}}</span></dd>
      </dl>
      <p class="validate-msg" >{{phoneMsg}}</p>
      <dl>
        <dt>输入验证码：</dt>
        <dd><input type="type" v-model.trim="code" @blur="validateCode"></dd>
      </dl>
      <p class="validate-msg" >{{codeMsg}}</p>
      <dl>
        <dt>登录密码：</dt>
        <dd><input type="password" v-model="pwd" @blur="validatePwd"></dd>
      </dl>
      <p class="validate-msg" >{{pwdMsg}}</p>
      <dl>
        <dt>确认密码：</dt>
        <dd><input type="password" v-model="same" @blur="validateSame"></dd>
      </dl>
      <p class="validate-msg" >{{sameMsg}}</p>
      <button class="btn" @click="register">
        {{ btnmsg }}
    </button>
    </div>
    <!--        注册成功后         -->
    <div class="register-success" v-show="isSuccess">
      <div class="register-success-msg">
        <i class="icon-chache"></i>
        <p>{{ sucmsg }}</p>
      </div>
      <a class="btn" href="login.html">
        登&nbsp;&nbsp;&nbsp;&nbsp;录
    </a>
    </div>
  </div>
</template>

<script>
  import vm from './register.js'
  export default vm
</script>
