<template>
  <d2-container better-scroll>
    <el-button @click="resetStateFilter">清除状态过滤器</el-button>
    <el-button @click="resetTypeFilter">清除内容类型过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="feedback_data.filter(data => !search || data.Type.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :default-sort = "{prop: 'Time', order: 'descending'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名：">
              <el-tag>{{ props.row.Username }}</el-tag>
            </el-form-item>
            <el-form-item label="时间：">
              <el-tag>{{ props.row.Time }}</el-tag>
            </el-form-item>
            <el-form-item label="状态：">
              <el-tag>{{ props.row.State }}</el-tag>
            </el-form-item>
            <el-form-item label="内容类型：">
              <el-tag>{{ props.row.Type }}</el-tag>
            </el-form-item>
          </el-form>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>点击查看图片详情:</span>
              <el-button style="float: right; padding: 3px 5px" type="danger" @click="handleReject(props.$index, props.row)">拒绝</el-button>
              <el-button style="float: right; padding: 3px 15px" type="text" @click="handleAccept(props.$index, props.row)">接受</el-button>
            </div>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <div class="demo-image__preview">
                      <el-image
                        style="width: 200px; height: 200px;margin-left: 15px;margin-top: 15px;margin-bottom: 15px"
                        :src="globalHttpUrl+props.row.Image[0]"
                        :preview-src-list="props.row.Image.map(val =>globalHttpUrl+val)">
                      </el-image>
                    </div>
                  </div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light"><div class="feedback_white"></div><div class="feedback_title">反馈内容</div><div class="feedback_text"><u_fold line="5">{{props.row.Content}}</u_fold><el-popover
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
        label="反馈人姓名"
        prop="Username">
      </el-table-column>
      <el-table-column
        sortable
        label="反馈时间"
        prop="Time">
      </el-table-column>
      <el-table-column
        label="内容类型"
        prop="Type"
        column-key="Type"
        :filters="[{text: '色情低俗', value: '色情低俗'}, {text: '实用性差', value: '实用性差'}, {text: '系统bug', value: '系统bug'}, {text: '界面不美观', value: '界面不美观'}, {text: '功能升级', value: '功能升级'}]"
        :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="State"
        column-key="State"
        :filters="[{ text: '未读', value: 'NotRead' }, { text: '已接受', value: 'Accepted' },{ text: '已拒绝', value: 'Rejected' }]"
        :filter-method="filterState">
        <template slot-scope="tag">
          <el-tag disable-transitions>{{tag.row.State}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="在此输入关键字搜索不同内容类型的反馈"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleAccept(scope.$index, scope.row)">接受</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    </d2-container>
</template>

<script>
import u_fold from '@/views/system/fold/components/fold/fold'
import { FBlist, Handlefeedback } from '@/api/modules/admin/sys.feedback'
import global from '@/common/common'
export default {
  name: 'feedback_admin',
  components: {
    u_fold
  },
  created () {
    // 获取反馈列表
    FBlist().then(res => {
      if (res.Success) {
        this.feedback_data = res.Data
      }
    })
  },
  data () {
    return {
      feedback_data: [],
      search: '',
      // 全局url变量
      globalHttpUrl: global.httpUrl
    }
  },
  methods: {
    // 接受反馈
    handleAccept (index, row) {
      row.State = 'Accepted'
      // 调用处理反馈接口
      Handlefeedback({
        FbId: row.Id,
        Operate: 'Accepted'
      }).then(res => {
        if (res.Success) {
          this.$message.success('接受反馈成功')
        }
      })
    },
    // 拒绝反馈
    handleReject (index, row) {
      row.State = 'Rejected'
      // 调用处理反馈接口
      Handlefeedback({
        FbId: row.Id,
        Operate: 'Rejected'
      }).then(res => {
        if (res.Success) {
          this.$message.success('拒绝反馈成功')
        }
      })
    },
    // 设置反馈不同状态的颜色
    tableRowClassName ({ row, rowIndex }) {
      if (row.State === 'NotRead') {
        return 'warning-row'
      } else if (row.State === 'Accepted') {
        return 'success-row'
      } else if (row.State === 'Rejected') {
        return 'reject-row'
      }
      return ''
    },
    // 重置状态过滤器
    resetStateFilter () {
      this.$refs.filterTable.clearFilter('State')
    },
    // 重置类型过滤器
    resetTypeFilter () {
      this.$refs.filterTable.clearFilter('Type')
    },
    // 重置所有过滤器
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    // 状态过滤器规则
    filterState (value, row) {
      return row.State === value
    },
    // 类型过滤器规则
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
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
