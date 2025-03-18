<template>
  <div>
  <el-tooltip
    effect="dark"
    content="账号解封申诉"
    placement="bottom">
  <el-button class="d2-mr btn-text can-hover" type="text" @click="handleVisible">
    <d2-icon name="fa fa-handshake-o" style="font-size: 18px;"/>
  </el-button>
    </el-tooltip>
  <el-dialog
    title="账号解封申诉"
    width="600px"
    :visible.sync="dialogVisible"
    :append-to-body="true">
    <el-form :model="AppealForm">
      <el-form-item label="申诉方式" :label-width="formLabelWidth">
        <el-select v-model="AppealForm.Type" placeholder="申诉方式">
          <el-option label="用户名" value="Username"></el-option>
          <el-option label="邮箱" value="Email"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名或邮箱" :label-width="formLabelWidth">
        <el-input v-model="AppealForm.Account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="申诉理由" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="6" v-model="AppealForm.Content" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAppeal()">发 送 申 诉</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { Complaint } from '@/api/modules/user/sys.auth'
import util from '@/libs/util'
export default {
  methods: {
    handleAppeal () {
      Complaint({
        Type: this.AppealForm.Type,
        Account: this.AppealForm.Account,
        Content: this.AppealForm.Content
      }).then(res => {
        if (res.Success) {
          this.dialogVisible = false
          this.$message.success('申诉成功，请耐心等待结果')
        } else {
          this.$message.warning(`${res.Message}`)
        }
      })
    },
    handleVisible () {
      if (util.cookies.get('role') === 'error') {
        this.dialogVisible = true
      } else if (util.cookies.get('role') === 'user') {
        this.$message.info('您的账号现在为正常状态，无需进行账号申诉！')
      } else if (util.cookies.get('role') === 'admin') {
        this.$message.info('管理员无法进行账号申诉！')
      }
    }
  },
  data () {
    return {
      dialogVisible: false,
      AppealForm: {
        Type: '',
        Account: '',
        Content: ''
      },
      formLabelWidth: '120px'
    }
  }
}
</script>
