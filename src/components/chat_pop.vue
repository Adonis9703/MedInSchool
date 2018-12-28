<template>
  <div class="pop">
    <!--患者-->
    <div v-if="content.originUserType==='0'" class="margin-top20 flex-baseline float-right">
      <div class="color-gray padding-right10 font-size-4">{{content.time}}</div>
      <div class="msg bgcolor-theme color-white margin-right10 font-size4">
        {{content.message}}
      </div>
      <img :src="doctor" class="block margin-right10" style="width: 55px;height: 55px;"/>
    </div>
    <!--医生-->
    <div v-else class="margin-top20 flex-baseline float-left">
      <img :src="patient" class="block margin-left10" style="width: 55px;height: 55px;"/>
      <div class="msg bgcolor-white margin-left10">
        {{content.message}}
      </div>
      <div class="color-gray padding-left10 font-size-4">{{content.time}}</div>
    </div>
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
