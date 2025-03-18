<template>
  <d2-container better-scroll>
  <div class="SumContainer">
    <div class="Sum">旅行规划总览</div>
  <div class="PlaceContainer">
    <div class="Place">路线规划 ：</div>
    <div class="CalendarContainer">
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
    </div>
  </div>
  <div class="EatingContainer">
    <div class="Place">餐饮规划 ：</div>
    <div class="EatingTable">
    <el-table
      :data="eatingevents"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left">
            <el-form-item label="餐饮名称：">
              <span>{{ props.row.placename }}</span>
            </el-form-item>
            <el-form-item label="评分：">
              <span>{{ props.row.details.rating }}</span>
            </el-form-item>
            <el-form-item label="消费水平：">
              <span v-if="props.row.details.cost.length === 0">暂无消费信息</span>
              <span v-else>{{ props.row.details.cost }}</span>
            </el-form-item>
            <el-form-item label="位置：">
              <span>{{ props.row.details.address }}</span>
            </el-form-item>
            <el-image v-for="photo in props.row.details.photos"
                      :key="photo"
                      style="width: 25%; height: 130px;margin-left: 4%;"
                      :src="photo"
                      :preview-src-list="props.row.details.photos">
            </el-image>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="餐饮名称"
        width="150"
        prop="placename">
      </el-table-column>
      <el-table-column
        label="评分"
        width="100"
        prop="details.rating">
      </el-table-column>
      <el-table-column
        label="位置"
        width="350"
        prop="details.address">
      </el-table-column>
    </el-table>
    </div>
  </div>
  <div class="EatingContainer">
    <div class="Place">住宿规划 ：</div>
    <div class="EatingTable">
      <el-table
        :data="livingevents"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left">
              <el-form-item label="住宿酒店名称：">
                <span>{{ props.row.placename }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.details.rating }}</span>
              </el-form-item>
              <el-form-item label="消费水平：">
                <span v-if="props.row.details.cost.length === 0">暂无消费信息</span>
                <span v-else>{{ props.row.details.cost }}</span>
              </el-form-item>
              <el-form-item label="位置：">
                <span>{{ props.row.details.address }}</span>
              </el-form-item>
              <el-image v-for="photo in props.row.details.photos"
                        :key="photo"
                        style="width: 25%; height: 130px;margin-left: 4%;"
                        :src="photo"
                        :preview-src-list="props.row.details.photos">
              </el-image>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="住宿酒店名称"
          width="150"
          prop="placename">
        </el-table-column>
        <el-table-column
          label="评分"
          width="100"
          prop="details.rating">
        </el-table-column>
        <el-table-column
          label="位置"
          width="330"
          prop="details.address">
        </el-table-column>
      </el-table>
    </div>
  </div>
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
  </d2-container>
</template>

<script>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import util from '@/libs/util'
import Calendar from '@/components/Calendar'
import { GetplaceIntro, GetPaths } from '@/api/modules/user/sys.tourism'
export default {
  name: 'pathsum',
  data () {
    let detailsEventbefore
    return {
      detailsModalVisible: false,
      detailsEventbefore,
      detailsEvent: {
        placename: '',
        cost: '',
        rating: '',
        address: '',
        location: '',
        photos: [],
        content: ''
      }
    }
  },
  methods: {
    // click event 点击查看行程景点信息
    async clickPlace (args) {
      // console.log('this is args', args.e.text())
      this.detailsModalVisible = true
      this.detailsEventbefore = this.events.find(item => item.text === args.e.text())
      // console.log('this is deailsEvent', this.detailsEventbefore)
      this.detailsEvent.placename = this.detailsEventbefore.text
      this.detailsEvent.cost = this.detailsEventbefore.details.cost
      this.detailsEvent.rating = this.detailsEventbefore.details.rating
      this.detailsEvent.address = this.detailsEventbefore.details.address
      this.detailsEvent.location = this.detailsEventbefore.details.location
      this.detailsEvent.photos = this.detailsEventbefore.details.photos
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
    createPlace () {
      // console.log('this is createPlace')
    },
    deletePlace () {
      // console.log('this is deletePlace')
    },
    resizePlace () {
      // console.log('this is resizePlace')
    },
    movePlace () {
      // console.log('this is movePlace')
    },
    eatingDelete (index, row) {
      this.eatingevents.splice(index, 1)
    },
    livingDelete (index, row) {
      this.livingevents.splice(index, 1)
    }
  },
  setup () {
    // 获取旅行城市
    let City = ref()
    City = util.cookies.get('City')
    // 获取旅行时长
    let duration = ref()
    duration = parseInt(util.cookies.get('duration'))
    // 获取旅行起始日期
    let startDate = ref()
    startDate = util.cookies.get('startDate')
    // 获取已规划行程信息
    let events = ref()
    events = JSON.parse(sessionStorage.getItem('placeevents'))
    // console.log('this is events', events)
    // 获取已选中餐饮信息
    const eatingevents = ref([])
    // eatingevents = JSON.parse(sessionStorage.getItem('eatingevents'))
    // console.log('this is eatingevents', eatingevents)
    // 获取已选中住宿酒店信息
    const livingevents = ref([])
    // livingevents = JSON.parse(sessionStorage.getItem('livingevents'))
    // console.log('this is livingevents', livingevents)

    GetPaths({
      PathId: parseInt(util.cookies.get('PathId'))
    }).then(res => {
      if (res.Success) {
        message.success('已获取行程信息')
        // console.log('this is res', res)
        // events.value = res.PathInfo
        eatingevents.value = res.FoodInfo
        livingevents.value = res.HotelInfo
        // console.log('this is events', events)
        // console.log('this is eatingevents', eatingevents)
      }
    }).catch(err => console.log(err))

    return {
      duration,
      startDate,
      events,
      eatingevents,
      livingevents,
      City
    }
  },
  components: {
    Calendar
  }
}
</script>

<style scoped>
.Sum{
  font-size: 30px;
  margin-left: 40%;
}
.Place{
  font-size: 20px;
  margin-left: 5%;
}
.CalendarContainer{
  margin-top: 10px;
  width: 80%;
  margin-left: 10%;
}
.EatingContainer{
  margin-top: 30px;
}
.EatingTable{
  width: 80%;
  margin-left: 10%;
}
.el-form-item{
  height: 20px;
}
</style>
