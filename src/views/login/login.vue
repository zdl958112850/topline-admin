<template>
  <div id="login">
    <div class="login-input">
        <h1 style="margin: 20px;">登录界面</h1>
          <el-form :model="formdata" ref="formdata" :rules="rules">
              <el-form-item prop="mobile" label="手机号码">
                  <el-input v-model="formdata.mobile"></el-input>
              </el-form-item>
              <el-form-item prop="code" label="验证码">
                  <el-input  v-model="formdata.code"></el-input>
              </el-form-item>
              <div class="btn-con">
                <el-button @click.prevent="handleLogin" type="primary">登录</el-button>
                <el-button @click="handleYanZheng" type="info">发送验证码</el-button>
              </div>
          </el-form>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-form>
      </div>
    </div>
</template>

<script>
import '@/vendor/gt.js';
import axios from 'axios';

export default {
  name: 'login',
  data () {
    return {
      formdata: {
        mobile: '',
        code: ''
      },
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleYanZheng () {
      // console.log('发起axios请求')
      const { mobile } = this.formdata;
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 隐藏，直接弹出式
        }, (captchaObj) => {
          this.captchaObj = captchaObj;
          captchaObj.onReady(function () {
          // 验证码ready之后才能调用verify方法显示验证码
            captchaObj.verify();
          }).onSuccess(function () {
          // 人机交互验证通过
            // console.log(captchaObj.getValidate());
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } = captchaObj.getValidate();
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {
              console.log(res.data);
            });
          }).onError(function () {
            // my code
            console.log('gagagaga');
          });
        });
      });
    },
    handleLogin () {
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.formdata // 由于手机号码没有登录过所以会报错403, 表示**无权限**, 服务器识别, 但是不给响应, 400表示, 请求的参数缺失
      }).then(res => {
        console.log(res.data);
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        this.$router.push({
          name: 'home'
        });
      }).catch(err => {
        if (err.response.status === 403) {
          this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          });
          this.$router.push({
            name: 'home'
          });
        } else if (err.response.status === 400) {
          this.$message.error('手机号或者验证码错误');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
body, #app, #login {
    width: 100%;
    height: 400px;
}
#login {
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-input {
    width: 400px;
    height: 250px;
    .btn-con {
      display: flex;
      justify-content: space-around;
    }
}

</style>
