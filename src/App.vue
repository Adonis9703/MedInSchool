<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    sockets: {
      connect() {
        console.log(`成功连接至聊天服务器`)
      },
    },
    methods: {},
    mounted() {
      this.$socket.emit('refresh', {
        userId: this.$store.state.userInfo.userId
      })
    }
  }
</script>

<style>
  body {
    height: 100%;
    margin: 0;
  }
</style>
