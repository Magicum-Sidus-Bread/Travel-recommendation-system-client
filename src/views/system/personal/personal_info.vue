<template>
  <d2-container better-scroll>
  <div class="page-container">
    <div class="info">
      <el-divider content-position="left">个人中心</el-divider>
    </div>
    <el-row :gutter="20">
      <el-col :span="7" :offset="1">
        <el-card class="box-card">
          <div class="account-avatar">
            <img :src="globalHttpUrl+ this.Avatar"/>
            <div class="account-name">{{this.Username}}</div>
          </div>
          <div class="divider divider-dashed"></div>
          <div class="account-detail">
            <el-descriptions class="margin-top" :column="1" border :contentStyle="CS" :label-style="LS">
              <el-descriptions-item> <template slot="label"> <i class="el-icon-user"></i> 用户名 </template> {{this.Username}} </el-descriptions-item>
              <el-descriptions-item> <template slot="label"> <i class="el-icon-user"></i> 角色 </template> {{this.Role}} </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </el-col>

      <el-col :span="15" :push="0">
        <el-card class="box-card">
          <FullCalendar></FullCalendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
    </d2-container>
</template>
<script>
import FullCalendar from './components/fullcalendar'
import util from '@/libs/util'
import global from '@/common/common'
export default {
  name: 'personal_center',
  components: {
    FullCalendar
  },
  data () {
    return {
      // 设置样式
      CS: {
        'text-align': 'center', // 文本居中
        'min-width': '30px', // 最小宽度
        'word-break': 'break-all' // 过长时自动换行
      },
      LS: {
        color: '#000',
        'text-align': 'center',
        'font-weight': '600',
        height: '10px',
        'background-color': 'rgba(255, 97, 2, 0.1)',
        'min-width': '30px',
        'word-break': 'keep-all'
      },
      // 用户头像
      Avatar: util.cookies.get('avatar'),
      // 用户名
      Username: util.cookies.get('username'),
      // 用户角色
      Role: util.cookies.get('role'),
      globalHttpUrl: global.httpUrl
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-container{
  .info{
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }
}
.box-card{
  height : 650px;
  p{
    text-align :right;
  }
  .is-selected {
    color: #1989FA;
  }
  ul{
    margin-top: 4%;
    margin-left: 15%;
    width: 80%;
    text-align :left;
    position: relative;
    display: inline-block;
    background-color: white;
    li{
      text-align :left;
      .list-tag{
        background-color: #ecf5ff;
        border-color: #d9ecff;
        height: 32px;
        padding: 0 10px;
        line-height: 30px;
        font-size: 12px;
        color: #409EFF;
        border-width: 1px;
        border-style: solid;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
        .el-icon-close{
          border-radius: 50%;
          text-align: center;
          position: relative;
          cursor: pointer;
          font-size: 12px;
          height: 16px;
          width: 16px;
          line-height: 16px;
          vertical-align: middle;
          top: -1px;
          right: -5px;

          :before{
            display :block;
          }
        }
        .el-tag__close{
          color: #409eff;
        }
      }

    }
  }
  margin-top:14px;
  .account-avatar{
    text-align: center;
    margin-bottom :24px;
    img{
      width:105px;
      height:105px;
      margin-bottom :20px;
      border-radius:50%;
    }
    .account-name{
      margin-bottom: 4px;
      color: rgba(0,0,0,.85);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }

  }
  .account-detail{
    .detail{
      display :flex;
      flex-direction:column;
      justify-content :flex-start;
      align-items :flex-start;
    }
  }
  .divider{
    display: flex;
    clear: both;
    width: 100%;
    min-width: 100%;
    margin: 24px 0;
  }
  .divider-dashed{
    background: 0 0;
    border: dashed rgba(0,0,0,.06);
    border-width: 1px 0 0;
  }
  .tag-title{
    text-align:left;
  }
  .tag-dynamic{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    margin: 10px 0px;

  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
