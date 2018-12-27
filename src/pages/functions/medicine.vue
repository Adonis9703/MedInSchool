<template>
    <div>
      <el-container>
        <el-aside width="400px">medicine</el-aside>
        <el-aside width="550px" class="bgcolor-ddd">Aside2</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "medicine"
    }
</script>

<style lang="scss" scoped>
  .el-aside {
    text-align: center;
    height: 100vh;
  }

  .el-main {
    padding: 0;
    background-color: #E9EEF3;
    text-align: center;
    height: 100vh;
  }
</style>
