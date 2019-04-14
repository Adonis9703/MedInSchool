<template>
  <main class="margin30X marginX30">
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
          <el-input v-model.trim="addForm.amount" type="number" min="0" size="small" placeholder="数量"
                    style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item prop="amountUnit">
          <el-input v-model.trim="addForm.amountUnit" size="small" placeholder="单位" style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item prop="price">
          <el-input v-model.trim="addForm.price" type="number" size="small" placeholder="价格/元"
                    style="width: 100px"></el-input>
        </el-form-item>
        <el-button @click="addMed" icon="el-icon-plus" type="success" plain circle :loading="addLoading"></el-button>
      </el-form>
    </section>
    <section class="bgcolor-white shadow margin-top40 paddingX40 padding40X">
      <el-table v-loading="showList.length==0" border :data="showList" stripe style="width: 100%">
        <el-table-column prop="name" label="药品名称" sortable></el-table-column>
        <el-table-column prop="amount" label="数量" sortable></el-table-column>
        <el-table-column prop="amountUnit" label="单位"></el-table-column>
        <el-table-column prop="price" label="价格/元" sortable></el-table-column>
        <el-table-column prop="editTime" label="修改时间" sortable></el-table-column>
        <el-table-column prop="editPerson" label="修改者" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editMed(scope.row)" type="text" size="">编辑</el-button>
            <el-button @click="showDelete(scope.row)" type="text" size="" style="color: red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-align-center margin-top30">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="10"
          layout="total, prev, pager, next, sizes"
          :total="total">
        </el-pagination>
      </div>
    </section>
    <el-dialog title="编辑药品" :visible.sync="showDialog" close-on-click-modal>
      <el-form :model="editForm" inline>
        <el-form-item label="添加药品" prop="name">
          <el-input v-model.trim="editForm.name" size="small" placeholder="药品名称（例：感冒灵胶囊 10粒/盒）"
                    style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item prop="amount">
          <el-input v-model.trim="editForm.amount" type="number" min="0" size="small" placeholder="数量"
                    style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item prop="amountUnit">
          <el-input v-model.trim="editForm.amountUnit" size="small" placeholder="单位" style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item prop="price">
          <el-input v-model.trim="editForm.price" type="number" size="small" placeholder="价格/元"
                    style="width: 100px"></el-input>
        </el-form-item>
        <el-button @click="doEdit(false)" icon="el-icon-check" type="success" circle plain
                   :loading="searchLoading"></el-button>
      </el-form>
    </el-dialog>
  </main>
</template>

<script>
  export default {
    name: "medicine",
    data() {
      return {
        showDialog: false,
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
        editForm: {
          id: '',
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
        showList: [],
        pageSize: 10,
        pageNo: 1,
        total: 0,
        deleteTemp: {}
      }
    },
    mounted() {
      this.getMedList()
    },
    methods: {
      showDelete(val) {
        this.$confirm('是否从药品库中删除该药品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editForm.id = val.id
          this.editForm.name = val.name
          this.editForm.amount = val.amount
          this.editForm.amountUnit = val.amountUnit
          this.editForm.price = val.price
          this.doEdit(true).then(()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSizeChange(size) {
        this.pageSize = size
        this.getMedList()
      },
      handleCurrentChange(no) {
        this.pageNo = no
        this.getMedList()
      },
      editMed(val) {
        this.showDialog = true
        this.editForm.id = val.id
        this.editForm.name = val.name
        this.editForm.amount = val.amount
        this.editForm.amountUnit = val.amountUnit
        this.editForm.price = val.price

      },
      async doEdit(isDelete) {
        await this.$post({
          url: this.$apis.updateMedInfo,
          param: {
            ...this.editForm,
            editPerson: this.$store.state.userInfo.name,
            editTime: new Date().toLocaleString(),
            isDelete: isDelete || false
          },
          postType: 'json'
        }).then(res => {
          if (res.data.success) {
            this.$message.success('编辑成功！')
            this.showDialog = false
            this.getMedList()
          }
        })
      },
      getMedList() {
        this.showList = []
        setTimeout(() => {
          this.$post({
            url: this.$apis.getMedInfoList,
            param: {
              name: this.searchForm.keyword,
              pageNo: this.pageNo,
              pageSize: this.pageSize
            },
            postType: 'json'
          }).then(res => {
            if (res.data.success) {
              this.showList = res.data.data.list
              this.total = res.data.data.total
            }
          })
        }, 800)

      },
      addMed() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.addLoading = true
            this.$post({
              url: this.$apis.addMedInfo,
              param: {
                ...this.addForm,
                editPerson: this.$store.state.userInfo.name,
                editTime: new Date().toLocaleString(),
                isDelete: 0
              },
              postType: 'json'
            }).then(res => {
              if (res.data.success) {
                this.addLoading = false
                this.$refs.addForm.resetFields()
                this.$message.success({
                  message: '添加成功！'
                })
                this.getMedList()
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
