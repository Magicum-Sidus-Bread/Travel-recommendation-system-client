<template><div>
  <d2-container better-scroll>
      <div class="JumpButton">
        <el-button type="primary" @click="dialogVisible = true" plain>点击查看已选中</el-button>
        <el-button type="primary" @click="dialogJump = true" plain>跳过</el-button>
        <el-button type="primary" @click="dialogLiving = true" plain>提交</el-button>
      </div>
    <el-dialog
      title="已选中住宿酒店"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-table
        :data="livingevents"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="住宿酒店名称">
                <span>{{ props.row.placename }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.details.rating }}</span>
              </el-form-item>
              <el-form-item label="消费水平">
                <span v-if="props.row.details.cost.length === 0">暂无消费信息</span>
                <span v-else>{{ props.row.details.cost }}</span>
              </el-form-item>
              <el-form-item label="位置">
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
        <el-table-column
          label="操作"
          prop="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="livingDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="dialogJump"
      width="30%"
      :before-close="handleCloseJump">
      <span>您未选择任何住宿酒店</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogJump = false">取 消</el-button>
    <el-button type="primary" @click="JumpToSum">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="您已选定住宿酒店如下"
      :visible.sync="dialogLiving"
      width="60%"
      :before-close="handleCloseLiving">
      <el-table
        :data="livingevents"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="住宿酒店名称：">
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
        <el-table-column
          label="操作"
          prop="">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="livingDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogLiving = false">取 消</el-button>
    <el-button type="primary" @click="JumpToSum">确 定</el-button>
  </span>
    </el-dialog>
    <div class="block">
      <a-table :data-source="livinglist" :columns="columns" rowKey="placename"
               @change="tablePagination" :pagination="pagination">
        <span slot="action" slot-scope="text, record">
          <a-divider type="vertical" />
          <a @click="SelectLiving(record)">选择</a>
        </span>
        <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
          <div>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="住宿酒店名称:">
                  <span>{{ record.placename }}</span>
                </el-form-item>
                <el-form-item label="评分:">
                  <span>{{ record.details.rating }}</span>
                </el-form-item>
                <el-form-item label="消费水平:">
                  <span>{{ record.details.cost }}</span>
                </el-form-item>
                <el-form-item label="位置:">
                  <span>{{ record.details.address }}</span>
                </el-form-item>
                <el-image v-for="photo in record.details.photos"
                          :key="photo"
                          style="width: 25%; height: 130px;margin-left: 4%;"
                          :src="photo"
                          :preview-src-list="record.details.photos">
                </el-image>
                <div v-if="record.details.photos.length ===0">
                  <p style="margin-left:45%">暂无图片</p>
                </div>
              </el-form>
          </div>

        </div>
      </a-table>
    </div>
  </d2-container>
</div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { LivingList, SubmitLiving } from '@/api/modules/user/sys.tourism'
import { transformEatinglist } from '@/utils/transformer'
import util from '@/libs/util'
export default {
  name: 'livingintroduction',
  data () {
    return {
      City: '武汉市',
      dialogVisible: false,
      dialogJump: false,
      dialogLiving: false,
      livingevents: []
    }
  },
  methods: {
    // 查看已选中浮窗控制
    handleClose () {
      this.dialogVisible = false
    },
    // 跳过浮窗控制
    handleCloseJump () {
      this.dialogJump = false
    },
    // 提交浮窗控制
    handleCloseLiving () {
      this.dialogLiving = false
    },
    // 选择住宿酒店
    SelectLiving (event) {
      // console.log('this is SelectLiving', event)
      if (this.livingevents.find(val => val.placename === event.placename)) {
        this.$message.success('该住宿酒店已选择')
      } else {
        this.livingevents.push(event)
        // console.log('this is livingevents', this.livingevents)
        this.$message.success('住宿酒店选择成功')
      }
    },
    // 删除已选中住宿酒店
    livingDelete (index, row) {
      // console.log('this is livingDelete', index, row)
      this.livingevents.splice(index, 1)
    },
    // 跳转到路径总览页面
    JumpToSum () {
      // console.log('this is 跳转到路径总览')
      sessionStorage.setItem('livingevents', JSON.stringify(this.livingevents))
      SubmitLiving({
        PathId: parseInt(util.cookies.get('PathId')),
        HotelInfo: this.livingevents
      }).then(res => {
        if (res.Success) {
          this.$message.success('住宿信息提交成功')
          this.$router.push({ path: '/pathplanning/sum' })
        }
      })
      // this.$router.push({ path: '/pathplanning/sum' })
    }
  },
  setup () {
    // table label
    const columns = [
      {
        title: '住宿酒店',
        dataIndex: 'placename',
        key: 'placename',
        width: 200
      },
      {
        title: '评分',
        dataIndex: 'details.rating',
        key: 'rating',
        width: 100
      },
      {
        title: '位置',
        dataIndex: 'details.address',
        key: 'address',
        width: 300
      },
      {
        title: '操作',
        dataIndex: 'details',
        key: 'action',
        scopedSlots: { customRender: 'action' }
      }
    ]
    // 住宿酒店列表
    const livinglist = ref([])
    // 住宿酒店页码
    const pagination = ref({
      current: 1,
      pageSize: 10,
      total: 0,
      showLessItems: true,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100']
    })
    // list for right
    // const value = ref([])
    // 获取旅行城市
    let City = ref()
    City = util.cookies.get('City')
    // 搜索城市
    const Search = (val) => {
      // console.log(val)
      City = val
      // console.log(City)
      LivingList({
        city: City,
        page: pagination.value.current,
        offset: pagination.value.pageSize
      }).then(res => {
        transformPlacedata(res)
      }).catch(err => console.log(err))
    }
    // transform helper 对高德api数据进行处理
    const transformPlacedata = (res) => {
      if (res.info === 'OK') {
        livinglist.value = res.pois.map(transformEatinglist)
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
      LivingList({
        city: City,
        location: util.cookies.get('location'),
        page: pagination.value.current,
        offset: pagination.value.pageSize
      }).then(res => {
        transformPlacedata(res)
      }).catch(err => console.log(err))
    }

    onMounted(() => {
      LivingList({
        city: City,
        location: util.cookies.get('location'),
        page: pagination.value.current,
        offset: pagination.value.pageSize
      }).then(res => {
        transformPlacedata(res)
      }).catch(err => console.log(err))
    })

    const GotoPlaceIntroduction = (event) => {
      // console.log(event)
    }
    return {
      columns,
      livinglist,
      tablePagination,
      currentpage: 1,
      pagination,
      search: '',
      GotoPlaceIntroduction,
      Search,
      City
    }
  }
}
</script>

<style scoped>
.JumpButton{
  margin-left: 70%;
  margin-top: 0px;
  height: 50px;
}
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

</style>
