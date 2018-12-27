<template>
  <div class="back">
    <div style="padding-top: 300px">
      <el-row>
        <el-col :xl="11" :lg="9" :md="10" :offset="3">
          <div class="color-white bold title">浙科医务室 医生端</div>
        </el-col>
        <el-col :lg="5" :md="3">
          <div class="card-panel border-radius8 shadow margin-left60 paddingX26 padding-top26 padding-bottom20">
            <div class="">
              <input class="input-dark block paddingX10 padding10X " placeholder="工号"/>
              <input class="input-dark block paddingX10 padding10X margin-top20" placeholder="密码" type="password"/>
            </div>
            <el-checkbox v-model="checked" class="margin-top20">
              记住我
            </el-checkbox>
            <span class="margin-left70 font-size-4 color-999">忘记密码</span>
            <div class="margin-top20">
              <el-button type="primary" round>
                <span class="paddingX60" @click="$router.push({name: 'chat'})">登陆</span>
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import anji from '~/back/anji_front.jpg'
  import lake from '~/back/lake.jpg'
  import playground from '~/back/uni_playground.jpg'

  export default {
    name: "login",
    data() {
      return {
        anji,
        lake,
        playground,
        checked: true
      }
    }
  }
</script>
<style>
  .el-checkbox{
    color: #999999;
  }
</style>
<style lang="scss" scoped>
  .back {
    width: 100%;
    position: absolute;
    height: 100%;
    background-image: url("../assets/images/back/uni_playground.jpg")
  }

  .title {
    display: inline-block;
    letter-spacing: 5px;
    font-family: "方正兰亭超细黑简体";
    font-size: 80px;
  }

  input {
    color: #666666;
    font-size: 16px;
    width: 200px;
  }
</style>
