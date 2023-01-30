<template>
  <div class="wrap">
    <a-card :bordered="false" class="box">
      <h1 class="title">好学教育后台管理系统</h1>
      <a-tabs size="large">
        <a-tab-pane key="1" tab="手机号密码登陆">
          <a-form-model ref="ruleForm" :model="form" :rules="loginRules">
            <a-form-model-item prop="username">
              <a-input v-model="form.username" placeholder="请输入您的手机号">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input v-model="form.password" type="password" placeholder="请输入您的密码">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button
                type="primary"
                style="width:100%"
                @click="handleLogin"
                :loading="loading1"
              >立即登陆</a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="2" tab="新用户注册">
          <a-form-model ref="register" :model="regForm" :rules="regRules">
            <a-form-model-item prop="username">
              <a-input v-model="regForm.username" placeholder="请输入您的手机号">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input v-model="regForm.password" type="password" placeholder="请输入您的密码">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="nickname">
              <a-input v-model="regForm.nickname" placeholder="请输入您的姓名">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button
                type="primary"
                style="width:100%"
                @click="handleRegister"
                :loading="loading"
              >立即注册</a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import { register, login } from "@/api/user.js";
import { mapMutations } from "vuex";
export default {
  created() {
    console.log(process.env.VUE_APP_BASE_API);
  },
  data() {
    //自定义规则
    let checkUsername = (rule, value, callback) => {
      const reg = /^1[3-9]\d{9}$/
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    return {
      form: {
        username: "",
        password: ""
      },
      //登陆规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          // {pattern:/^1[3-9]\d{9}$/,message: "请输入正确的手机号", trigger: "blur"}
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      //注册规则
      regRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: checkUsername, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码不能少于六位", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      regForm: {
        username: "",
        password: "",
        nickname: ""
      },
      loading: false,
      loading1: false
    };
  },
  methods: {
    ...mapMutations(["setRole","generateRoutes","setNickname"]),
    handleLogin() {
      this.loading1 = true;
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let result = await login(this.form);
          this.loading1 = false;
          if (result.code == 0) {
            //存储用户的权限
            this.setRole(result.role);
            this.setNickname(result.nickname)
            //创建路由
            this.generateRoutes();
            sessionStorage.setItem("token", result.token);
            this.$router.push("/index");
          }
        }
      });
    },
    handleRegister() {
      this.loading = true;
      this.$refs.register.validate(valid => {
        if (valid) {
          register(this.regForm).then(res => {
            this.loading = false;
            if (res.code == 0) {
              this.$message.success(res.msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  .box {
    width: 500px;
    .title {
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
</style>