<template>
  <div>
    <header class="fixed" style="width: 549px;">
      <div :class="{'hidden': !showDetail,'show': showDetail}"
           class=" bgcolor-white padding10X">
        <div class="cursor-pointer text-align-center" @click="showDetail=!showDetail">
          <span class="bold">{{chatInfo.patientName}}</span>
          <i class="icon-unfold color-theme" :class="{'rotate180' : showDetail, 'rotate0': !showDetail}"/>
        </div>
        <div class="margin10X padding-top10 paddingX10 font-size-2 border-top1">
          <div>
            患者信息
          </div>
        </div>
      </div>
    </header>
    <main class="padding-top40">
      <chat-pop v-for="(item, index) of  chatInfo.chatList" :key="index" :content="item"></chat-pop>
      <div style="clear: both;"></div>
      <section class="paddingX30">
        <div class="text-align-center padding20X color-999 font-size-2">已为患者开具处方</div>
        <div class="rp border1" >
          <title class="flex-baseline-spacebetween paddingX16 padding-top16">
            <div class="flex-baseline">
              <div class="margin-right20 bold">{{chatInfo.patientName}} </div>
              <div class="color-666">{{chatInfo.patientSex}} {{chatInfo.patientAge}}岁</div>
            </div>
            <div class="color-666">{{chatInfo.rpTime}}</div>
          </title>
          <div class="color-999 margin8X paddingX16 font-size-2">诊断结果：{{chatInfo.diagnosis}}</div>
          <div class="rp-detail font-size-2" v-for="(item, index) of chatInfo.rp" :key="index">
            <div class="flex-align-spacebetween color-333">
              <div style="max-width: 450px;">{{item.name}}</div>
              <div>{{item.amount}}{{item.amountUnit}}</div>
            </div>
            <div class=" margin-top16 color-666">
              <i class="icon-tip-fill margin-right10 color-theme"></i>
              <span>每次{{item.dosage}}{{item.dosageUnit}}</span>
              <span>&ensp;{{item.method}} </span>
              <span>{{item.timeState}}</span>
              <span>&ensp;共{{item.day}}天</span>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="fixed bottom0 bgcolor-white padding10X paddingX10 border-top1" style="width: 549px;">
      <el-input placeholder="请输入内容">
        <el-button slot="append">发送</el-button>
      </el-input>
    </footer>
  </div>
</template>

<script>
  import Chat_pop from "./chat_pop";

  export default {
    components: {chatPop: Chat_pop},
    props: ['chatId'],
    name: 'chat_room',
    data() {
      return {
        showDetail: true,
        chatInfo: {
          chatId: '20181108140001120423',
          doctorId: '123',
          doctorName: '医生',
          patientId: '1234',
          patientName: '古力娜扎',
          patientAge: '16',
          patientSex: '女',
          complain: '脑壳疼',
          photos: [],
          status: '1',
          rpId: '123123',
          rpTime: '2018-01-01',
          diagnosis: '吃饱了撑的',
          rp: [
            {
              name: '头孢克圬颗啊啊啊啊啊啊啊啊啊啊啊啊啊啊粒 50mg*6袋',
              amount: '2',
              amountUnit: '盒',
              dosage: '30',
              dosageUnit: '毫克',
              timeState: '一天3次',
              day:'5',
              method: '口服',
              price: '2'
            },
            {
              name: '头孢克圬颗粒 50mg*6袋',
              amount: '2',
              amountUnit: '盒',
              dosage: '30',
              dosageUnit: '毫克',
              timeState: '一天3次',
              day:'5',
              method: '口服'
            },
            {
              name: '头孢克圬颗粒 50mg*6袋',
              amount: '2',
              amountUnit: '盒',
              dosage: '30',
              dosageUnit: '毫克',
              timeState: '一天三次',
              day:'5',
              method: '口服'
            },
          ],
          chatList: [
            {
              originUserId: '1',
              originUserName: '来源',
              targetUserId: '2',
              targetUserName: '目标',
              originUserType: '1', //0 医生，1 患者
              time: '10:27',
              message: '吃了哦吃了哦'
            },
            {
              originUserId: '1',
              originUserName: '来源',
              targetUserId: '2',
              targetUserName: '目标',
              originUserType: '0', //0 医生，1 患者
              time: '10:27',
              message: '吃吗吃了吗吃了吃了吗吃了吗吃了吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗吃了吗'
            },
          ]
        },
      }
    },
    mounted() {
      // setTimeout(() => {
      //   this.showDetail = false
      // },2000)
    }
  }
</script>
<style lang="scss" scoped>
  .hidden {
    height: 45px;
    transition: all .3s;
  }

  .show {
    height: 100px;
    transition: all .3s;
  }
  .rp {
    background-color: white;
    border-radius: 4px;
  }
  .rp-detail {
    background-color: #fbfbfb;
    padding: 16px;
    border-bottom: #DDDDDD dashed 1px;
    &:last-child {
      border-bottom: none;
    }
  }
</style>
