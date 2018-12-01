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
      // this.$socket.on('get', (data) => {
      //
      //   console.log(data)
      //
      // })
    },
    methods: {
      chat() {
        this.$post({
          url: this.$apis.getSocketInfo,
          param: {
            userId: '5150510116' //获取到要聊天对象的id 此处写死用作测试
          },
          postType: 'json'
        }).then(res => {
          console.log('对象socket信息: \n', res.data.socketInfo)
          // this.$socket.emit('send', {id: '2', msg: 'doctor client', receiver: res.data.socketInfo.socketId})
        })
      },
      update() {
        this.$post({
          url: this.$apis.studentUpdate,
          param: {
            studentId: '515051011111',
            newInfo: {
              bloodType: 'D'
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
            studentId: '5150510110',
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
          if (res.data.msg === '注册成功')
            // this.$socket.emit('register', {userId: '5150510110'})
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
          // this.$socket.emit('login', {userId: '5150510116'})
          console.log(res.data)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
