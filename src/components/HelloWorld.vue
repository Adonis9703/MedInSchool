<template>
  <div class="hello">
    <button @click="login">login</button>
    <button @click="register">register</button>
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
      register() {
        // this.$post({
        //   url: this.$apis.register,
        //   param: {
        //     id: '1',
        //     name: 'Alex',
        //     studentId: '5150510116',
        //     idCard: '330821199703104213',
        //     sex: '男',
        //     password: '123456'
        //   },
        //   postType: 'json'
        //   // method: 'get'
        // }).then(res => {
        //   console.log(res)
        // })
        // this.$socket.emit('test')
      },
      login() {
        this.$post({
          url: this.$apis.login,
          param: {
            studentId: '5150510116',
            password: '123456'
          },
          postType: 'json'
        }).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
