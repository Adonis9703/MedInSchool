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
          <div>
            {{chatInfo.complain }}
          </div>
        </div>
      </div>
    </header>
    <main class="padding-top60" id="chatContainer">
      <div @click="admissions">接诊</div>
      <chat-pop v-for="(item, index) of msgHistory" :key="index" :content="item"></chat-pop>
      <div style="clear: both;"></div>
      <!--<section class="paddingX30">-->
      <!--<div class="text-align-center padding20X color-999 font-size-2">已为患者开具处方</div>-->
      <!--<div class="rp border1" >-->
      <!--<title class="flex-baseline-spacebetween paddingX16 padding-top16">-->
      <!--<div class="flex-baseline">-->
      <!--<div class="margin-right20 bold">{{chatInfo.patientName}} </div>-->
      <!--<div class="color-666">{{chatInfo.patientSex}} {{chatInfo.patientAge}}岁</div>-->
      <!--</div>-->
      <!--<div class="color-666">{{chatInfo.rpTime}}</div>-->
      <!--</title>-->
      <!--<div class="color-999 margin8X paddingX16 font-size-2">诊断结果：{{chatInfo.diagnosis}}</div>-->
      <!--<div class="rp-detail font-size-2" v-for="(item, index) of chatInfo.rp" :key="index">-->
      <!--<div class="flex-align-spacebetween color-333">-->
      <!--<div style="max-width: 450px;">{{item.name}}</div>-->
      <!--<div>{{item.amount}}{{item.amountUnit}}</div>-->
      <!--</div>-->
      <!--<div class=" margin-top16 color-666">-->
      <!--<i class="icon-tip-fill margin-right10 color-theme"></i>-->
      <!--<span>每次{{item.dosage}}{{item.dosageUnit}}</span>-->
      <!--<span>&ensp;{{item.method}} </span>-->
      <!--<span>{{item.timeState}}</span>-->
      <!--<span>&ensp;共{{item.day}}天</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</section>-->
    </main>
    <div class="width100" style="height: 80px"></div>
    <footer class="fixed bottom0 bgcolor-white padding10X paddingX10 border-top1" style="width: 549px;">
      <el-input placeholder="请输入内容" v-model.trim="text">
        <el-button slot="append" @click="send" :disabled="chatInfo.chatStatus==0">发送</el-button>
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
    computed: {
      chatInfo: {
        set: function () {

        },
        get: function () {
          return this.$store.state.chatInfo
        }
      },
      msgHistory: {
        set: function () {

        },
        get: function () {
          return this.$store.state.msgHistory
        }
      }
    },
    watch: {
      msgHistory() {
        console.log(`滚动`)
        this.$nextTick(() => {
          let container = this.$el.querySelector("#chatContainer");
          container.scrollTop = container.scrollHeight;
        })
      }
    },
    data() {
      return {
        text: '',
        showDetail: true,
      }
    },
    mounted() {
      this.$socket.on('historySaved', res => {
        this.text = ''
        console.log(res)
      })
      this.$socket.on('service2doc', res => {
        this.$store.commit('addMsgHistory', res)
        console.log('客户端的消息', res)
      })
    },
    methods: {
      admissions() {
        let temp = this.$store.state.chatInfo
        temp.chatStatus = 1
        this.$post({
          url: this.$apis.updateChatInfo,
          param: temp,
          postType: 'json'
        }).then(res => {
          if (res.data.success) {
            console.log('更新问诊信息')
            this.$store.commit('setChatInfo', res.data.data)
            this.$socket.emit('admissions', this.$store.state.chatInfo)
          }
        })
      },
      send() {
        if (this.text === '') {
          this.$message.info('内容不能为空！')
          return
        }
        let data = {
          chatId: this.$store.state.chatInfo.chatId,
          senderType: '1',
          senderId: this.$store.state.userInfo.userId,
          receiverId: this.$store.state.chatInfo.patientId,
          msgText: this.text,
          msgTime: new Date().toTimeString().substring(0, 5),
        }
        this.$store.commit('addMsgHistory', data)
        this.$socket.emit('doc2service', data)
      }
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
