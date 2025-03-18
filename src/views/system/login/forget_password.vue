<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center">
      {{time}}
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            时间是一切财富中最宝贵的财富
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center">
          <div class="loginTitle">密码找回</div>
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default">
                <el-form-item prop="email">
                  <el-input
                    type="text"
                    v-model="formLogin.email"
                    placeholder="注册邮箱">
                    <i slot="prepend" class="fa fa-envelope-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="verify_code">
                  <el-row>
                    <el-col :span="14">
                      <el-input type="text"
                                v-model="formLogin.verify_code"
                                placeholder="验证码">
                        <i slot="prepend" class="fa fa-keyboard-o"></i>
                      </el-input>
                    </el-col>
                    <el-col :span="10">
                      <div style="text-align: center; margin-left: 10px">
                      <el-button
                        type="primary"
                        :disabled="sendvc_disable || mail_empty"
                        :style="{width: '100%'}"
                        @click="onSendVC">
                        发送{{sendvc_disable ? `(${count})` : ''}}</el-button></div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    type="text"
                    clearable
                    v-model="formLogin.code"
                    @keyup.enter.native="submit"
                    placeholder="图形验证码">
                    <template slot="append">
                      <div class="login-code">
                        <img id="img" :src="codeUrl+timecode" @click="getCode">
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
                <el-button
                  size="default"
                  @click="submit"
                  type="primary"
                  class="button-login">
                  找回密码
                </el-button>
              </el-form>
            </el-card>
            <p
              class="page-login--options"
              flex="main:justify cross:center">
              <span><el-link
                type="primary"
                :underline="false"
                @click="toLink('/login')"
              >已经找回密码？返回登录
            </el-link></span>
            </p>
          </div>
        </div>
        <div class="page-login--content-footer">
<!--          <p class="page-login&#45;&#45;content-footer-locales">-->
<!--            <a-->
<!--              v-for="language in $languages"-->
<!--              :key="language.value"-->
<!--              @click="onChangeLocale(language.value)">-->
<!--              {{ language.label }}-->
<!--            </a>-->
<!--          </p>-->
<!--          <p class="page-login&#45;&#45;content-footer-options">-->
<!--            <a href="#">帮助</a>-->
<!--            <a href="#">隐私</a>-->
<!--            <a href="#">条款</a>-->
<!--          </p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import localeMixin from '@/locales/mixin.js'
import { FindPasswd, LoginVerificationCheck, SendVc } from '@/api/modules/user/sys.auth'
import { computed, reactive, ref } from 'vue'
export default {
  mixins: [
    localeMixin
  ],
  setup () {
    const formLogin = reactive({
      email: '',
      verify_code: '',
      code: ''
    })
    // eslint-disable-next-line camelcase
    const mail_empty = computed(() => {
      return !formLogin.email
    })

    // eslint-disable-next-line camelcase
    const findback_disable = ref(true)
    // eslint-disable-next-line camelcase
    const sendvc_disable = ref(false)
    const count = ref(60)
    return {
      formLogin,
      findback_disable,
      sendvc_disable,
      count,
      mail_empty
    }
  },
  data () {
    return {
      timeInterval: null,
      // 登录界面显示的时间
      time: dayjs().format('HH:mm:ss'),
      // 验证码时间戳
      timecode: new Date().getTime().toString(),
      // 验证码是否正确标志
      is_code_true: 1,
      // 验证码
      codeUrl: 'https://api.it120.cc/WHU/verification/pic/get?key=',
      // 快速选择用户
      dialogVisible: false,
      users: [
        {
          name: 'Admin',
          username: 'admin',
          password: 'admin'
        },
        {
          name: 'Editor',
          username: 'editor',
          password: 'editor'
        },
        {
          name: 'User1',
          username: 'user1',
          password: 'user1'
        }
      ],
      // 表单校验
      rules: {
        email: [
          {
            required: true,
            message: '请输入注册邮箱',
            trigger: 'blur'
          }
        ],
        verify_code: [
          {
            required: true,
            message: '请输入邮箱验证码',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入图形验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    // 设置函数调用时间间隔
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    // 获取验证码
    getCode () {
      this.timecode = new Date().getTime().toString()
      document.getElementById('img').src = 'https://api.it120.cc/WHU/verification/pic/get?key=' + this.timecode
      console.log(this.timecode)
    },
    // 点击获取验证码按钮触发事件
    onSendVC () {
      this.sendvc_disable = true
      this.findback_disable = false
      const timer = setInterval(() => {
        if (this.count > 0) {
          this.count--
        } else {
          this.count = 60
          clearInterval(timer)
          this.sendvc_disable = false
        }
      }, 1000)
      // 调用获取验证码接口
      SendVc({
        Email: this.formLogin.email
      }).then(res => {
        if (res.Success) {
          this.$message.success('已发送至邮箱, 请注意查收')
        } else {
          this.$message.info(`验证码发送失败 ${res.Message}`)
        }
      }).catch(err => console.log(err))
    },
    /**
     * @description 提交表单
     */
    // 提交信息
    submit () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          await LoginVerificationCheck({
            key: this.timecode,
            code: this.formLogin.code
          }).then(res => {
            if (res.data.code !== 0) {
              this.is_code_true = 0
            } else {
              this.is_code_true = 1
            }
          }).catch(err => {
            console.log(err)
            this.getCode()
          })
          if (this.is_code_true === 0) {
            this.$message.error('验证码错误，请重新输入')
            this.getCode()
            return
          }
          // 调用找回密码接口
          FindPasswd({
            Email: this.formLogin.email,
            VC: this.formLogin.verify_code
          }).then(res => {
            if (res.Success) {
              this.$message.success('找回密码成功, 密码已发送至邮箱, 请注意查收')
              this.$router.push({ path: '/login' })
            } else {
              this.$message.info(`找回密码失败 ${res.Message}`)
            }
          }).catch(err => {
            console.log(err)
            this.getCode()
          })
        } else {
          this.getCode()
          // 登录表单校验失败
          this.$message.error('表单校验失败，请检查')
        }
      })
    },
    // url跳转
    toLink (url) {
      this.$router.push({
        path: url
      })
    }
  }
}
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $backgroundColor: #F0F2F5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 .5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #FFF;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0%{
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100%{
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
.loginTitle {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
