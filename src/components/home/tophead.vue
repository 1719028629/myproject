<template>
  <el-row>
    <el-col :span="4">
      <img src="@/assets/images/logo.png" alt>
    </el-col>
    <el-col :span="16">
      <div class="title">电商后台管理系统</div>
    </el-col>
    <el-col :span="4">
      <a href @click.prevent="logout" class="logout">退出</a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('你确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        window.localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出!'
        })
      })
    }
  }
}
</script>

<style scoped>
.title {
  margin: 0;
  font-size: 24px;
}
.logout {
  text-decoration: none;
  color: aqua;
  float: right;
}
</style>
