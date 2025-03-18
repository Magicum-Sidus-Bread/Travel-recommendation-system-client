<template>
  <d2-container better-scroll>
    <el-table
      ref="filterTable"
      :data="user_form.filter(data => !search || data.Username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名 ：">
              <el-tag>{{ props.row.Username }}</el-tag>
            </el-form-item>
            <el-form-item label="邮箱 ：">
              <el-tag>{{ props.row.Email }}</el-tag>
            </el-form-item>
            <el-form-item label="密码 ：">
              <el-tag>{{ props.row.Password }}</el-tag>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="Username">
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="Email">
      </el-table-column>
      <el-table-column
        label="密码"
        prop="Password">
      </el-table-column>
      <el-table-column
        align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="在此输入关键字搜索用户"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleForbid(scope.$index, scope.row)">封号</el-button>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import u_fold from '@/views/system/fold/components/fold/fold'
import { GetUserlist, BanUser } from '@/api/modules/admin/sys.user_management'
export default {
  name: 'user_management',
  components: {
    u_fold
  },
  created () {
    // 获取用户列表信息
    GetUserlist().then(res => {
      if (res.Success) {
        this.user_data = res.Data
        this.user_form = this.user_data.map((item, index) => Object.assign(item, { State: '正常' }))
      }
    })
  },
  data () {
    return {
      user_data: [],
      search: '',
      user_form: []
    }
  },
  methods: {
    // 封号处理
    handleForbid (index, row) {
      BanUser({
        Username: row.Username
      }).then(res => {
        if (res.Success) {
          this.user_form.splice(index, 1)
          this.$message.success('封号成功！')
        } else {
          this.$message.error('请求失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.State === '正常') {
        return 'success-row'
      }
      return ''
    },
    resetStateFilter () {
      this.$refs.filterTable.clearFilter('State')
    },
    filterState (value, row) {
      return row.State === value
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.box-card {
  width: 1080px;
  margin-top: 20px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 230px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.feedback_white{
  height: 20px;
}
.feedback_text{
  margin-left: 20px;
  margin-right: 20px;
}
.feedback_title{
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
/*测试*/
.el-scrollbar {
  height: 100px;
}
.el-scrollbar__wrap {
  overflow-x: hidden!important;
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-table .reject-row {
  background: #AD3048;
}
</style>
