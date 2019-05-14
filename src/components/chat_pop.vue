<template>
  <div class="pop">
    <!--医生-->
    <div v-if="content.senderType==1" class="margin-bottom10 flex-baseline float-right">
      <div class="color-gray padding-right10 font-size-4">{{content.msgTime}}</div>
      <div class="msg bgcolor-theme color-white margin-right10 font-size4">
        {{content.msgText}}
        <div v-if="content.msgImgs && content.msgImgs.length>0">
          <img class="inline-block bigger" v-for="(item, index) in content.msgImgs" :key="index" :src="baseUrl+item" style="width: 100%;">
        </div>
      </div>
      <img :src="doctor" class="block margin-right20" style="width: 55px;height: 55px;"/>
    </div>
    <!--患者-->
    <div v-else class=" flex-baseline float-left margin-bottom10">
      <img :src="patient" class="block margin-left20" style="width: 55px;height: 55px;"/>
      <div class="msg bgcolor-white margin-left10">
        {{content.msgText || ''}}
        <div v-if="content.msgImgs && content.msgImgs.length>0">
          <img class="inline-block bigger" v-for="(item, index) in content.msgImgs" :key="index" :src="baseUrl+item" style="width: 160px">
        </div>
        <div v-if="content.msgRadio && content.msgRadio.length>0">
          <audio controls="controls">
            <source :src="baseUrl+content.msgRadio" type="audio/aac" />
            Your browser does not support this audio format.
          </audio>
        </div>
      </div>
      <div class="color-gray padding-left10 font-size-4">{{content.msgTime}}</div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
  import doctor from '~/default/default_doctorhead.png'
  import patient from '~/default/user_heading.png'

  export default {
    props: ['content'],
    name: "chat_pop",
    data() {
      return {
        doctor,
        patient,
        baseUrl: this.$apis.base + '/'
      }
    }
  }
</script>

<!--suppress CssInvalidPropertyValue -->
<style lang="scss" scoped>
  .bigger:hover {
    transform: scale(3);
    transition: all .3s;
    z-index: 99;
    /*position: absolute;*/
  }
  .bigger {
    transform: scale(1);
    transition: all .3s;
  }
  .pop {
    color: #666666;
    .msg {
      font-size: 17px;
      max-width: 388px;
      /*margin-right: 20px;*/
      /*background: white;*/
      padding: 12px 16px;
      border-radius: 8px;
    }
  }
</style>
