<template>
  <main class="margin60X marginX60">
    <section class="bgcolor-white shadow paddingX40 padding-top26">
      <el-form :model="searchForm" :inline="true">
        <el-form-item label="搜索药品">
          <el-input size="small" placeholder="输入药品名称" clearable v-model="searchForm.keyword"></el-input>
        </el-form-item>
        <el-button @click="getMedList" icon="el-icon-search" type="success" circle plain
                   :loading="searchLoading"></el-button>
      </el-form>
      <el-form :rules="rules" ref="addForm" :model="addForm" :inline="true">
        <el-form-item label="添加药品" prop="name">
          <el-input v-model.trim="addForm.name" size="small" placeholder="药品名称（例：感冒灵胶囊 10粒/盒）"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item prop="amount">
          <el-input v-model.trim="addForm.amount" type="number" size="small" placeholder="数量"
                    style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item prop="amountUnit">
          <el-input v-model.trim="addForm.amountUnit" size="small" placeholder="单位" style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item prop="price">
          <el-input v-model.trim="addForm.price" size="small" placeholder="价格/元" style="width: 80px"></el-input>
        </el-form-item>
        <el-button @click="addMed" icon="el-icon-plus" type="success" plain circle :loading="addLoading"></el-button>
      </el-form>
    </section>
    <section class="bgcolor-white shadow margin-top40 paddingX40 padding40X">
      <el-table
        border
        :data="showList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="药品名称">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="amountUnit"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="editTime"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="editPerson"
          label="修改者">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editMed(scope.row)" type="text" size="">编辑</el-button>
            <el-button type="text" size="" style="color: red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </main>
</template>

<script>
  export default {
    name: "medicine",
    data() {
      return {
        addLoading: false,
        searchLoading: false,
        searchForm: {
          keyword: ''
        },
        addForm: {
          name: '',
          amount: '',
          amountUnit: '',
          price: '',
        },
        rules: {
          name: [{required: true, message: '请输入药品名称', trigger: 'blur'}],
          amount: [{required: true, message: '请输入数量', trigger: 'blur'}],
          amountUnit: [{required: true, message: '请输入单位', trigger: 'blur'}],
          price: [{required: true, message: '请输入价格', trigger: 'blur'}]
        },
        showList: []
      }
    },
    mounted() {
      this.getMedList()
    },
    methods: {
      editMed(val) {
        this.$message.success(val.name)
      },
      getMedList() {
        this.$post({
          url: this.$apis.getMedInfoList,
          param: {
            name: this.searchForm.keyword
          },
          postType: 'json'
        }).then(res => {
          if (res.data.success) {
            this.showList = res.data.data
          }
        })
      },
      addMed() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$post({
              url: this.$apis.addMedInfo,
              param: {
                ...this.addForm,
                editPerson: this.$store.state.userInfo.name,
                editTime: new Date().toLocaleString()
              },
              postType: 'json'
            }).then(res => {
              if (res.data.success) {
                this.$refs.addForm.resetFields()
                this.$message.success({
                  message: '添加成功！'
                })
              }
            })
          }
        })
      }
    }
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
