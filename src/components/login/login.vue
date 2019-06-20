<template>
  <div class="mybox">
    <div class="login-box">
      <el-form
        label-position="top"
        status-icon
        ref="loginObj"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
        :model="loginObj"
      >
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="mybtn" @click="login">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginObj: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      //   validate: 表单验证, 参数valid 如果存在表示验证通过,否则表示不通过
      this.$refs.loginObj.validate((valid) => {
        if (valid) {
          this.$http({
            method: 'POST',
            url: 'http://localhost:8888/api/private/v1/login',
            data: this.loginObj
          }).then(res => {
            let { data, meta } = res.data
            if (meta.status === 200) {
              // 成功,弹出提示框
              this.$message({
                message: meta.msg,
                type: 'success'
              })
              // 存储登录信息,token代表登录的表示
              window.localStorage.setItem('token', data.token)
              // 跳转管理首页
              this.$router.push('/home')
            } else {
              this.$message.error(meta.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.mybox {
  width: 100%;
  height: 100%;
  background-color: #324152;
  position: relative;
}
.login-box {
  width: 580px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
}
.mybtn {
  width: 100%;
}
</style>
