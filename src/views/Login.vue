<template>
     <div style="height:60px;"></div>
        <el-form class="inner" :model="ruleForm" :rules="rules" ref="ruleForm">
            <div class="login-box">
                <div class="auth-logo">
                    <img class="auth-img" src="~/Content/images/logo.png" alt="LeetCode">
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
</template>
<script>
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
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods:{

  },
};
</script>

