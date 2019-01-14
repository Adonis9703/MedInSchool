<template>
  <div>
    <el-container>
      <el-aside width="400px" class="bgcolor-f6 border-right1">
        <!--<header class="padding10X text-align-center">问诊列表</header>-->
        <div class="chat-panel" v-for="(item, index) of chatList" :key="index" @click="selectReq(item)">
          <main class="flex-align">
            <img :src="patient" class="block" style="height: 50px;width: 50px;">
            <section class="width100 margin-left10">
              <div class="bold margin-bottom4 flex-spacebetween">{{item.patient}}
                <span class="dot margin-right12"></span>
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
            <div class="color-666">主诉：{{item.complain}}</div>
            <div v-if="item.chatStatus == 0" class="">待接诊</div>
            <div v-if="item.chatStatus == 1" class="color-theme">问诊中</div>
          </div>
        </div>
      </el-aside>
      <el-aside width="550px" class="bgcolor-f6 border-right1">
        <!--todo 点击对话列表 将问诊信息和聊天记录存入缓存 有缓存则显示聊天室-->
        <chat-room v-if="chatId" :chatId="chatId"></chat-room>
        <div v-else>请选择就诊请求</div>
      </el-aside>
      <el-main>
        <handle-rp></handle-rp>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import doctor from '~/default/default_doctorhead.png'
  import patient from '~/default/user_heading.png'
  import chatRoom from '@/components/chat_room'
  import handleRp from "@/components/handle_rp";

  export default {
    components: {handleRp: handleRp, chatRoom: chatRoom},
    name: "chat",
    data() {
      return {
        doctor,
        patient,
        chatId: '',
        chatList: [],
      }
    },
    //store 里的数据实时渲染时 要在computed 里拿
    computed: {},
    mounted() {
      this.getReqList()
    },
    methods: {
      selectReq(item) {
        this.chatId = item.chatId
        this.getMessage()
        this.$store.commit('setChatInfo', item)
      },
      getMessage() {
        this.$post({
          url: this.$apis.getMsgHistory,
          param: {
            chatId: this.chatId
          },
          postType: 'json'
        }).then(res => {
          this.$store.commit('setMsgHistory', res.data.data)
        })
      },
      getReqList() {
        this.$post({
          url: this.$apis.getChatReqListByDocId,
          param: {
            doctorId: this.$store.state.userInfo.userId
          },
          postType: 'json'
        }).then(res => {
          this.chatList = res.data.data
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

  .dot {
    background: red;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }
</style>
