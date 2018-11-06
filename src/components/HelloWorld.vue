<template>
  <div class="hello">
    <button @click="test">aaaa</button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      test() {
        this.$post({
          url: this.$apis.hello,
          // method: 'get'
        }).then(res => {
          console.log(res)
        })
        // this.$socket.emit('test')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
