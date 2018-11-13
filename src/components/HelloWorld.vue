<template>
  <div class="hello">
    <button @click="login">login</button>
    <button @click="register">register</button>
    <button @click="update">update</button>
    <button @click="chat">chat</button>
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
    mounted() {
      this.$socket.on('get', (data) => {
        if (data.id === '1') {
          console.log(data)
        }
      })
    },
    methods: {
      chat() {
        this.$socket.emit('send', {id: '2', msg: 'doctor client'})
      },
      update() {
        this.$post({
          url: this.$apis.studentUpdate,
          param: {
            studentId: '5150510116',
            newInfo: {
              studentId: '5150510115'
            }
          },
          postType: 'json'
        })
      },
      register() {
        this.$post({
          url: this.$apis.register,
          param: {
            name: 'Alex',
            studentId: '5150510114',
            idCard: '330821199703104213',
            sex: '男',
            password: '123456',
            tel: '15869106432',
            bloodType: 'A',
            otherInfo: '暂无',
            allergy: '暂无过敏'
          },
          postType: 'json'
          // method: 'get'
        }).then(res => {
          console.log(res)
        })
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
