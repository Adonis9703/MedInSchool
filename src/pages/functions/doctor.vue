<template>
  <main class="margin30X marginX30">
    <section class="bgcolor-white shadow paddingX40 padding26X">
      <el-form :model="searchForm" :inline="true">
        <el-form-item label="搜索医生">
          <el-input size="small" placeholder="输入医生姓名" clearable v-model="searchForm.keyword"></el-input>
        </el-form-item>
        <el-button @click="getDocList" icon="el-icon-search" type="success" circle plain
                   :loading="searchLoading"></el-button>
      </el-form>
      <el-form :rules="rules" ref="addForm" :model="addForm" :inline="true">
        <el-form-item label="添加医生" prop="name">
          <el-input clearable v-model.trim="addForm.name" size="small" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="department">
          <el-input v-model.trim="addForm.department" size="small" placeholder="科室"></el-input>
        </el-form-item>
        <el-form-item prop="department">
          <el-input v-model.trim="addForm.title" size="small" placeholder="职称"></el-input>
        </el-form-item>
        <el-form-item prop="userId">
          <el-input v-model.trim="addForm.userId" size="small" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="addForm.password" size="small" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="isAdmin">
          <el-select v-model.trim="addForm.isAdmin" size="small" placeholder="权限"
                     style="width: 100px">
            <el-option label="普通医生" value="false"></el-option>
            <el-option label="管理员" value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-button @click="addDoc" icon="el-icon-plus" type="success" plain circle :loading="addLoading"></el-button>
      </el-form>
    </section>
    <section class="bgcolor-white shadow margin-top40 paddingX40 padding40X">
      <el-table v-loading="resultLoading" border :data="showList" stripe style="width: 100%">
        <el-table-column prop="name" label="医生姓名" sortable></el-table-column>
        <el-table-column prop="department" label="科室"></el-table-column>
        <el-table-column prop="title" label="职称"></el-table-column>
        <el-table-column prop="userId" label="账号"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editMed(scope.row)" type="text" size="">编辑</el-button>
            <!--<el-button @click="showDelete(scope.row)" type="text" size="" style="color: red">删除</el-button>-->
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
    <el-dialog title="编辑医生" :visible.sync="showDialog" close-on-click-modal close-on-press-escape>
      <el-form :model="editForm" inline>
        <el-form-item prop="name">
          <el-input clearable v-model.trim="editForm.name" size="small" placeholder="医生姓名"></el-input>
        </el-form-item>
        <el-form-item prop="department">
          <el-input v-model.trim="editForm.department" size="small" placeholder="科室"
                    style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item prop="department">
          <el-input v-model.trim="editForm.title" size="small" placeholder="职称"
                    style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item prop="userId">
          <el-input v-model.trim="editForm.userId" size="small" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="editForm.password" size="small" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="isAdmin">
          <el-select v-model.trim="editForm.isAdmin" size="small" placeholder="权限"
                     style="width: 100px">
            <el-option label="普通医生" :value="false"></el-option>
            <el-option label="管理员" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-button @click="doEdit(false)" icon="el-icon-check" type="success" circle plain
                   :loading="searchLoading"></el-button>
      </el-form>
    </el-dialog>
  </main>
</template>

<script>
  export default {
    name: "doctor",
    data() {
      return {
        showDialog: false,
        addLoading: false,
        searchLoading: false,
        resultLoading: true,
        searchForm: {
          keyword: ''
        },
        addForm: {
          title: '',
          name: '',
          department: '',
          userId: '',
          password: '',
          isAdmin: '',
        },
        editForm: {
          name: '',
          department: '',
          userId: '',
          password: '',
          isAdmin: '',
          title: ''
        },
        rules: {
          name: [{required: true, message: '请输入医生姓名', trigger: 'blur'}],
          department: [{required: true, message: '请输入科室', trigger: 'blur'}],
          userId: [{required: true, message: '请输入账号', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          isAdmin: [{required: true, message: '请选择权限', trigger: 'blur'}]
        },
        showList: [],
        pageSize: 10,
        pageNo: 1,
        total: 0,
        deleteTemp: {}
      }
    },
    mounted() {
      this.getDocList()
    },
    methods: {
      showDelete(val) {
        this.$confirm('是否删除该医生?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editForm.userId = val.userId
          this.editForm.name = val.name
          this.editForm.department = val.department
          this.editForm.sex = val.sex
          this.editForm.title = val.title
          this.editForm.isAdmin = val.isAdmin
          this.editForm.password = val.password
          this.doEdit(true).then(() => {
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
        this.getDocList()
      },
      handleCurrentChange(no) {
        this.pageNo = no
        this.getDocList()
      },
      editMed(val) {
        console.log(this.$store.state.userInfo)
        if (this.$store.state.userInfo.userType!=2) {
          this.$message({
            type: 'warning',
            message: '您不是管理员，无法进行操作'
          })
          return
        }

        this.showDialog = true
        this.editForm.userId = val.userId
        this.editForm.name = val.name
        this.editForm.department = val.department
        this.editForm.sex = val.sex
        this.editForm.title = val.title
        this.editForm.isAdmin = val.isAdmin
        this.editForm.password = val.password
      },
      async doEdit(isDelete) {
        let temp = {
          ...this.editForm,
          oldId: this.editForm.userId
        }
        if (this.editForm.isAdmin) {
          temp.userType = 2
        } else {
          temp.userType = 1
        }
        if (isDelete) {
          temp.isDelete = true
        }
        await this.$post({
          url: this.$apis.update,
          param: temp,
          postType: 'json'
        }).then(res => {
          if (res.data.success) {
            this.$message.success('编辑成功！')
            this.showDialog = false
            this.getDocList()
          } else {
            this.$message.warning(res.data.message)
          }
        })
      },
      getDocList() {
        this.showList = []
        this.resultLoading = true
        setTimeout(() => {
          this.$post({
            url: this.$apis.getDoctorList,
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
              this.resultLoading = false
            }
          })
        }, 800)

      },
      addDoc() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.addLoading = true
            this.$post({
              url: this.$apis.addDoctor,
              param: {
                ...this.addForm,
                userType: this.addForm.isAdmin ? 1 : 2
              },
              postType: 'json'
            }).then(res => {
              if (res.data.success) {
                this.addLoading = false
                this.$refs.addForm.resetFields()
                this.$message.success({
                  message: '添加成功！'
                })
                this.getDocList()
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
