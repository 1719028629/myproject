<template>
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="myRow">
      <el-col :span="6">
        <!-- clearable 清空功能 -->
        <el-input placeholder="请输入内容" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <!-- 点击按钮弹出添加框 -->
        <el-button type="success" plain>添加用户</el-button>
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
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  methods: {
    // 获取数据
    getgoods () {
      this.$http({
        method: 'get',
        url: `categories`,
        data: {
          type: [1, 2, 3]
        },
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.getgoods()
  }
}
</script>

<style scoped>
.myRow {
  margin-top: 15px;
}
</style>
