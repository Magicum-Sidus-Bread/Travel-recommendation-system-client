<template><div>
  <d2-container better-scroll>
    <div class="SearchCity">
      <el-input class="SearchCity-city"
        placeholder="请输入内容"
        v-model="City"
        clearable>
      </el-input>
      <el-button class="SearchCity-search" type="primary" @click="Search(City)" round>搜索</el-button>
    </div>
    <el-dialog
      title="已选中餐饮"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="dialogEating"
      width="30%"
      :before-close="handleCloseEating">
      <span>您已选定餐饮</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogEating = false">取 消</el-button>
    <el-button type="primary" @click="JumpToLiving">确 定</el-button>
  </span>
    </el-dialog>
    <div class="block">
      <a-table :data-source="eatinglist" :columns="columns" rowKey="placename"
               @change="tablePagination" :pagination="pagination">
        <span slot="action" slot-scope="text, record">
     <el-popover
       placement="right"
       width="400"
       trigger="click">
                  <el-card class="box-card1">
                    <div class="text item">
                      <p>餐饮详情</p>
                    </div>
                  </el-card>
                  <el-button @click="GetPlaceIntroduction(record)" type="text" slot="reference">餐饮详情</el-button>
                </el-popover>
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
import { EatingList } from '@/api/modules/user/sys.tourism'
import { transformEatinglist } from '@/utils/transformer'
export default {
  name: 'eating',
  data () {
    return {
      City: '武汉市',
      dialogVisible: false,
      dialogEating: false
    }
  },
  methods: {
    // 关闭已选中浮窗
    handleClose () {
      this.dialogVisible = false
    },
    // 关闭提交浮窗
    handleCloseEating () {
      this.dialogEating = false
    }
  },
  setup () {
    // table label
    const columns = [
      {
        title: '餐饮小吃',
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
      }
    ]
    // 餐饮列表
    const eatinglist = ref([])
    // 餐饮页码
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
    // City name 默认城市
    let City = '武汉市'
    // jump to living page
    const JumpToLiving = (res) => {
      // console.log('this is 跳转到住宿酒店')
    }
    // transform helper
    const transformPlacedata = (res) => {
      if (res.info === 'OK') {
        eatinglist.value = res.pois.map(transformEatinglist)
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
      EatingList({
        city: City,
        page: pagination.value.current,
        offset: pagination.value.pageSize
      }).then(res => {
        transformPlacedata(res)
      }).catch(err => console.log(err))
    }
    // search city
    const Search = (val) => {
      City = val
      EatingList({
        city: City,
        page: pagination.value.current,
        offset: pagination.value.pageSize
      }).then(res => {
        transformPlacedata(res)
      }).catch(err => console.log(err))
    }

    onMounted(() => {
      EatingList({
        city: City,
        page: pagination.value.current,
        offset: pagination.value.pageSize
      }).then(res => {
        transformPlacedata(res)
      }).catch(err => console.log(err))
    })
    return {
      columns,
      eatinglist,
      tablePagination,
      currentpage: 1,
      pagination,
      search: '',
      Search,
      City,
      JumpToLiving
    }
  }
}
</script>

<style scoped>
.SearchCity{
  display: flex;
  flex-direction: row;
  height: 60px;
  margin-top: auto;
}
.SearchCity-city{
  width: 40%;
  margin-left: 10%;
  margin-top: 10px;
}
.SearchCity-search{
  width: 8%;
  margin-left: 3%;
  height: 40px;
  margin-top: 10px;
}
.JumpButton{
  margin-left: 12%;
  margin-top: 10px;
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
