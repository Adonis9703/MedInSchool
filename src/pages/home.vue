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
          <section class="margin-top10">
            <div class="shadow select-back"
                 :class="{'transform-1': selectIndex===1, 'transform-2': selectIndex===2, 'transform-3': selectIndex===3}"></div>
            <div class="margin20X cursor-pointer color-ddd" :class="{'font-size3': selectIndex===1}" @click="select(1)">
              在线问诊&nbsp;&nbsp;<i class="icon-consultation"/></div>
            <div class="margin20X cursor-pointer" :class="{'font-size3': selectIndex===2}" @click="select(2)">
              问诊历史&nbsp;&nbsp;<i class="icon-clock2"/></div>
            <div class="margin20X cursor-pointer" :class="{'font-size3': selectIndex===3}" @click="select(3)">
              药品管理&nbsp;&nbsp;<i class="icon-dept"/></div>
          </section>
          <section class="margin-top80">
            开启接诊
            <el-switch
              class="margin-top20"
              style="display: block"
              v-model="isOnline"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-icon-class="el-icon-check"
              inactive-icon-class="el-icon-close">
            </el-switch>
          </section>
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
        isOnline: false
      }
    },
    mounted() {
      this.doctorInfo = this.$store.state.userInfo
    },
    methods: {
      select(index) {
        this.selectIndex = index
        if (index === 1) {
          this.$router.push({name: 'chat'})
        }
        if (index === 2) {
          this.$router.push({name: 'history'})
        }
        if (index === 3) {
          this.$router.push({name: 'medicine'})
        }
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
