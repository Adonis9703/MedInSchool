<template>
  <div class="pop">
    <!--患者-->
    <div v-if="content.senderType==0" class=" flex-baseline float-right">
      <div class="color-gray padding-right10 font-size-4">{{content.msgTime}}</div>
      <div class="msg bgcolor-theme color-white margin-right10 font-size4">
        {{content.msgText}}
      </div>
      <img :src="doctor" class="block margin-right20" style="width: 55px;height: 55px;"/>
    </div>
    <!--医生-->
    <div v-else class=" flex-baseline float-left">
      <img :src="patient" class="block margin-left20" style="width: 55px;height: 55px;"/>
      <div class="msg bgcolor-white margin-left10">
        {{content.msgText}}
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
        patient
      }
    }
  }
</script>

<!--suppress CssInvalidPropertyValue -->
<style lang="scss" scoped>
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
