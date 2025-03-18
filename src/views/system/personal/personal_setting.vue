<template>
  <div>
  <d2-container better-scroll>
  <div class="PersonalSetting">
    <el-row>
      <el-col :offset="1" :span="22">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <el-button class="button" type="text" @click="handleBack"><i class="el-icon-arrow-left" />返回</el-button>

                <span>个人设置</span>
                <div></div>
              </div>
            </template>
            <el-tabs :tab-position="tabPosition">
              <el-tab-pane label="基本设置">
                <div class="set-title">
                  <span>基本设置</span>
                </div>
                <div class="set-info">
                  <div class="form-info">
                    <el-form ref="settingFormRef" :model="settingForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="用户名" prop="username">
                        <el-input v-model="settingForm.username" placeholder="请输入用户名" maxlength="10" :disabled="true"></el-input>
                      </el-form-item>
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model="settingForm.email" placeholder="请输入邮箱"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                        <el-input v-model="settingForm.password" placeholder="请输入密码验证身份"></el-input>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" :loading="updateLoading" @click="submitForm()">设置新邮箱</el-button>
                        <el-button @click="resetForm()">恢复邮箱初始值</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="avatar">
                    <div class="preview">
                      <span>头像</span>
                      <img :src="globalHttpUrl + this.Avatar" />
                    </div>
                    <el-upload
                      ref="pictureUpload"
                      :limit = 1
                      action="#"
                      list-type="picture-card"
                      :before-upload="beforeAvatarUpload"
                      :auto-upload="false"
                      style="margin-top: 5px;margin-bottom: 5px;">
                      <i slot="default" class="el-icon-plus"></i>
                      <div slot="file" slot-scope="{file}">
                        <img
                          class="el-upload-list__item-thumbnail"
                          :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                          <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleAvatarSuccess(file)"
                          >
                          <i class="el-icon-upload"></i>
                        </span>
                      </span>
                      </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="安全设置">
                <div class="set-title">
                  <span>安全设置</span>
                </div>
                <div class="secure-item">
                  <div class="secure-info">
                    <span class="secure-key">账户密码</span>
                    <span class="secure-value">当前密码强度：一般</span>
                  </div>
                  <div class="opera-btn" @click="dialogFormVisible=true"><span>修改</span></div>
                </div>
                <div class="secure-item">
                  <div class="secure-info">
                    <span class="secure-key">绑定邮箱</span>
                    <span class="secure-value">已绑定邮箱：{{this.Email}}</span>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card></div
        ></el-col>
    </el-row>
  </div>
    </d2-container>
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
    <el-form ref="PassWordModify" :model="PasswordModify" label-position="left" label-width="120px" :rules="PasswordRules">
      <el-form-item label="旧密码" prop="OldPassword">
        <el-input placeholder="请输入旧密码" type="password" v-model="PasswordModify.OldPassword" autocomplete="off" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="NewPassword">
        <el-input placeholder="请输入新密码" type="password" v-model="PasswordModify.NewPassword" autocomplete="off" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="再次输入新密码" prop="NewPasswordRepeat">
        <el-input placeholder="请再次输入新密码" type="password" v-model="PasswordModify.NewPasswordRepeat" autocomplete="off" style="width: 50%"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleModify">更改密码</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ModifyInfo, UpdateAvatar } from '@/api/modules/user/sys.user_management'
import util from '@/libs/util'
import global from '@/common/common'
export default {
  name: 'personal_setting',
  setup () {
    // const router = useRouter()
    const tabPosition = ref('left')
    let userPassword = ''
    const settingFormRef = ref()
    const noticeSwitch = reactive({
      userSwitch: false,
      sysSwitch: true,
      taskSwitch: true
    })
    const settingForm = reactive({
      username: util.cookies.get('username'),
      email: util.cookies.get('email'),
      password: ''
    })
    const updateLoading = ref(false)
    // 验证手机号码格式
    // eslint-disable-next-line no-unused-vars
    const validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号码不可为空哦'))
      } else {
        const reg = /^1[3-9]\d{9}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号码'))
        }
      }
    }
    // 表单规则
    const rules = {
      email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ],
      password: { required: true, message: '请输入密码验证身份', trigger: ['blur', 'change'] }
    }
    onMounted(() => {})
    // 修改邮箱
    const submitForm = () => {
      settingFormRef.value.validate(async (valid) => {
        if (valid) {
          updateLoading.value = true
          const data = {
            OldPassword: settingForm.password,
            NewEmail: settingForm.email
          }
          await ModifyInfo(data).then(res => {
            console.log(res)
            if (res.Success) {
              updateLoading.value = false
              userPassword = settingForm.password
              Message.success('修改邮箱成功！')
              util.cookies.set('email', settingForm.email)
            } else {
              updateLoading.value = false
              Message.error(`${res.Message}`)
            }
          }).catch(err => {
            console.error(err)
            updateLoading.value = false
            Message.error(`${err.response.data.Message}`)
          })
          // 执行通过校验以后的操作；
          return true
        }
        return false
      })
    }
    // 重置邮箱
    const resetForm = async () => {
      settingFormRef.value.resetFields()
      if (settingForm.email !== util.cookies.get('email')) {
        await ModifyInfo({
          OldPassword: userPassword,
          NewEmail: settingForm.email
        }).then(res => {
          console.log(res)
          if (res.Success) {
            updateLoading.value = false
            Message.success('已将邮箱设为初始值！')
            util.cookies.set('email', settingForm.email)
          } else {
            updateLoading.value = false
            Message.error(`${res.Message}`)
          }
        }).catch(err => {
          console.error(err)
          updateLoading.value = false
          Message.error(`${err.response.data.Message}`)
        })
      }
    }
    // 检验文件格式及大小是否符合要求
    const beforeAvatarUpload = (file) => {
      if (!/(gif|png|jpg|jpeg)$/i.test(file.type)) {
        Message.warning('上传头像图片只能是gif|png|jpg|jpeg 格式!')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        Message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
    return {
      userPassword,
      tabPosition,
      settingFormRef,
      settingForm,
      submitForm,
      resetForm,
      beforeAvatarUpload,
      rules,
      ...toRefs(noticeSwitch),
      updateLoading
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    // 删除上传头像
    handleRemove (file) {
      const uploadFiles = this.$refs.pictureUpload.uploadFiles
      for (let i = 0; i < uploadFiles.length; i++) {
        if (uploadFiles[i].url === file.url) {
          uploadFiles.splice(i, 1)
        }
      }
    },
    // 上传头像预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传头像下载
    handleDownload (file) {
      window.open(file.url)
    },
    // 上传头像
    handleAvatarSuccess  (file) {
      const newavatar = new FormData()
      newavatar.append('NewAvatar', file.raw)
      UpdateAvatar(newavatar).then(res => {
        if (res.Success) {
          Message.success('更改头像成功')
          this.Avatar = res.Image
          util.cookies.set('avatar', res.Image)
          this.handleRemove(file)
        }
      })
    },
    // 修改密码
    handleModify () {
      this.$refs.PassWordModify.validate(async (valid) => {
        if (valid) {
          if (this.PasswordModify.NewPassword !== this.PasswordModify.NewPasswordRepeat) {
            Message.error('请检查两次密码输入')
          } else {
            ModifyInfo({
              OldPassword: this.PasswordModify.OldPassword,
              NewPassword: this.PasswordModify.NewPassword
            }).then(res => {
              if (res.Success) {
                this.dialogFormVisible = false
                this.$router.push({ path: '/login' })
                Message.success('修改密码成功！')
              }
            }).catch(error => {
              console.log(error)
              Message.error(`${error.response.data.Message}`)
            })
          }
        }
      })
    }
  },
  data () {
    return {
      globalHttpUrl: global.httpUrl,
      Avatar: util.cookies.get('avatar'),
      Email: util.cookies.get('email'),
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      dialogFormVisible: false,
      // 表单
      PasswordModify: {
        OldPassword: '',
        NewPassword: '',
        NewPasswordRepeat: ''
      },
      // 表单规则
      PasswordRules: {
        OldPassword: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          }
        ],
        NewPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          }
        ],
        NewPasswordRepeat: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.PersonalSetting{
  margin-top:20px;
  .demo-ruleForm{
    text-align :left;
  }
  .set-title{
    text-align :left;
  }
  .secure-item{
    width:100%;
    padding:20px;
    border-bottom:1px solid #f0f0f0;
    display :flex;
    flex-direction:row;
    justify-content :space-between;
    align-items :center;
    .secure-info{
      display :flex;
      flex-direction:column;
      justify-content :flex-start;
      align-items :flex-start;
      .secure-key{
        margin-bottom: 4px;
        color: rgba(0,0,0,.85);
        font-size: 14px;
        line-height: 1.6;
      }
      .secure-value{
        color: rgba(0,0,0,.45);
        font-size: 14px;
        line-height: 1.6;
      }
    }
    .opera-btn{
      color:#1890ff;
      cursor:pointer;

    }
  }
  .set-info{
    display :flex;
    flex-direction :row;
    justify-content :space-around;
    align-items :flex-start;
    .form-info{
    }
    .avatar{
      display :flex;
      flex-direction:row;
      justify-content:flex-start;
      align-items :flex-end;
      .preview{
        display :flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items :flex-start;
        margin-right:20px;
        img{
          width:174px;
          height:174px;
          border-radius:50%;
        }
      }

      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
  .info{
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width:100%;
  }
}
</style>
