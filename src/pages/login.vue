<template>
  <div>
    <img :src="playground" class="width100 height100 fixed z-index-1">
    <div style="padding-top: 300px">
      <el-row>
        <el-col :lg="9" :md="10" :offset="5">
          <div class="color-white bold title">浙科医务室</div>
        </el-col>
        <el-col :lg="6" :md="3">
          <div class="card-panel shadow margin-left60">asdas</div>
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
  .title {
    display: inline-block;
    letter-spacing: 15px;
    font-family: "Microsoft YaHei UI Light";
    font-size: 80px;
  }
</style>
