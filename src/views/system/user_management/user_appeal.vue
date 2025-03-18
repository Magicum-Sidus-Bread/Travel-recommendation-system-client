<template>
  <d2-container better-scroll>
        <el-button @click="resetStateFilter">清除状态过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="appeal_data.filter(data => !search || data.State.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名 ：">
              <el-tag>{{ props.row.Username }}</el-tag>
            </el-form-item>
                        <el-form-item label="状态 ：">
                          <el-tag>{{ props.row.State }}</el-tag>
                        </el-form-item>
          </el-form>
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <el-button style="float: right; padding: 3px 0" type="danger" @click="handleReject(props.$index, props.row)">驳回申诉</el-button>
                        <el-button style="float: right; padding: 3px 5px" type="text" @click="handleAccept(props.$index, props.row)">同意解封</el-button>
                      </div>
                      <el-row>
                        <el-col :span="24"><div class="grid-content bg-purple-light"><div class="feedback_white"></div><div class="feedback_title">申诉理由</div><div class="feedback_text"><u_fold line="5">{{props.row.Content}}</u_fold><el-popover
                          placement="right"
                          width="400"
                          trigger="click">
                          <el-card class="box-card1">
                            <div class="text item">
                              {{props.row.Content}}
                            </div>
                          </el-card>
                          <el-button style="float: right; padding: 3px 5px;margin-top: 10px;" type="text" slot="reference">若地方太小，点击查看更多内容</el-button>
                        </el-popover>
                        </div></div></el-col>
                      </el-row>
                    </el-card>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="Username">
      </el-table-column>
            <el-table-column
              label="状态"
              prop="State"
              column-key="State"
              :filters="[{ text: '未读', value: 'NotRead' }, { text: '已同意', value: 'Accept' },{ text: '已拒绝', value: 'Reject' }]"
              :filter-method="filterState">
              <template slot-scope="tag">
                <el-tag disable-transitions>{{tag.row.State}}</el-tag>
              </template>
            </el-table-column>
      <el-table-column
        align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="在此输入关键字搜索不同状态的申诉"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleAccept(scope.$index, scope.row)">同意解封</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleReject(scope.$index, scope.row)">驳回申诉</el-button>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
import u_fold from '@/views/system/fold/components/fold/fold'
import { ComplaintList, handleComplaint } from '@/api/modules/admin/sys.user_management'
export default {
  name: 'user_appeal',
  components: {
    u_fold
  },
  created () {
    // 获取申诉信息
    ComplaintList().then(res => {
      if (res.Success) {
        this.appeal_data = res.Data
      }
    })
  },
  data () {
    return {
      // 用于存储申诉信息的列表
      appeal_data: [],
      search: ''
    }
  },
  methods: {
    // 同意用户解封申诉处理函数
    handleAccept (index, row) {
      console.log(index, row)
      if (row.State === 'NotRead') {
        // 调用同意解封接口
        handleComplaint({
          Username: row.Username,
          Operate: 'Accept'
        }).then(res => {
          if (res.Success) {
            row.State = 'Accept'
            this.$message.success('解封用户成功！')
          }
        })
      } else if (row.State === 'Accept') {
        this.$message.info('已经同意该用户解封申诉，不能再次操作！')
      } else {
        this.$message.info('已拒绝该用户申诉，不能再次操作！')
      }
    },
    // 拒绝用户解封申诉处理函数
    handleReject (index, row) {
      if (row.State === 'NotRead') {
        // 调用同意解封接口
        handleComplaint({
          Username: row.Username,
          Operate: 'Reject'
        }).then(res => {
          if (res.Success) {
            row.State = 'Reject'
            this.$message.success('拒绝用户申诉成功！')
          } else {
            this.$message.error('请求失败')
          }
        }).catch(error => {
          console.log(error)
        })
      } else if (row.State === 'Accept') {
        this.$message.info('已同意该用户申诉，不能再次操作！')
      } else {
        this.$message.info('已拒绝该用户申诉，不能再次操作！')
      }
    },
    // 设置申诉不同状态显示的颜色
    tableRowClassName ({ row, rowIndex }) {
      if (row.State === 'NotRead') {
        return 'warning-row'
      } else if (row.State === 'Accept') {
        return 'success-row'
      } else if (row.State === 'Reject') {
        return 'reject-row'
      }
      return ''
    },
    // 重设过滤器信息
    resetStateFilter () {
      this.$refs.filterTable.clearFilter('State')
    },
    // 重设所有过滤器
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    // 过滤器规则
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
