<template>
  <div>
    <header>
      <div :class="{'hidden': !showDetail,'show': showDetail}"
           class=" bgcolor-white padding10X  shadow"
           @click="showDetail=!showDetail">
        <div class="cursor-pointer text-align-center" >
          <span class="bold">{{chatInfo.patient}}</span>
          <i class="icon-unfold color-theme" :class="{'rotate180' : showDetail, 'rotate0': !showDetail}"/>
        </div>
        <div class="margin-top10">
          asdas
          <div></div>
        </div>
      </div>
    </header>
    <main class="">
      adasad
    </main>
  </div>
</template>

<script>
  export default {
    props: ['chatId'],
    name: 'chat_room',
    data() {
      return {
        showDetail: true,
        chatInfo: {
          patient: '古力娜扎',
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.showDetail = false
      },2000)
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
</style>
