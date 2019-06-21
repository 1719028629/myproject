<template>
  <!-- 卡片 -->
  <el-card v-loading="loading">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="myRow">
      <el-col :span="6">
        <!-- clearable 清空功能 -->
        <el-input placeholder="请输入内容" v-model="query" clearable>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <!-- 点击按钮弹出添加框 -->
        <el-button type="success" plain @click="adddialog = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格区域 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="80">
        <!-- slot-scope: 当前行的数据源   change当状态发生改变时触发,他后面会跟一个回调函数,val表示改变后的值,-->
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            v-model="scope.row.mg_state"
            inactive-color="#ff4949"
            @change="(val)=>{
                changestate(val,scope.row.id)
            }"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改数据 -->
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-edit"
            @click.prevent="edituserFn(scope.row.id)"
          ></el-button>
          <!-- 删除数据 -->
          <el-button
            type="danger"
            plain
            size="mini"
            icon="el-icon-delete"
            @click.prevent="deluser(scope.row.id)"
          ></el-button>
          <!-- 分配角色 -->
          <el-button
            type="warning"
            plain
            size="mini"
            icon="el-icon-check"
            @click="selectRoles(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- size-change页容量改变时触发  current-change页数改变时触发
        page-sizes 接受一个整型数组，数组元素为展示的选择每页显示个数的选项
    -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pagenum"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户的弹出框 -->
    <el-dialog title="添加用户" :visible.sync="adddialog">
      <el-form :model="addUser" :rules="rules" ref="addUser">
        <el-form-item label="用户名" class="my-boxs" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="my-boxs" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="my-boxs" :label-width="formLabelWidth">
          <el-input v-model="addUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" class="my-boxs" :label-width="formLabelWidth">
          <el-input v-model="addUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancle">取 消</el-button>
        <el-button typFe="primary" @click.prevent="adduserFn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改弹出框 -->
    <el-dialog title="修改用户" :visible.sync="editdialog">
      <el-form :model="editFormData" :rules="rules" ref="addUser">
        <el-form-item label="用户名" class="my-boxs" :label-width="formLabelWidth" prop="username">
          <!-- 输入框的disabled 属性值是一个布尔值 可以禁用输入框-->
          <el-input v-model="editFormData.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="my-boxs" :label-width="formLabelWidth">
          <el-input v-model="editFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" class="my-boxs" :label-width="formLabelWidth">
          <el-input v-model="editFormData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialog=false">取 消</el-button>
        <el-button typFe="primary" @click.prevent="edituser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色输入框 -->
    <el-dialog title="分配角色" :visible.sync="selectRolesDialog">
      <el-form label-width="100px" label-position="right" :model="selectRoledata">
        <el-form-item label="当前用户">
          <span>{{selectRoledata.username}}</span>
        </el-form-item>
        <el-form-item label="请选择角色">
          <!-- selectRoledata.rid 当前用户对应的角色id值  -->
          <el-select v-model="selectRoledata.rid">
            <el-option :value="-1" label="请选择角色" disabled></el-option>
            <!-- label 显示的角色每一项   value就是角色对应的id值-->
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectRolesDialog = false">取 消</el-button>
        <el-button type="primary" @click="selectRoleFn">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {// 添加的数据
      addUser: {
        username: '',
        email: '',
        mobile: '',
        password: ''
      }, // 修改的数据
      editFormData: {
        username: '',
        email: '',
        mobile: ''
      },
      // 角色列表
      options: [],
      // 角色数据
      selectRoledata: {
        username: '',
        roleName: '',
        rid: ''
      },
      // 用户列表
      tableData: [],
      //   页容量
      pageSize: 10,
      //   页码
      pagenum: 1,
      // 总页数
      total: 0,
      // 页容量选项
      pageSizes: [10, 15, 20],
      // 查询关键字
      query: '',
      // 添加框的显示和隐藏
      adddialog: false,
      // 修改框的显示和隐藏
      editdialog: false,
      // 分配角色框的显示和隐藏
      selectRolesDialog: false,
      formLabelWidth: '80px',
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: true
    }
  },
  methods: {
    //   获取所有的数据
    gettableData () {
      this.$http({
        method: 'GET',
        url: `http://localhost:8888/api/private/v1/users?query=${this.query}&pagesize=${this.pageSize}&pagenum=${this.pagenum}`,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        // 解构
        let { data, meta } = res.data
        if (meta.status == 200) {
          // 获取成功
          this.tableData = data.users
          this.total = data.total
          //   console.log(res);
          // 把加载框隐藏
          this.loading = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 改变页容量触发
    sizeChange (val) {
      // val表示改变后的值,给data中的pagesize从新赋值
      this.pageSize = val
      // 调用获取数据的接口
      this.gettableData()
    },
    // 页数发生改变时触发
    currentChange (val) {
      // val 改变后的值
      this.pagenum = val
      // 获取数据
      this.gettableData()
    },
    // 搜索功能
    search () {
      // 搜索关键字已经双向绑定了`所以直接调用获取数据的方法就行了
      this.gettableData()
    },
    // 关闭添加框
    addCancle () {
      this.adddialog = false
    },
    // 添加数据面板中的新增数据
    adduserFn () {
      //   validate: 表单验证, 参数valid 如果存在表示验证通过,否则表示不通过
      this.$refs.addUser.validate((valid) => {
        if (valid) {
          // 验证通过,添加数据
          this.$http({
            method: 'POST',
            url: 'http://localhost:8888/api/private/v1/users',
            data: this.addUser,
            headers: {
              Authorization: window.localStorage.getItem('token')
            }
          }).then(res => {
            if (res.data.meta.status == 201) {
              // 成功提示
              this.$message({
                message: res.data.meta.msg,
                type: 'success'
              })
              // 清空输入框
              this.addUser.username = ''
              this.addUser.passord = ''
              this.addUser.email = ''
              this.addUser.mobile = ''
              // 关闭输入框
              this.adddialog = false
              // 从新获取数据
              this.gettableData()
            } else {
              this.$message.error(res.data.meta.msg)
              // 清空输入框
              this.addUser.username = ''
              this.addUser.passord = ''
              this.addUser.email = ''
              this.addUser.mobile = ''
              // 关闭输入框
              this.adddialog = false
              // 从新获取数据
              this.gettableData()
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    // 删除用户数据
    deluser (id) {
      // 提醒是否删除
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定执行,调用接口
        this.$http({
          method: 'DELETE',
          url: 'http://localhost:8888/api/private/v1/users/' + id,
          headers: {
            Authorization: window.localStorage.getItem('token')
          }
        }).then(res => {
          if (res.data.meta.status == 200) {
            // 删除后,提醒成功
            this.$message({
              message: res.data.meta.msg,
              type: 'success'
            })
            // 重新获取数据
            this.gettableData()
          } else {
            // 失败提示失败
            this.$message.error(res.data.meta.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        // 取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 设置用户状态
    changestate (val, id) {
      // 调用接口
      this.$http({
        method: 'put',
        url: `http://localhost:8888/api/private/v1/users/${id}/state/${val}`,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.meta.status == 200) {
          // 修改成功
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
          // 重新获取数据
          this.gettableData()
        } else {
          // 失败
          this.$message.error(res.data.meta.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 弹出修改提示框,并给修改框赋值
    edituserFn (id) {
      // 弹出修改框
      this.editdialog = true
      // 根据id获取数据
      this.$http({
        method: 'GET',
        url: `http://localhost:8888/api/private/v1/users/${id}`,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        // 解构
        let { data, meta } = res.data
        // 重新给adduser赋值
        console.log(data)
        this.editFormData = data
      })
    },
    // 修改用户数据
    edituser () {
      // 关闭修改框
      this.editdialog = false
      // 获取数据id
      let id = this.editFormData.id
      // 请求修改接口
      this.$http({
        method: 'PUT',
        url: `http://localhost:8888/api/private/v1/users/${id}`,
        data: this.editFormData,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.meta.status == 200) {
          // 成功,提示
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
          // 刷新数据
          this.gettableData()
        } else { // 失败
          this.$message.error(res.data.meta.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击分配按钮,显示分配框,存入数据
    selectRoles (id) {
      // 显示分配框
      this.selectRolesDialog = true
      // 获取数据
      this.$http({
        method: 'get',
        url: 'http://localhost:8888/api/private/v1/roles',
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.meta.status == 200) { // 成功,把所有的角色分类存起来
          this.options = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
      // 根据id获取数据
      this.$http({
        method: 'GET',
        url: `http://localhost:8888/api/private/v1/users/${id}`,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        // 解构
        let { data, meta } = res.data
        // 把当前用户的信息存储起来
        this.selectRoledata = data
      })
    },
    // 点击分配中的修改按钮修改角色
    selectRoleFn () {
      // 关闭角色设置框
      this.selectRolesDialog = false
      // 发送修改请求
      this.$http({
        method: 'put',
        url: `http://localhost:8888/api/private/v1/users/${this.selectRoledata.id}/role`,
        data: {
          rid: this.selectRoledata.rid
        },
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.meta.status == 200) { // 成功
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })// 重新获取数据
          this.gettableData()
        } else {
          this.$message.error(res.data.meat.msg)
        }
      })
    }
  },
  mounted () {
    this.gettableData()
  }
}
</script>

<style scoped>
.myRow {
  margin-top: 20px;
}
.el-pagination {
  width: 400px;
  margin-top: 20px;
}
.my-boxs {
  margin-left: 10px;
}
.el-select-dropdown.el-popper {
  top: 218px !important;
}
</style>
