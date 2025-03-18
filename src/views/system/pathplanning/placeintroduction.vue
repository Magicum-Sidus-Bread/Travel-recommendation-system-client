<template>
  <div style="overflow: scroll; height: 100vh;">
        <div class="JumpButton">
          <el-button type="primary" @click="submit" plain>提交</el-button>
        </div>
      <div class="placecontainer">
        <Calendar
          :duration="duration"
          :startDate="startDate"
          :events="events"
          @clickPlace="clickPlace"
          @createPlace="createPlace"
          @deletePlace="deletePlace"
          @resizePlace="resizePlace"
          @movePlace="movePlace"
        />
      <div class="block">
        <a-table :data-source="placelist" :columns="columns" rowKey="placename"
                 @change="tablePagination" :pagination="pagination">
        <span slot="action" slot-scope="text, record">
     <el-popover
       placement="right"
       width="400"
       trigger="click">
                  <el-card class="box-card1">
                    <div class="text item">
                      {{PlaceIntro}}
                    </div>
                  </el-card>
                  <el-button @click="GetPlaceIntroduction(record)" type="text" slot="reference">景点详情</el-button>
                </el-popover>
          <a-divider type="vertical" />
          <a @click="GetPlaceComment(record)">查看评论</a>
          <a-divider type="vertical" />
          <a @click="AddCommentDialog(record)">发布评论</a>
        </span>
          <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
            <div>
              <el-image v-for="photo in record.details.photos"
                        :key="photo"
                        style="width: 25%; height: 130px;margin-left: 4%;"
                        :src="photo"
                        :preview-src-list="record.details.photos">
              </el-image>
              <div v-if="record.details.photos.length ===0">
                <p style="margin-left:45%">暂无图片</p>
              </div>
            </div>
          </div>
        </a-table>
      </div>
      </div>
    <el-drawer
      title="评论列表"
      :visible.sync="CommentsCard"
      direction="rtl"
      size="30%">
      <el-card class="box-card" v-for="Comment in CommentsList" :key="Comment.Id">
        <div slot="header" class="clearfix">
          <el-avatar :size="47" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span style="font-size: 20px;margin-top:10px;margin-left: 25px;font-weight: bold;">{{Comment.Username}}</span>
          <span style="font-size: 15px;margin-top:15px;margin-left: 200px;">{{Comment.Time}}</span>
        </div>
        <div class="text item">

          <div style="font-weight: bold;margin-bottom: 5px;">评论景点：{{PlaceComment}}</div>
          <div style="margin-bottom: 5px;margin-left: 5px;"> {{Comment.Content}}</div>
          <div>
            <el-image
              style="width: 100px; height: 100px;margin-left: 5px;"
              v-for="img in Comment.Image" :key="img"
              :src="'http://192.168.43.15:8080'+img"
              :preview-src-list="['http://192.168.43.15:8080'+ img]">
            </el-image>
          </div>
        </div>
        <span style="margin-left: 10px;">{{Comment.DoLike}}</span>
        <i @click="Thumsup_handle(Comment)" style="margin-left: 5px;" class="fa fa-thumbs-o-up" aria-hidden="true" v-if="Comment.IsDo===false"></i>
        <i @click="Thumsup_handle(Comment)" style="margin-left: 5px;" class="fa fa-thumbs-up" aria-hidden="true" v-if="Comment.IsDo===true"></i>
        <span style="margin-left: 10px;">{{Comment.UnLike}}</span>
        <i @click="Thumsdown_handle(Comment)" style="margin-left: 5px;" class="fa fa-thumbs-o-down" aria-hidden="true" v-if="Comment.IsUn===false"></i>
        <i @click="Thumsdown_handle(Comment)" style="margin-left: 5px;" class="fa fa-thumbs-down" aria-hidden="true" v-if="Comment.IsUn===true"></i>
        <i @click="Report_dialog(Comment)" style="margin-left: 365px" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        <span @click="Report_dialog(Comment)" style="float: right;padding: 0px 0px">举报</span>
      </el-card>
    </el-drawer>
    <el-dialog
      title="发表评论"
      :visible.sync="dialogVisible"
      width="35%">
      <span>评论景点：{{toCommentPlace}}</span>
      <span><el-input
        type="textarea"
        :rows="5"
        placeholder="请输入评论："
        v-model="textarea"
        style="margin-bottom: 5px;margin-top: 5px;">
</el-input></span>
      <span style="margin-bottom: 5px;">为评论添加图片：</span>
      <el-upload
        ref="pictureUpload"
        action="#"
        list-type="picture-card"
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
      </span>
        </div>
      </el-upload>
      <span>请为景点评分：</span>
      <el-rate
        v-model="place_value"
        show-text
        style="margin-top: 5px;">
      </el-rate>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="Add_Comment">发 布</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      width="30%">
      <span>您确定要举报该评论吗？</span>
      <p style="margin-top: 20px;">请您谨慎举报，我们会对恶意举报的用户进行封号</p>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">手滑了，不举报</el-button>
    <el-button type="danger" @click="Report_handle">举 报</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="创建行程"
      :visible.sync="createModalVisible"
      width="30%"
      :before-close="handleClose">
      <span>请选择景点：</span>
      <el-select v-model="placeCreate" placeholder="请选择">
        <el-option
          v-for="item in placelist"
          :key="item.key"
          :disabled="createOptions(item)"
          :label="item.placename"
          :value="item.placename">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="createModalClose">取 消</el-button>
    <el-button type="primary" @click="createModalCreate">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="景点详情"
      :visible.sync="detailsModalVisible"
      width="30%">
      <div>景点名称: {{detailsEvent.placename}}</div>
      <div v-if="detailsEvent.cost.length === 0">景点消费: 暂无消费信息</div>
      <div v-else>景点消费: {{detailsEvent.cost}}</div>
      <div>景点评分: {{detailsEvent.rating}}</div>
      <div>景点地址: {{detailsEvent.address}}</div>
      <div>景点介绍: {{detailsEvent.content}}</div>
      <el-image v-for="photo in detailsEvent.photos"
                :key="photo"
                style="width: 25%; height: 130px;margin-left: 4%;"
                :src="photo"
                :preview-src-list="detailsEvent.photos">
      </el-image>
      <span slot="footer" class="dialog-footer">
    <el-button type="danger" @click="detailsModalVisible = false">关闭</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { PlacesList, GetplaceIntro, SubmitPath } from '@/api/modules/user/sys.tourism'
import { GetCommentList, AddComment, Thumbsdown, Thumbsup, ReportComment } from '@/api/modules/user/sys.comment'
import { transformPlacelist } from '@/utils/transformer'
import { DayPilot } from 'daypilot-pro-vue'
import util from '@/libs/util'
import Calendar from '@/components/Calendar'

export default {
  name: 'placeintroduction',
  data () {
    let createArgs
    let detailsEventbefore
    let deleteEvent
    let deleteindex
    return {
      CommentsCard: false,
      CommentsList: [],
      dialogVisible: false,
      dialogVisible1: false,
      textarea: '',
      toCommentPlace: '',
      place_value: null,
      PlaceIntro: '',
      ReportId: null,
      PlaceComment: '',
      events: [],
      detailsModalVisible: false,
      createModalVisible: false,
      detailsEventbefore,
      detailsEvent: {
        placename: '',
        cost: '',
        rating: '',
        address: '',
        location: '',
        photos: [],
        content: ''
      },
      createArgs,
      deleteEvent,
      deleteindex,
      placeCreate: '',
      placeMap: []
      // createOptions
    }
  },
  components: {
    Calendar
  },
  methods: {
    // 暂未开放的景点设置为disabled
    createOptions (value) {
      return (this.events.findIndex(event => event.placename === value.placename) !== -1) || (value.placename.endsWith('(暂停开放)'))
    },
    // click event 点击查看景点的详细信息
    async clickPlace (args) {
      console.log('this is clickPlace', args)
      this.detailsModalVisible = true
      this.detailsEventbefore = this.placeMap[args.e.text()]
      this.detailsEvent.placename = args.e.text()
      this.detailsEvent.cost = this.detailsEventbefore.cost
      this.detailsEvent.rating = this.detailsEventbefore.rating
      this.detailsEvent.address = this.detailsEventbefore.address
      this.detailsEvent.location = this.detailsEventbefore.location
      this.detailsEvent.photos = this.detailsEventbefore.photos
      // 获取景点介绍
      await GetplaceIntro({
        City: this.City,
        PlaceName: args.e.text()
      }).then(res => {
        if (res.Success) {
          // this.$message.success('景点介绍')
          this.detailsEvent.content = res.Content
        }
      })
    },
    // create event 点击打开创建行程浮窗
    createPlace (args) {
      // console.log('this is createPlace', args)
      this.createModalVisible = true
      this.createArgs = args
      this.placeCreate = ''
    },
    // 关闭创建行程浮窗
    createModalClose () {
      this.createModalVisible = false
    },
    // 创建行程
    createModalCreate () {
      // console.log('this is createModelCreate', this.placeCreate)
      this.createModalVisible = false
      if (this.placeCreate === '') return
      this.events.push({
        id: DayPilot.guid(),
        start: this.createArgs.start,
        end: this.createArgs.end,
        text: this.placeCreate,
        resource: this.createArgs.resource,
        details: this.placelist.find(poi => poi.placename === this.placeCreate)?.details
      })

      this.placeMap[this.placeCreate] = this.placelist.find(poi => poi.placename === this.placeCreate)?.details
    },
    // 关闭浮窗
    handleClose () {
    },
    // delete event 删除行程
    deletePlace (args) {
      this.deleteEvent = this.placeMap[args.e.text()].placeName
    },
    // resize event 设置行程时间长度
    resizePlace (args) {
      // console.log(args)
    },
    // move event 移动行程信息
    movePlace (args) {
      // console.log(args)
    },
    // submit events
    submit () {
      sessionStorage.setItem('placeevents', JSON.stringify(this.events))
      SubmitPath({
        Meta: {
          Destination: this.City,
          StartDate: util.cookies.get('startDate'),
          Duration: parseInt(util.cookies.get('duration')),
          GroupNumber: parseInt(util.cookies.get('groupNumber')),
          CertainPoints: this.events.map(val => val.text)
        },
        paths: this.events
      }).then(res => {
        if (res.Success) {
          this.$message.success('行程上传完毕')
          util.cookies.set('PathId', res.PathId)
          this.$router.push({ path: '/pathplanning/eating' })
        }
      })
      // util.cookies.set('Events', this.events)
      // sessionStorage.setItem('placeevents', JSON.stringify(this.events))
      // this.$router.push({ path: '/pathplanning/eating' })
    },
    // 获取景点评论
    async GetPlaceComment (event) {
      this.PlaceComment = event.placename
      await GetCommentList({
        City: this.City,
        Place: event.placename
      }).then(res => {
        if (res.Success) {
          this.CommentsList = res.Data
        }
      })
      this.CommentsCard = true
    },
    // 发布评论浮窗控制
    AddCommentDialog (event) {
      this.dialogVisible = true
      this.toCommentPlace = event.placename
    },
    // 发布评论
    Add_Comment () {
      const form = new FormData()
      form.append('City', this.City)
      form.append('Place', this.toCommentPlace)
      form.append('Content', this.textarea)
      for (let i = 0; i < this.$refs.pictureUpload.uploadFiles.length; i++) {
        form.append('Image', this.$refs.pictureUpload.uploadFiles[i].raw)
      }
      AddComment(
        form
      ).then(res => {
        if (res.Success) {
          this.dialogVisible = false
          this.$message.success('评论发布成功！')
        }
      })
    },
    // 获取景点信息
    async GetPlaceIntroduction (event) {
      console.log(event)
      await GetplaceIntro({
        City: this.City,
        PlaceName: event.placename
      }).then(res => {
        if (res.Success) {
          this.$message.success('景点介绍')
          this.PlaceIntro = res.Content
          // console.log(this.PlaceIntro)
        }
      })
    },
    // 点赞评论
    Thumsup_handle (Comment) {
      if (Comment.IsDo === false) {
        Thumbsup({
          CommentId: Comment.Id
        }).then(res => {
          if (res.Success) {
            Comment.IsDo = true
            Comment.DoLike = Comment.DoLike + 1
            if (Comment.IsUn === true) {
              Comment.IsUn = false
              Comment.UnLike = Comment.UnLike - 1
            }
            this.$message.success('点赞成功！')
          }
        })
      } else {
        Comment.IsDo = false
        Comment.DoLike = Comment.DoLike - 1
      }
    },
    // 踩评论
    Thumsdown_handle (Comment) {
      if (Comment.IsUn === false) {
        Comment.IsUn = true
        Thumbsdown({
          CommentId: Comment.Id
        }).then(res => {
          if (res.Success) {
            Comment.IsUn = true
            Comment.UnLike = Comment.UnLike + 1
            if (Comment.IsDo === true) {
              Comment.IsDo = false
              Comment.DoLike = Comment.DoLike - 1
            }
            this.$message.success('踩成功！')
          }
        })
      } else {
        Comment.IsUn = false
        Comment.UnLike = Comment.UnLike - 1
      }
    },
    // 举报浮窗控制
    Report_dialog (Comment) {
      this.dialogVisible1 = true
      this.ReportId = Comment.Id
    },
    // 举报评论
    Report_handle () {
      ReportComment({
        CommentId: this.ReportId,
        Reason: 'sjido'
      }).then(res => {
        if (res.Success) {
          this.dialogVisible1 = false
          this.$message.success('举报成功！')
          this.$message.info('我们会详细审查此评论，感谢您的举报')
        }
      })
    },
    // 图片设置
    handleRemove (file) {
      const uploadFiles = this.$refs.pictureUpload.uploadFiles
      // console.log(uploadFiles)
      for (let i = 0; i < uploadFiles.length; i++) {
        if (uploadFiles[i].url === file.url) {
          uploadFiles.splice(i, 1)
        }
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      window.open(file.url)
    }
  },
  setup () {
    // table label
    const columns = [
      {
        title: '景点名称',
        dataIndex: 'placename',
        key: 'placename',
        width: 100
      },
      {
        title: '评分',
        dataIndex: 'details.rating',
        key: 'rating',
        width: 60
      },
      {
        title: '位置',
        dataIndex: 'details.address',
        key: 'address',
        width: 200
      },
      {
        title: '操作',
        dataIndex: 'details',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]
    // 获取今天的日期
    // const today = DayPilot.Date.today()
    // const placeMap = {}
    // 景点列表
    const placelist = ref([])
    // 景点页码
    const pagination = ref({
      current: 1,
      pageSize: 10,
      total: 0,
      showLessItems: true,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100']
    })
    // 获取旅行城市
    let City = ref()
    City = util.cookies.get('City')
    // 获取旅行时长
    let duration = ref()
    duration = parseInt(util.cookies.get('duration'))
    // 获取旅行起始日期
    let startDate = ref()
    startDate = util.cookies.get('startDate')
    const detailsModalVisible = ref(false)

    // transform helper 对高德api数据进行处理
    const transformPlacedata = (res) => {
      if (res.info === 'OK') {
        placelist.value = res.pois.map(transformPlacelist)
        pagination.value.total = Math.min(180, parseInt(res.count)) // 超过190 api失效?
      } else {
        message.error('无法查找到此城市')
      }
    }
    // Current page change
    // handle pagination
    const tablePagination = (pg) => {
      pagination.value.current = pg.current
      pagination.value.pageSize = pg.pageSize
      PlacesList({
        city: City,
        page: pagination.value.current,
        offset: pagination.value.pageSize
      }).then(res => {
        transformPlacedata(res)
      }).catch(err => console.log(err))
    }
    // search city 搜索城市
    const Search = (val) => {
      City = val
      PlacesList({
        city: City,
        page: pagination.value.current,
        offset: pagination.value.pageSize
      }).then(res => {
        transformPlacedata(res)
      }).catch(err => console.log(err))
    }

    onMounted(() => {
      City = util.cookies.get('City')
      duration = parseInt(util.cookies.get('duration'))
      startDate = util.cookies.get('startDate')
      PlacesList({
        city: City,
        page: pagination.value.current,
        offset: pagination.value.pageSize
      }).then(res => {
        transformPlacedata(res)
      }).catch(err => console.log(err))
    })

    return {
      columns,
      placelist,
      tablePagination,
      currentpage: 1,
      pagination,
      search: '',
      City,
      Search,
      duration,
      startDate,
      detailsModalVisible
    }
  }
}
</script>

<style scoped>
.placecontainer{
  display: flex;
  flex-direction: row;
  height: 1030px;
}
.text {
  font-size: 14px;
  line-height: 30px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.clearfix{
  height: 45px;
  display: flex;
  flex-direction: row;
}
.box-card {
  width: 540px;
}
.JumpButton{
  margin-left: 90%;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
