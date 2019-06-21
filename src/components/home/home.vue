<template>
  <!-- 顶部区域 -->
  <el-container>
    <el-header>
      <Tophead></Tophead>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <Sidebar></Sidebar>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <router-view>hahah</router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入头部
import Tophead from '../../components/home/tophead.vue'
// 导入侧边栏
import Sidebar from '../../components/home/sidebar.vue'

export default {
  data () {
    return {
      roles: []
    }
  },
  components: {
    Tophead,
    Sidebar
  },
  methods: {
    getLogin () {
      // 获取token值
      let token = window.localStorage.getItem('token')
      if (!token) {
        this.$message.error('请先登录哦!')
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.getLogin()
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
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}
body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}
.el-container {
  height: 100%;
}
</style>
