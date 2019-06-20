<template>
  <div>
    <!-- 顶部区域 -->
    <el-container>
      <el-header>
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
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside width="200px">
          <el-menu default-active="users" :unique-opened="true">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span class="my-span">用户管理</span>
              </template>
              <el-menu-item index="1-2">
                <i class="el-icon-menu"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span class="my-span">用户管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 内容区域 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      roles: []
    }
  },
  methods: {
    getRoles () {
      this.$http({
        method: 'GET',
        url: 'http://localhost:8888/api/private/v1/users'
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
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
        this.$router.push('/')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出!'
        })
      })
    }
  },
  mounted () {
    this.getRoles()
  }
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}
.el-container {
  height: 100%;
}
div {
  height: 100%;
}
.title {
  margin: 0;
  font-size: 24px;
}
img {
  height: 60px;
  text-align: center;
}
.logout {
  text-decoration: none;
  color: aqua;
  float: right;
}
.my-span {
  margin-right: 60px;
}
.el-icon-location {
  float: left;
  vertical-align: center;
  line-height: 56px;
}
.el-icon-menu {
  padding-left: 0px;
}
</style>
