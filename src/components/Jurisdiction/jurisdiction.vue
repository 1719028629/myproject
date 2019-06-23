<template>
  <!-- 卡片 -->
  <el-card v-loading="loading">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格区域 -->
    <template>
      <!-- 设置type属性为index即可显示从 1 开始的索引号 -->
      <el-table :data="tableData" border style="width: 100%" class="my-table">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="path" label="路径" width="180"></el-table-column>
        <el-table-column prop="level" label="层级">
          <template slot-scope="scope">
            <span v-if="scope.row.level==='0'">一级</span>
            <span v-if="scope.row.level==='1'">二级</span>
            <span v-if="scope.row.level==='2'">三级</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      loading: true
    }
  },
  methods: {
    getjurisdictionList () {
      this.$http({
        method: 'get',
        url: `http://localhost:8888/api/private/v1/rights/list`,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.meta.status === 200) { // 成功
          this.tableData = res.data.data
          this.loading = false
        }
      })
    }
  },
  mounted () {
    this.getjurisdictionList()
  }
}
</script>

<style scoped>
.my-table {
  margin-top: 15px;
}
</style>
