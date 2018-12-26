<template>
  <div class="back">
    <div style="padding-top: 300px">
      <el-row>
        <el-col :lg="9" :md="10" :offset="5">
          <div class="color-white bold title">浙科医务室</div>
        </el-col>
        <el-col :lg="6" :md="3">
          <div class="card-panel shadow margin-left60 paddingX20 padding20X">
            <div class="">
              <input class="input-dark block paddingX10 padding10X font-size-4" placeholder="工号"/>
              <input class="input-dark block paddingX10 padding10X font-size-4 margin-top20" placeholder="密码" type="password"/>
            </div>
            <div class="btn-primary margin-top10">登陆</div>
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
        playground
      }
    }
  }
</script>

<style lang="scss" scoped>
  .back {
    width: 100%;
    position: absolute;
    height: 100%;
    background-image: url("../assets/images/back/uni_playground.jpg")
  }

  .title {
    display: inline-block;
    letter-spacing: 15px;
    font-family: "Microsoft YaHei UI Light";
    font-size: 80px;
  }
  input{
    max-width: 200px;
  }
</style>
