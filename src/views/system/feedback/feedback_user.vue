<template>
  <d2-container better-scroll>
    <div class="formTitle">用户反馈</div>
    <p>1. 请在此上传图片，以便我们充分理解您传达的内容：</p>
    <el-upload
      ref="pictureUpload"
      action="#"
      list-type="picture-card"
      :auto-upload="false">
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
      </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <p style="margin-top: 20px">2. 请选择您要反馈的问题类型，以便我们快速定位问题：</p>
    <div style="margin-top: 20px">
      <el-radio v-model="radio" label="色情低俗" border size="medium">色情低俗</el-radio>
      <el-radio v-model="radio" label="实用性差" border size="medium">实用性差</el-radio>
      <el-radio v-model="radio" label="系统bug" border size="medium">系统bug</el-radio>
      <el-radio v-model="radio" label="界面不美观" border size="medium">界面不美观</el-radio>
      <el-radio v-model="radio" label="功能升级" border size="medium">功能升级</el-radio>
    </div>
  <el-form
    class="Form"
    :model="formState"
    autocomplete="off"
    @submit.native.prevent
  >
    <p style="margin-top: 20px">3. 请在此留下您宝贵的建议或反馈：</p>
    <el-form-item name="feedback">
      <a-textarea :auto-size="{ minRows: 20, maxRows: 20 }" :max-length="1000" v-model="formState.feedback"/>
    </el-form-item>
    <el-form-item>
      <a-button size="large" block html-type="submit" type="primary" @click="submit">发送反馈</a-button>
    </el-form-item>
  </el-form>
    </d2-container>
</template>

<script>
import { reactive } from 'vue'
import { SendFeedback } from '@/api/modules/user/sys.feedback'
import { message } from 'ant-design-vue'
export default {
  name: 'feedback_user',
  data () {
    return {
      formState: reactive({
        feedback: ''
      }),
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      radio: '色情低俗'
    }
  },
  methods: {
    // 提交反馈信息
    submit () {
      const form = new FormData()
      form.append('Content', this.formState.feedback)
      form.append('Type', this.radio)
      for (let i = 0; i < this.$refs.pictureUpload.uploadFiles.length; i++) {
        form.append('Image', this.$refs.pictureUpload.uploadFiles[i].raw)
      }
      // 发送反馈接口
      SendFeedback(
        form
      ).then(res => {
        console.log('this is')
        console.log(res)
        if (res.Success) {
          console.log(this.$refs.pictureUpload)
          message.success('反馈成功！')
        } else {
          message.info('发送失败')
        }
      })
      // this.$router.push({ name: 'index' })
    },
    // 删除反馈图片
    handleRemove (file) {
      const uploadFiles = this.$refs.pictureUpload.uploadFiles
      for (let i = 0; i < uploadFiles.length; i++) {
        if (uploadFiles[i].url === file.url) {
          uploadFiles.splice(i, 1)
        }
      }
    },
    // 反馈图片预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 反馈图片下载
    handleDownload (file) {
      window.open(file.url)
    }
  }
}
</script>

<style scoped>
.Form {
  min-width: 500px;
}
.formTitle {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

</style>
