<template>
  <div id="app">
    <img src="./assets/logo.png" @click="test">
    <button @click="$router.push({name: 'Doctor'})">doctor</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // sockets: {
  //   // connect() {
  //   //   console.log(`connected to service`)
  //   // }
  // },
  methods: {
    test() {
      // this.$socket.emit('test')
    }
  }
}
</script>

<style>
</style>
