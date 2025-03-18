<template>
<d2-container better-scroll>
  <div class="PageContainer">
  <el-form :model="formState" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="目的城市" prop="city">
      <el-input @change="CityChange(formState.city)" style="width: 45%" v-model="formState.city"></el-input>
    </el-form-item>
    <el-form-item label="出行时间" prop="range" clearable>
      <el-date-picker
        v-model="formState.range"
        :picker-options="pickerOptions"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item name="groupNumber" label="人数" prop="groupNumber">
      <el-input-number v-model="formState.groupNumber" :max="5" :min="1"/>
    </el-form-item>
    <el-button style="margin-left: 12%" @click="submit">提交</el-button>
  </el-form>
  <el-dialog
    title=""
    :visible.sync="dialogCity"
    width="30%"
    :before-close="handle">
    <span>{{ ErrorContent }}</span>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogCity = false">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</d2-container>
</template>

<script>
import { ref } from 'vue'
import { InitPlaces } from '@/api/modules/user/sys.tourism'
import util from '@/libs/util'
export default {
  name: 'placeinput',
  data () {
    return {
      dialogCity: false,
      ErrorContent: '',
      CityState: false,
      pickerMinDate: '',
      pickerOptions: {
        onPick: obj => {
          this.pickerMinDate = new Date(obj.minDate).getTime()
        },
        disabledDate: time => {
          if (this.pickerMinDate) {
            const day1 = 5 * 24 * 3600 * 1000
            const maxTime = this.pickerMinDate + day1
            const minTime = this.pickerMinDate
            return time.getTime() > maxTime || time.getTime() < minTime
          } else {
            return (
              time < new Date()
            )
          }
        }
      },
      formState: ref({
        city: '',
        range: [],
        groupNumber: 0,
        selectedPlaces: []
      }),
      rules: {
        city: [
          {
            required: true,
            message: '请输入旅游城市',
            trigger: 'blur'
          }
        ],
        range: [
          {
            required: true,
            message: '请选择出行时间',
            type: 'array'
          }
        ],
        groupNumber: [
          {
            required: true,
            message: '请输入旅行人数',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 提交行程信息
    submit (event) {
      if (this.CityState && this.formState.range.length === 2) {
        // console.log('跳转到下一页面')
        util.cookies.set('City', this.formState.city)
        util.cookies.set('range', this.formState.range)
        util.cookies.set('groupNumber', this.formState.groupNumber)
        util.cookies.set('startDate', this.formState.range[1])
        util.cookies.set('duration', this.formState.range[1].split('-')[2] - this.formState.range[0].split('-')[2] + 1)
        this.$router.push({ path: '/pathplanning/place' })
      } else {
        if (this.CityState) {
          this.ErrorContent = '请选择出行日期'
        } else if (this.formState.range.length === 2) {
          this.ErrorContent = '请选择目的城市'
        } else {
          this.ErrorContent = '请选择目的城市和出行日期'
        }
        this.dialogCity = true
      }
    },
    // 选择旅行城市
    CityChange (event) {
      InitPlaces({
        city: this.formState.city
      }).then(res => {
        if (res.count > 0) {
          this.CityState = true
          this.$message.success('已搜索到该城市')
        } else {
          this.CityState = false
          this.$message.error('无法查找到此城市')
        }
      })
    },
    handle (event) {
    }

  }

}
</script>

<style scoped>
.PageContainer{
  margin-top: 100px;
  margin-left: 30%;
}
</style>
