<template>
  <div class="feedback">
    <h4 class="mt13">欢迎您给我们提出网站使用感受和建议！</h4>
    <div class="feedback-content mt13">
      <dl>
        <dt>标题：</dt>
        <dd><input type="text" v-model.trim='title'></dd>
      </dl>
      <dl>
        <dt>内容：</dt>
        <dd>
          <textarea placeholder="内容为必填选项！" v-model.trim='content'></textarea>
          <p>请上传凭证</p>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </dd>
      </dl>
      <dl>
        <dt>验证码：</dt>
        <dd>
          <input type="text" v-model.trim='code'>
          <img :src="codeUrl" alt="验证码" @click='changeCode' width="80" height="30">
          <button @click='feedSubmit'>提交</button>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
  import user from 'js/userService.js'
  import {Upload,Dialog} from 'element-ui'
  Vue.use(Upload)
  Vue.use(Dialog)
  export default {
    data() {
      return {
        title: '',
        content: '',
        code: '',
        codeUrl: '',
        dialogVisible: false,
        dialogImageUrl: '',

      }
    },
    created(){
      this.changeCode()
    },
    methods: {
      changeCode() {
        user.code().then(res => {
          this.codeUrl = res.data.codeImg
        })
      },
      feedSubmit() {

      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl =  file.url
        this.dialogVisible = true
      },
      handleRemove() {

      }
    }
  }
</script>


<style lang="scss">
  .add-pic-content {
    height: 101px;
    img {
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }
    a {
      display: inline-block;
      height: 50px;
      width: 50px;
      vertical-align: top;
      margin-top: 25px;
      background: url(imgs/add-pic-btn.png) no-repeat center;
    }
    .add-img {
      position: relative;
      display: inline-block;
    }
    i {
      position: absolute;
      right: 15px;
      top: -10px;
      display: block;
      height: 22px;
      width: 22px;
      background: url(imgs/delete-btn.png) no-repeat center;
    }
  }
</style>
