<template>
<div class="login-app-base">
    <div style="height:60px;"></div>
     <el-form class="inner" :model="ruleForm" :rules="rules" ref="ruleForm">
         <div class="login-box">
                <div class="auth-logo">
                    <img class="auth-img" src="../common/images/hubert.jpg" alt="LeetCode">
                    <div class="login-text-logo login-group">登录 BiyoPMS</div>
                    <el-form-item prop="account" class="login-group">
                        <el-input type="text" placeholder="请输入账户名" v-model="ruleForm.account" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="login-group">
                        <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="login-group">
                        <el-button type="primary" :plain="true" v-on:click="submitForm('ruleForm')" class="el-button el-button--primary" style="width: 100%">登录</el-button>
                    </el-form-item>
                    <el-form-item class="login-deal">
                        <a href="">忘记密码?</a>
                        <a class="pull-right" href="">注册账号</a>
                    </el-form-item>
                </div>
         </div>
     </el-form>
</div>
</template>
<script>
import { Login } from "../api/api.js";
export default {
  data() {
    return {
      account: "",
      password: "",
      ruleForm: {
        account: "admin",
        password: "123456"
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          var accountValue = _this.ruleForm.account;
          var passwordValue = _this.ruleForm.password;
          let para = {
            account: accountValue,
            password: passwordValue
          };
          Login(para)
            .then(res => {
              if (res.data.Code == "0") {
                _this.$router.push("home");
              } else {
                _this.$message({
                  message: res.data.Message,
                  type: "error",
                  center: true
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.login-app-base {
  background-color: rgba(111, 156, 105, 0.5);
}

.login-app-base {
  text-align: center;
  height: 100%;
}

.inner {
  width: 100%;
  display: inline-block;
  border-radius: 10px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  height: 75%;
}

.login-box {
  width: 360px;
  position: relative;
  display: inline-block;
  border-radius: 10px;
  background: rgba(69, 167, 57, 0.5);
}

.auth-logo {
  margin-top: 50px;
  height: 70%;
}

.auth-img {
  height: 40px;
}
img {
  vertical-align: top;
  border: none;
}

.login-group {
  position: relative;
  padding: 5px;
}

.login-deal {
  text-align: left;
}

.login-text-logo {
  font-size: 25px;
  font-weight: 300;
}

.login-deal a {
  margin-left: 20px;
  cursor: pointer;
  text-decoration: none;
  color: #0088cc;
}

a:hover {
  color: #000;
}

.pull-right {
  float: right !important;
  margin-right: 20px;
}

.input-feedback {
  cursor: text;
  position: absolute;
  top: 4px;
  right: 5px;
  color: #d9534f;
  margin-top: 0.25rem;
  background: white;
  padding-left: 15px;
}
.input-feedback p {
  color: #ef534e;
  font-size: 12px;
  margin-left: 100px;
  margin-top: 0.2rem;
  margin-bottom: 0;
}
</style>


