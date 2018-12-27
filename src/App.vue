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
      console.log(`connected to service`)
    }
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
