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
  methods: {
  }
}
</script>

<style>
  body{
    height: 100%;
    margin: 0;
  }
</style>
