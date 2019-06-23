<template>
  <!-- 卡片 -->
  <el-card v-loading="loading">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <el-button type="primary" plain class="my-btn" @click="addroledialogForm=true">添加角色</el-button>
    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%" :border="true">
      <!-- 展开显示的类容  type="expand"设置为可以展开的表格-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row class="level1-row" v-for="level1 in scope.row.children" :key="level1.id">
            <!-- 一级权限 , 遍历这一行的数据的里面的children里面有权限信息-->
            <el-col :span="4">
              <el-tag closable class="my-tag">{{level1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!--二级权限 -->
            <el-col :span="20">
              <el-row class="level2-row" v-for="level2 in level1.children" :key="level2.id">
                <el-col :span="5">
                  <el-tag closable class="my-tag" type="success">{{level2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级权限 -->
                <el-col :span="19">
                  <el-tag
                    closable
                    class="my-tag"
                    type="warning"
                    v-for="level3 in level2.children"
                    :key="level3.id"
                  >{{level3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length===0">
            <el-col :span="24">
              <el-tag type="info">没有分配权限</el-tag>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 表格显示的内容 -->
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改数据 -->
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-edit"
            @click="editRoleFN(scope.row.id,scope.row.roleName,scope.row.roleDesc)"
          ></el-button>
          <!-- 删除数据 -->
          <el-button
            type="danger"
            plain
            size="mini"
            icon="el-icon-delete"
            @click="delRole(scope.row.id)"
          ></el-button>
          <!-- 分配角色 -->
          <el-button
            type="warning"
            plain
            size="mini"
            icon="el-icon-check"
            @click="editRightsDialog=true"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色的输入框 -->
    <el-dialog title="添加角色" :visible.sync="addroledialogForm">
      <el-form :model="addform" :rules="rules" ref="addform">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="addform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc">
          <el-input v-model="addform.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addroledialogForm = false">取 消</el-button>
        <el-button type="primary" @click="addroles">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色的输入框 -->
    <el-dialog title="修改角色" :visible.sync="editroledialogForm">
      <el-form :model="editform" :rules="rules" ref="editform">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="editform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc">
          <el-input v-model="editform.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editroledialogForm = false">取 消</el-button>
        <el-button type="primary" @click="editroles">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 权限分配框 -->
    <el-dialog title="权限分配" :visible.sync="editRightsDialog">
      <div>
        <el-tree :data="data" :props="defaultProps"></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRightsDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 加载框的显示和隐藏
      loading: true,
      // 权限列表的数据
      tableData: [],
      // 添加角色输入框中描述的宽度
      formLabelWidth: '80px',
      // 添加角色输入框的显示和隐藏
      addroledialogForm: false,
      // 新增的数据
      addform: {
        roleName: '',
        roleDesc: ''
      },
      // 修改框的显示和隐藏
      editroledialogForm: false,
      // 修改得值
      editform: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      editRightsDialog: false,
      // 添加输入验证规则
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ] },
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    // 获取权限列表数据
    getrolelist () {
      this.$http({
        method: 'get',
        url: `roles`
      }).then(res => { // 成功给数据赋值
        // console.log(res);
        this.tableData = res.data.data
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 添加角色的方法
    addroles () {
      // 判断是否输入内容
      this.$refs.addform.validate((valid) => {
        if (valid) { // 隐藏输入框
          this.addroledialogForm = false
          // 发送请求
          this.$http({
            method: 'post',
            url: `roles`,
            data: this.addform
          }).then(res => {
            if (res.data.meta.status === 201) { // 成功
              this.$message({
                message: res.data.meta.msg,
                type: 'success'
              })// 从新获取数据,清空输入框
              this.getrolelist()
              this.addform.roleName = ''
              this.addform.roleDesc = ''
            } else {
              this.$message.error(res.data.meta.msg)
            }
          }).catch(err => {
            console.log(er)
          })
        }
      })
    },
    // 删除角色
    delRole (id) {
      // 提醒是否删除
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除接口
        this.$http({
          method: 'DELETE',
          url: `roles/${id}`,
          data: this.editFormData
        }).then(res => {
          if (res.data.meta.status == 200) {
            // 成功,提示
            this.$message({
              message: res.data.meta.msg,
              type: 'success'
            })
            // 刷新数据
            this.getrolelist()
          } else { // 失败
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
    // 修改角色数据,给输入框赋值
    editRoleFN (id, name, desc) {
      // 显示修改框
      this.editroledialogForm = true
      // 赋值
      this.editform.id = id
      this.editform.roleName = name
      this.editform.roleDesc = desc
    },
    // 修改角色数据
    editroles () {
      this.$refs.editform.validate((valid) => {
        if (valid) { // 隐藏输入框
          this.editroledialogForm = false
          // 发送请求
          this.$http({
            method: 'put',
            url: `roles/${this.editform.id}`,
            data: this.editform
          }).then(res => {
            if (res.data.meta.status === 200) { // 成功
              this.$message({
                message: '修改成功',
                type: 'success'
              })// 从新获取数据
              this.getrolelist()
            } else {
              this.$message.error(res.data.meta.msg)
            }
          }).catch(err => {
            console.log(er)
          })
        }
      })
    }
  },
  mounted () {
    this.getrolelist()
  }
}
</script>

<style scoped>
.my-btn {
  margin-top: 15px;
  margin-bottom: 5px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.my-tag {
  margin-left: 8px;
  margin-bottom: 5px;
  margin-right: 5px;
}
.level1-row {
  margin-top: 10px;
}
</style>
