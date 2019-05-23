<template>
  <div class="border-box">
    <el-container>
      <el-aside width="250px" class="text-align-center">
        <div class="margin-top100">
          <div class="bgcolor-white inline-block border-radius50 shadow">
            <img :src="head" class="block" style="height: 80px;width: 80px;">
          </div>
          <div class="margin-top10">
            {{doctorInfo.name}}
          </div>
          <section class="margin-top60">
            <!--<div class="shadow select-back"-->
            <!--:class="{'transform-1': selectIndex===1, 'transform-2': selectIndex===2, 'transform-3': selectIndex===3}"></div>-->
            <div v-if="doctorInfo.userType != 2" class="margin10X cursor-pointer padding10X"
                 :class="{'bold': selectIndex === 1, 'shadow': selectIndex === 1}"
                 @click="select(1)">
              <i class="icon-consultation"/>&nbsp;&nbsp;在线问诊
            </div>
            <div v-if="doctorInfo.userType != 2" class="margin10X cursor-pointer padding10X"
                 :class="{'bold': selectIndex === 2,'shadow': selectIndex === 2}"
                 @click="select(2)">
              <i class="icon-clock2"/>&nbsp;&nbsp;问诊历史
            </div>
            <div class="margin10X cursor-pointer padding10X"
                 :class="{'bold': selectIndex === 3,'shadow': selectIndex === 3}"
                 @click="select(3)">
              <i class="icon-dept"/>&nbsp;&nbsp;药品管理
            </div>
            <div class="margin10X cursor-pointer padding10X"
                 :class="{'bold': selectIndex === 4,'shadow': selectIndex === 4}"
                 @click="select(4)">
              <i class="icon-personal2-fill"/>&nbsp;&nbsp;医生管理
            </div>
            <!--todo 退出前检查有无进行中的问诊，退出时自动下线-->
            <div class="fixed bottom20 paddingX20 cursor-pointer" @click="quit">
              <i class="el-icon-back font-size-3">&nbsp;退出</i>
            </div>
          </section>
          <!--<section class="margin-top80 bold">-->
            <!--开启接诊-->
            <!--<el-switch-->
              <!--class="margin-top10"-->
              <!--style="display: block"-->
              <!--v-model="isOnline"-->
              <!--active-color="#13ce66"-->
              <!--inactive-color="#ff4949">-->
            <!--</el-switch>-->
          <!--</section>-->
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import head from '~/default/default_doctorhead.png'

  export default {
    name: "home",
    data() {
      return {
        head,
        doctorInfo: {
          name: '医生',
        },
        selectIndex: 1,
        isOnline: false,
        onlineDialog: false,
        chattingCount: 0,
      }
    },
    mounted() {
      this.selectIndex = this.$store.state.navIndex
      this.doctorInfo = this.$store.state.userInfo
    },
    methods: {
      select(index) {
        this.$store.commit('setChatInfo', null)
        this.selectIndex = index
        this.$store.commit('setNavIndex', index)
        if (index === 1) {
          this.$router.push({name: 'chat'})
        } else if (index === 2) {
          this.$router.push({name: 'history'})
        } else if (index === 3) {
          this.$router.push({name: 'medicine'})
        } else if (index === 4) {
          this.$router.push({name: 'doctor'})
        }
      },
      quit() {
        this.checkChatList().then(() => {
          if (this.chattingCount > 0) {
            this.$alert(`您有 ${this.chattingCount} 个问诊还在进行中，请完成问诊后再退出`, '提示', {
              confirmButtonText: '确定',
            });
          } else if (this.$store.state.userInfo.userType !=2) {
            this.$confirm('确定退出吗，退出后将暂停接诊', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              this.$router.push({name: 'login'})
            }).catch(() => {
            });
          } else {
            this.$router.push({name: 'login'})
          }
        })
      },
      async checkChatList() {
        await this.$post({
          url: this.$apis.getChatReqListByDocId,
          param: {
            doctorId: this.$store.state.userInfo.userId,
          },
          postType: 'json'
        }).then(res => {
          this.chattingCount = 0
          let temp = res.data.data
          temp.forEach(item => {
            if (item.chatStatus == 1) {
              this.chattingCount++
            }
          })
        })
      },
      updateOnlineStatus() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-aside {
    background-color: #32ae57;
    color: white;
    /*text-align: center;*/
    height: 100vh;
  }

  .el-main {
    padding: 0;
    color: #333;
    /*text-align: center;*/
    height: 100vh;
  }

  .select-back {
    border-right: 4px #ffffff solid;
    background-color: rgba(17, 17, 17, 0.25);
    height: 45px;
  }

  .transform-1 {
    transform: translateY(56px);
    transition: all .3s;
  }

  .transform-2 {
    transform: translateY(101px);
    transition: all .3s;
  }

  .transform-3 {
    transform: translateY(144px);
    transition: all .3s;
  }
</style>
