<template>
  <div class="paddingX20 padding20X">
    <div v-if="!chatInfo">
      <div class="padding10X paddingX20 color-theme font-size4 bold">
        选择问诊后在此区域开具处方
      </div>
    </div>
    <el-card v-if="chatInfo" shadow="hover" style="min-width: 680px">
      <header class="flex-align">
        <img :src="zust" class="block" style="height: 30px;width: 100px">
        <div class="margin-left100 padding-left38 font-size4 color-333 bold">浙科医务室 处方笺</div>
      </header>
      <section class="margin-top30 font-size-3 color-555">
        <div class=" border-bottom1 padding-bottom10">处方编号：{{rp.rpId}}</div>
        <div class="flex-align-spacebetween padding-top10 paddingX10">
          <div>姓名：{{chatInfo.patientName}}</div>
          <div>性别：{{chatInfo.patientSex}}</div>
          <div>年龄：{{chatInfo.patientAge}}</div>
        </div>
        <div class="flex-align-spacebetween padding-top10 paddingX10">
          <div>科室：{{doctorInfo.department}}</div>
          <div>问诊编号：{{chatInfo.chatId}}</div>
        </div>
        <div class="padding10X paddingX10 border-bottom1">
          <div>诊断结果：
            <input :disabled="type=='history'" v-model="rp.diagnosis" placeholder="填写诊断结果" class="bgcolor-f1 padding6X paddingX6 font-size-3"
                   style="min-width: 500px"/>
          </div>
        </div>
      </section>
      <main class="border-bottom1 padding-top20 padding-bottom60">
        <div class="font-size16 bold color-333" style="font-family: 'Sitka Display'">Rp.</div>
        <section class="color-555 font-size-3">
          <div v-if="type!='history'" class="bgcolor-f1 padding4X bold">
            <span class="marginX66">药品名称</span>
            <span class="marginX28">数量</span>
            <span>单位</span>
            <span class="marginX50">用法/用量</span>
            <span class="marginX0">频率</span>
            <span class="margin-left26">单价</span>
          </div>
          <div v-if="type!='history'">
            <el-form inline>
              <el-form-item>
                <el-select @change="changed" size="mini" value-key="id" clearable v-model="searchResult" remote
                           :remote-method="searchMed" filterable placeholder="输入药品名进行搜索" style="width: 200px">
                  <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input-number size="mini" v-model="medicineTemp.count" :max="99" :min="0"
                                 style="max-width: 64px"></el-input-number>
              </el-form-item>
              <el-form-item>
                <el-select size="mini" clearable v-model="medicineTemp.unit" placeholder="" filterable
                           style="width: 60px">
                  <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input size="mini" style="width: 140px" v-model="medicineTemp.method"
                          placeholder="使用方式/每次用量"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select size="mini" clearable v-model="medicineTemp.dosage" placeholder="" filterable
                           style="width: 60px">
                  <el-option v-for="item in frequency" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input size="mini" v-model="searchResult.price" style="width: 40px"></el-input>
              </el-form-item>
              <el-form-item>
                <i @click="addTemp" class="el-icon-circle-plus color-theme cursor-pointer">
                  <span class="font-size-5"> 添加</span>
                </i>
              </el-form-item>

            </el-form>
            <!--<el-input size="mini" class="text-align-right" style="width: 60px"></el-input>-->

          </div>
          <section class="bgcolor-f1 paddingX10">
            <div class="flex-align border-bottom-dashed font-size-4 padding8X" v-for="(item,index) of medicineListTemp">
              <div style="width: 250px">{{index+1}}. {{item.name}}</div>
              <div class="padding-left10">{{item.count}}</div>
              <div class="">{{item.unit}}</div>
              <div class="padding-left30">{{item.method}}</div>
              <div class="padding-left30">{{item.dosage}}</div>
              <div class="padding-left30">{{item.price}}元</div>
              <i v-if="type!='history'" @click="delTemp(index)" class="padding-left20 color-red icon-delete cursor-pointer"></i>
            </div>
          </section>
        </section>
      </main>
      <!--<section class="flex-spacebetween font-size-5 margin-top20 paddingX20 color-555">-->
      <!--<div>药品费用：{{rp.medPrice}}元</div>-->
      <!--<div>问诊费用：{{rp.chatPrice}}元</div>-->
      <!--<div>其他费用：{{rp.otherPrice}}元</div>-->
      <!--</section>-->
      <footer class="flex-spacebetween paddingX20 padding40X font-size-4 bold">
        <div>医生：{{doctorInfo.name}}</div>
        <div>合计：{{rp.totalPrice}}元</div>
      </footer>
    </el-card>
    <div v-if="chatInfo && chatInfo.chatStatus==1" class="text-align-center fixed bottom20" style="width: 723px">
      <el-popover
        placement="top"
        width="150"
        trigger="hover"
        content="提交处方">
        <!--<el-button slot="reference">hover 激活</el-button>-->
        <el-button @click="submitRp" type="success" slot="reference" icon="el-icon-check" circle></el-button>
      </el-popover>
    </div>

    <!--<section class="text-align-center color-theme margin-top40">-->
    <!--可凭该处方至医务室配取药品-->
    <!--</section>-->
  </div>
</template>

<script>
  import zust from '~/logo/logo_zust.png'

  export default {
    props: ['type'],
    computed: {
      chatInfo: {
        set: function () {
        },
        get: function () {
          return this.$store.state.chatInfo
        }
      },
      rpTemp: {
        set: function () {
        },
        get: function () {
          return this.$store.state.rpTemp
        }

      }
    },
    data() {
      return {
        zust,
        // chatInfo: {},
        patientInfo: {},
        doctorInfo: {},
        medicineTemp: {
          count: 0,
          unit: '',
          dosage: '',
          method: ''
        },
        medicineListTemp: [],
        rules: {},
        frequency: [{
          value: '每天一次',
          label: 'QD'
        }, {
          value: '每天三次',
          label: 'TID'
        }, {
          value: '每天两次',
          label: 'BID'
        },],
        options: [],
        unitOptions: [
          {
            value: '盒',
            label: '盒'
          }, {
            value: '支',
            label: '支'
          }, {
            value: '袋',
            label: '袋'
          }, {
            value: '瓶',
            label: '瓶'
          }
        ],
        searchResult: '',
        //todo 处方中的药品列表内容 医生端选择药品后 在数据库以字符串拼接的方式储存，后端处理后返回给患者端
        rp: {
          rpId: '',
          chatId: '',
          diagnosis: '',
          medPrice: 0,
          chatPrice: 0,
          otherPrice: 0,
          totalPrice: 0,
          medicines: []
        },
      }
    },
    watch: {
      rpTemp() {
        console.log('111', this.rpTemp)
        this.rp = this.rpTemp
        this.medicineListTemp = JSON.parse(this.rpTemp.medicines)
      },
      medicineListTemp(val) {
        this.rp.medPrice = 0
        this.rp.totalPrice = 0
        console.log('药品列表', this.medicineListTemp)
        this.medicineListTemp.forEach(item => {
          this.rp.medPrice += (item.price * item.count)
        })
        this.rp.totalPrice = this.rp.medPrice + this.rp.chatPrice + this.rp.otherPrice
        console.log(this.rp.totalPrice)
      }
    },
    mounted() {
      this.doctorInfo = this.$store.state.userInfo
    },
    methods: {

      initRp() {
        this.rp.diagnosis = ''
      },
      addTemp() {
        let temp = {
          ...this.medicineTemp,
          price: this.searchResult.price,
          name: this.searchResult.name
        }
        this.medicineListTemp.push(temp)
      },
      delTemp(index) {
        this.medicineListTemp.splice(index, 1)
      },
      changed() {
        this.medicineTemp.price = this.searchResult.price
      },
      searchMed(keyword) {
        this.$post({
          url: this.$apis.getMedInfoList,
          param: {
            name: keyword,
            pageNo: 1,
            pageSize: 99
          },
          postType: 'json'
        }).then(res => {
          if (res.data.success) {
            // this.showList = res.data.data.list
            // this.total = res.data.data.total
            this.options = res.data.data.list
          }
        })
      },
      submitRp() {
        if (!this.rp.diagnosis) {
          this.$message.warning('诊断结果不得为空')
          return
        }
        let patientId = this.chatInfo.patientId
        let doctorId = this.doctorInfo.userId
        let dateTemp = new Date()
        let date = this.$date.formatWithPatternDate('yyyymmdd', dateTemp)
        let time = dateTemp.toTimeString().substring(0, 8).replace(new RegExp(':', 'g'), '')
        this.rp.rpId = date + time + patientId.substring(patientId.length - 4) + doctorId.substring(doctorId.length - 4)

        let temp = {...this.rp}
        temp.chatId = this.chatInfo.chatId
        temp.medicines = JSON.stringify(this.medicineListTemp)
        this.$post({
          url: this.$apis.createRp,
          param: temp,
          postType: 'json'
        }).then(res => {
          if (res.data.success) {

            this.updateChat()
          }
        })
      },
      updateChat() {
        this.$post({
          url: this.$apis.updateChatInfo,
          param: {
            chatId: this.chatInfo.chatId,
            rpId: this.rp.rpId,
            diagnosis: this.rp.diagnosis
          },
          postType: 'json'
        }).then(res => {
          if (res.data.success) {
            this.$socket.emit('rp', this.$store.state.chatInfo)
            this.$confirm('成功开具处方, 是否结束问诊?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.endChat()
            }).catch(() => {
            });
          }
        })
      },
      endChat() {
        this.$post({
          url: this.$apis.updateChatInfo,
          param: {
            chatId: this.chatInfo.chatId,
            chatStatus: 2,
            diagnosis: this.rp.diagnosis
          },
          postType: 'json'
        }).then(res => {
          if (res.data.success) {
            this.$socket.emit('end', this.chatInfo)
            this.$message.success('问诊结束成功！')
            this.$store.commit('setChatInfo', null)
            this.$emit('refresh')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chat-detail {
    border-top: #32ae57 solid 6px;
  }

  .splitter {
    height: 1px;
  }

  .border-bottom-dashed {
    border-bottom: #999999 1px dashed;
    &:last-child {
      border-bottom: none;
    }
  }

  .color-555 {
    color: #444;
  }
</style>
<style>
  .el-form-item {
    margin: 0;
  }

  .el-form--inline .el-form-item {
    margin: 0;
  }

  .el-input__inner {
    border-radius: 0;
    padding: 0 4px;
  }

  .el-input-number--mini .el-input-number__increase,
  .el-input-number--mini .el-input-number__decrease {
    width: 18px;
  }

  .el-input-number--mini .el-input__inner {
    padding: 0 4px;
  }
</style>
