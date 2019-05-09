<template>
  <div  v-loading="loading">
    <header class="fixed" style="width: 549px;">
      <div class=" bgcolor-white padding10X">
        <div class="text-align-center">
          <span class="bold color-666">{{chatInfo.patientName}}</span>
        </div>
      </div>
    </header>
    <main class="padding-top60" id="chatContainer">
      <el-collapse-transition>
        <div class="paddingX40 margin-bottom20" v-if="showDetail">
          <div class="chat-detail shadow bgcolor-white margin-top20">
            <div class="padding10X paddingX20 color-theme font-size4 border-bottom1 bold">
              问诊信息
            </div>
            <div class="paddingX20 padding20X font-size0">
              <div>
                <span class="color-theme bold">患者：</span>
                {{chatInfo.patientName}} · {{chatInfo.patientSex}} · {{chatInfo.patientAge}}岁 ·
                {{chatInfo.patientBloodType}}型血
              </div>
              <div class="margin-top10">
                <span class="color-theme bold">过敏史：</span>
                {{chatInfo.patientAllergy || '暂无'}}
              </div>
              <div class="margin-top10">
                <span class="color-theme bold">备注：</span>
                {{chatInfo.other || '暂无'}}
              </div>
              <div class="margin-top10 ">
                <span class="color-theme bold">主诉：</span>
                {{chatInfo.complain}}
              </div>
            </div>
            <div class="paddingX20 padding-bottom20" v-if="chatInfo.complainImgs && chatInfo.complainImgs!=''">
              <img class="inline-block bigger" height="143" width="143" :src="baseUrl+item"
                   v-for="(item, index) in chatInfo.complainImgs" :key="index">
            </div>
          </div>
          <div v-if="chatInfo.chatStatus == 0" class="text-align-center padding20X">
            <el-button type="success" slot="reference" icon="el-icon-check" circle @click="admissions"></el-button>
            <el-button type="danger" slot="reference" icon="el-icon-close" circle @click="refuse"></el-button>
          </div>
        </div>
      </el-collapse-transition>

      <!--<div @click="admissions">接诊</div>-->
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
    <section v-if="chatInfo.chatStatus == 1" class="fixed text-align-center paddingX20" style="bottom: 80px">
      <el-popover
        placement="right"
        width="150"
        trigger="hover"
        content="查看问诊信息">
        <el-button type="warning" slot="reference" icon="el-icon-document" circle
                   @click="showDetail = !showDetail"></el-button>
      </el-popover>
      <el-popover
        style="margin-left: 380px"
        placement="left"
        width="150"
        trigger="hover"
        content="结束问诊">
        <el-button type="danger" slot="reference" icon="el-icon-close" circle @click="endChat"></el-button>
      </el-popover>
      <el-popover
        placement="left"
        width="150"
        trigger="hover"
        content="为患者开具处方">
        <el-button type="success" slot="reference" icon="el-icon-edit" circle></el-button>
      </el-popover>
    </section>
    <footer class="fixed bottom0 bgcolor-white padding10X paddingX10 border-top1" style="width: 549px;">
      <el-input placeholder="请输入内容" @keyup.enter.native="send" v-model.trim="text">
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
      },
      chatInfo() {
        let temp = this.chatInfo
        this.showDetail = temp.chatStatus != 1;
        if (temp.complainImgs === temp.complainImgs + '') {
          temp.complainImgs = temp.complainImgs.split(',')
          this.$store.commit('setChatInfo', temp)
        }
      }
    },
    sockets: {
      service2doc(res) {
        if (res.msgImgs) {
          res.msgImgs = JSON.parse(res.msgImgs)
        }
        console.log('===> chat_room.vue 获取服务器转发的消息', res)
        this.$store.commit('addMsgHistory', res)
      },
      historySaved(res) {
        console.log('===> chat_room.vue 保存消息记录', res)
        this.text = ''
      }
    },
    data() {
      return {
        loading: false,
        text: '',
        showDetail: false,
        patientInfo: {},
        baseUrl: this.$apis.base + '/'
      }
    },
    mounted() {
      if (this.chatInfo) {
        let temp = this.chatInfo
        if (temp.complainImgs === temp.complainImgs + '') {
          temp.complainImgs = temp.complainImgs.split(',')
          this.$store.commit('setChatInfo', temp)
        }
      }
      this.showDetail = this.chatInfo.chatStatus == 0
      // console.log('===> chat_room.vue 聊天室初始化成功')
      // this.$socket.on('historySaved', res => {
      //   console.log('===> chat_room.vue 保存消息记录')
      //   this.text = ''
      //   console.log(res)
      // })
      // this.$socket.on('service2doc', res => {
      //   console.log('===> chat_room.vue 获取服务器转发的消息')
      //   this.$store.commit('addMsgHistory', res)
      //   console.log('客户端的消息', res)
      // })
    },
    methods: {
      admissions() {
        this.loading = true
        let temp = {...this.$store.state.chatInfo}
        temp.chatStatus = 1
        temp.complainImgs += ''
        this.$post({
          url: this.$apis.updateChatInfo,
          param: temp,
          postType: 'json'
        }).then(res => {
          if (res.data.success) {
            setTimeout(()=> {
              this.loading = false
            },1000)
            this.$message.success('成功接诊，可以和患者进行沟通了')
            this.showDetail = false
            let temp1 = res.data.data
            temp1.complainImgs = temp1.complainImgs.split(',')
            this.$store.commit('setChatInfo', temp1)
            this.$socket.emit('admissions', this.$store.state.chatInfo)
            let data = {
              chatId: this.$store.state.chatInfo.chatId,
              senderType: '1',
              senderId: this.$store.state.userInfo.userId,
              receiverId: this.$store.state.chatInfo.patientId,
              msgText: '医生已经接诊，可以开始问诊啦',
              msgTime: new Date().toTimeString().substring(0, 5),
            }
            this.$socket.emit('doc2service', data)
            this.$store.commit('addMsgHistory', data)
            this.$emit('refresh')
          }
        })
      },
      refuse() {
        this.$prompt('请输入拒绝理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:  /\S/,
          inputErrorMessage: '内容不得为空'
        }).then((val) => {
          this.loading = true
          let temp = this.$store.state.chatInfo
          temp.chatStatus = 3
          temp.refuseReason = val.value
          if (temp.complainImgs !== temp.complainImgs + '') {
            temp.complainImgs += ''
          }
          this.$post({
            url: this.$apis.updateChatInfo,
            param: temp,
            postType: 'json'
          }).then(res => {
            this.$store.commit('setChatInfo', null)
            this.$emit('refresh')
            this.$message.success('成功拒绝问诊')
            setTimeout(()=> {
              this.loading = false
            },1000)
          })
        }).catch(() => {
        });
      },
      endChat() {
        this.$prompt('请填写诊断结果', '提示', {
          confirmButtonText: '提交并结束',
          cancelButtonText: '继续问诊',
          inputPattern:  /\S/,
          inputErrorMessage: '内容不得为空'
        }).then(val => {
          this.$post({
            url: this.$apis.updateChatInfo,
            param: {
              chatId: this.chatInfo.chatId,
              chatStatus: 2,
              diagnosis: val.value
            },
            postType: 'json'
          }).then(res=> {
            if (res.data.success) {
              this.$message.success('成功结束问诊')
              this.$store.commit('setChatInfo', null)
              this.$emit('refresh')
            }
          })
        }).catch(()=>{})
      },
      send() {
        if (this.text === '') {
          this.$notify.error({
            title: '错误',
            message: '内容不能为空！'
          })
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
  .bigger:hover {
    transform: scale(5);
    transition: all .3s;
    position: absolute;           /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
    z-index: 1000;
  }
  .bigger {
    transform: scale(1);
    transition: all .3s;
  }

  .chat-detail {
    border-top: #32ae57 solid 6px;
  }

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

    .bigger :hover {
      transform: scale(1.2);
      transition: all .3s;
    }
  }
</style>
