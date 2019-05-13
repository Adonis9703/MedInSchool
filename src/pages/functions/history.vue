<template>
  <div>
    <el-container>
      <el-aside width="400px" class="border-right1">
        <div class="chat-panel" v-for="(item, index) of chatList" :key="index" @click="selectReq(item)">
          <main class="flex-align">
            <img :src="patient" class="block" style="height: 50px;width: 50px;">
            <section class="width100 margin-left10">
              <div class="bold margin-bottom4 flex-spacebetween">{{item.patient}}
                <!--<span class="dot margin-right12"></span>-->
              </div>
              <div class="font-size-2 flex-align-spacebetween color-666">
                <div>{{item.patientName}}</div>
                <div>{{item.chatTime}}</div>
                <!--<div>{{item.chatInfo.user|| '患者'}}：{{item.chatInfo.message || '内容'}}</div>-->
                <!--<div>{{item.chatInfo.time || '时间'}}</div>-->
              </div>
            </section>
          </main>
          <div class="border-top1 font-size-2 flex-align-spacebetween margin-top10 padding-top4">
            <div class="color-666" style="width: 300px;">主诉：{{item.complain}}</div>
            <div v-if="item.chatStatus == 2" class="color-theme">已完成</div>
            <div v-if="item.chatStatus == 3" class="color-333">已拒绝</div>
          </div>
        </div>
        <div v-if="chatList.length == 0" class="text-align-center padding60X">
          <img :src="nodata" height="120">
          <div class="color-999 font-size-2 margin-top20">暂无问诊历史</div>
        </div>
      </el-aside>
      <el-aside width="550px" class="border-right1">
        <chat-room v-if="chatInfo" :chatId="chatInfo.chatId" :type="'history'" @refresh="getReqList"></chat-room>
        <section v-else class="paddingX20 padding20X">
          <div class="card-panel shadow padding10X width100" style="border-top: #32ae57 solid 6px;">
            <div class="color-theme bold font-size2 border-bottom1 paddingX20 padding-bottom10">接诊步骤</div>
            <div class="padding20X paddingX20" style="height: 200px;">
              <el-steps direction="vertical" :active="3">
                <el-step title="选择接诊请求" description="接受或拒绝问诊请求"></el-step>
                <el-step title="开始问诊" description="与患者实时对话"></el-step>
                <el-step title="开具处方/结束问诊" description="填写医嘱、开具处方"></el-step>
              </el-steps>
            </div>
          </div>
        </section>
      </el-aside>
      <el-main>
        <handle-rp :type="'history'" @refresh="getReqList"></handle-rp>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import doctor from '~/default/default_doctorhead.png'
  import patient from '~/default/user_heading.png'
  import chatRoom from '@/components/chat_room'
  import handleRp from "@/components/handle_rp";
  import nodata from '~/default/default_nodata.png'

  export default {
    components: {handleRp: handleRp, chatRoom: chatRoom},
    name: "history",
    data() {
      return {
        nodata,
        doctor,
        patient,
        chatId: '',
        chatList: []
      }
    },
    computed: {
      chatInfo: {
        set: function () {

        },
        get: function () {
          return this.$store.state.chatInfo
        }
      },
    },
    mounted() {
      this.getReqList()
      if (this.$store.state.chatInfo) {
        this.selectReq(this.$store.state.chatInfo)
      }
    },
    methods: {
      getMessage() {
        this.$post({
          url: this.$apis.getMsgHistory,
          param: {
            chatId: this.chatInfo.chatId
          },
          postType: 'json'
        }).then(res => {
          let msg = res.data.data
          msg.forEach(item => {
            if (item.msgImgs) {
              item.msgImgs = JSON.parse(item.msgImgs)
            }
          })
          this.$store.commit('setMsgHistory', msg)
        })
      },
      selectReq(item) {
        // this.getPatSocket(item)
        this.$store.commit('setChatInfo', item)
        // this.chatId = item.chatId

        this.$post({
          url: this.$apis.getRpByChatId,
          param: {
            chatId: this.chatInfo.chatId
          },
          postType: 'json'
        }).then(res => {
          if (res.data.success) {
            this.$store.commit('setRpTemp', res.data.data)
          }
        })
        this.getMessage()
      },
      getReqList() {
        this.$post({
          url: this.$apis.getChatReqListByDocId,
          param: {
            doctorId: this.$store.state.userInfo.userId,
          },
          postType: 'json'
        }).then(res => {
          this.chatList = []
          let temp = res.data.data
          temp.forEach(item => {
            if (item.chatStatus == 2 || item.chatStatus == 3) {
              this.chatList.push(item)
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-aside {
    height: 100vh;
  }

  .el-main {
    padding: 0;
    height: 100vh;
  }

  .chat-panel {
    background-color: white;
    padding: 10px;
    /*margin: 10px 0;*/
    /*border-bottom: #e2e2e2 solid 1px;*/
    border-top: #e2e2e2 solid 1px;
    &:last-child {
      border-bottom: #e2e2e2 solid 1px;
    }
  }
</style>
