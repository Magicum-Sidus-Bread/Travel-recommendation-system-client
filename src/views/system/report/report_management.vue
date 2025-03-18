<template>
  <d2-container better-scroll>
    <el-button @click="resetStateFilter">清除状态过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="Report_data.filter(data => !search || data.State.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :default-sort = "{prop: 'ReportUser', order: 'descending'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="举报人：">
              <el-tag>123456</el-tag>
            </el-form-item>
            <el-form-item label="被举报人：">
              <el-tag>{{ props.row.Username }}</el-tag>
            </el-form-item>
            <el-form-item label="评论时间：">
              <el-tag>{{ props.row.Time }}</el-tag>
            </el-form-item>
            <el-form-item label="评论城市：">
              <el-tag>{{ props.row.City }}</el-tag>
            </el-form-item>
            <el-form-item label="评论景点：">
              <el-tag>{{ props.row.Place }}</el-tag>
            </el-form-item>
            <el-form-item label="状态：">
              <el-tag>{{ props.row.State }}</el-tag>
            </el-form-item>
          </el-form>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-avatar :size="47" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <span style="font-size: 20px;margin-top:10px;margin-left: 25px;font-weight: bold;">{{props.row.Username}}</span>
              <span style="font-size: 15px;margin-top:15px;margin-left: 200px;">{{props.row.Time}}</span>
            </div>
            <div class="text item">

              <div style="font-weight: bold;margin-bottom: 5px;">评论景点：{{props.row.Place}}</div>
              <div style="margin-bottom: 5px;margin-left: 5px;"> {{props.row.Content}}</div>
              <div>
                <el-image
                  style="width: 100px; height: 100px;margin-left: 5px;"
                  v-for="img in props.row.Image" :key="img"
                  :src="globalHttpUrl + img"
                  :preview-src-list="[globalHttpUrl + img]">
                </el-image>
              </div>
            </div>
            <span style="margin-left: 10px;">{{props.row.DoLike}}</span>
            <i style="margin-left: 5px;" class="fa fa-thumbs-o-up" aria-hidden="true"></i>
            <span style="margin-left: 10px;">{{props.row.UnLike}}</span>
            <i style="margin-left: 5px;" class="fa fa-thumbs-o-down" aria-hidden="true"></i>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button style="float: right; padding: 3px 5px" type="danger" @click="handleReject(props.$index, props.row)">拒绝</el-button>
              <el-button style="float: right; padding: 3px 15px" type="text" @click="handleAccept(props.$index, props.row)">接受</el-button>
            </div>
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple-light"><div class="feedback_white"></div><div class="feedback_title">举报理由</div><div class="feedback_text"><u_fold line="5">{{props.row.Reason}}</u_fold><el-popover
                placement="right"
                width="400"
                trigger="click">
                <el-card class="box-card1">
                  <div class="text item">
                    {{props.row.Reason}}
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
        label="被举报人姓名"
        prop="Username">
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
            placeholder="在此输入关键字搜索不同状态的被举报评论"/>
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
import { ReportComList, HandleReportCom } from '@/api/modules/admin/sys.comment'
import global from '@/common/common'
export default {
  name: 'report_management',
  components: {
    u_fold
  },
  created () {
    ReportComList().then(res => {
      if (res.Success) {
        this.Report_data = res.Data
      }
    })
  },
  data () {
    return {
      Report_data: [],
      search: '',
      globalHttpUrl: global.httpUrl
    }
  },
  methods: {
    handleAccept (index, row) {
      row.State = 'Accepted'
      HandleReportCom({
        CommentId: row.CommentId,
        Id: row.Id,
        Operate: 'Accepted'
      }).then(res => {
        if (res.Success) {
          this.$message.success('接受举报成功')
        }
      })
    },
    handleReject (index, row) {
      row.State = 'Rejected'
      HandleReportCom({
        CommentId: row.CommentId,
        Id: row.Id,
        Operate: 'Rejected'
      }).then(res => {
        if (res.Success) {
          this.$message.success('拒绝举报成功')
        }
      })
    },
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
    resetStateFilter () {
      this.$refs.filterTable.clearFilter('State')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
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
