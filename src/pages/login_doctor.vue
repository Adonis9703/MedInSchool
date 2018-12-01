<template>
  <div>
    医生登录页
    <button @click="send">
      发送ws
    </button>
  </div>
</template>

<script>
  export default {
    name: "login_doctor",
    data() {
      return {
        webSocket: null
      }
    },
    mounted() {
      this.initWebSocket()
    },
    methods: {
      initWebSocket() {
        this.$ws.onopen = (res) => {
          console.log(11111111, res)
        }
        this.$ws.onmessage = (res) => {
          console.log('来自服务器', res.data)
        }
      },
      send() {
        this.$ws.send('医生端')
      }
    }
  }
</script>

<style scoped>

</style>
