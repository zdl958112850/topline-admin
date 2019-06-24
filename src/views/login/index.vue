<template>
  <div id="login">
    <div class="login-input">
        <h1 style="margin: 20px;">登录界面</h1>
          <el-form :model="formdata" ref="ruleForm" :rules="rules">
              <el-form-item prop="mobile" label="手机号码">
                  <el-input v-model="formdata.mobile"></el-input>
              </el-form-item>
              <el-form-item prop="code" label="验证码">
                  <el-input  v-model="formdata.code"></el-input>
              </el-form-item>
              <el-form-item prop="agree">
                  <el-checkbox class="ckb" v-model="formdata.agree"></el-checkbox>我同意协议
              </el-form-item>
              <div class="btn-con">
                <el-button @click.prevent="handleLogin" :loading="isLoading" type="primary">登录</el-button>
                <el-button
                  :disabled="!!timer || this.codeLoading"
                  @click="handleYanZheng"
                  type="info"
                >
                  {{ timer ? `${count}秒后重试` : '发送验证码' }}
                </el-button>
              </div>
          </el-form>
      </div>
    </div>
</template>

<script>
import '@/vendor/gt.js';
import axios from 'axios';
import { setInterval, clearInterval } from 'timers';

export default {
  name: 'login',
  data () {
    return {
      formdata: {
        mobile: '',
        code: '',
        agree: ''
      },
      timer: null,
      count: 10,
      isLoading: false,
      captchaObj: '',
      current: null,
      codeLoading: false,
      rules: {
        mobile: [
          { required: true, message: '必须输入', trigger: 'blur' },
          { len: 11, message: '必须输入11位的数字', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '必须输入', trigger: 'blur' },
          { len: 6, message: '请输入6位', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请选中协议', trigger: 'change' },
          { pattern: /true/, message: '请选中协议', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    // 点击发送验证码时触发
    handleYanZheng () {
      // 校验mobile是否符合要求
      this.$refs['ruleForm'].validateField('mobile', errMessage => {
        // 如果不符合直接return
        if (errMessage.trim().length > 0) {
          return;
        };
        // 表示mobile符合标准, 判断是否创建了captchaObj对象
        if (this.captchaObj) {
          // 如果创建了, 然后判断前后两次的mobile是否相同
          // return this.captchaObj.verify(); // 这里表示初试化后, 然后再判断是否需要重新加载验证码插件
          // 若不相同的情况要重新初始化验证码
          if (this.current !== this.formdata.mobile) {
            // 重新初始化验证码插件
            console.log('准备重新创建');
            this.showGeetest();
          } else {
            // 如果相同, 则直接调用verify方法
            console.log('这里是直接使用verify');
            this.captchaObj.verify();
          };
        } else {
          this.showGeetest();
        };
        this.countDown();
      });
    },
    countDown () {
      this.timer = setInterval(() => {
        this.count--;
        if (this.count <= 0) {
          this.count = 10;
          // console.log(this.timer);
          clearInterval(this.timer);
          this.timer = null;
        };
      }, 1000);
    },
    showGeetest () {
      // 初始化期间禁用按钮
      this.codeLoading = true;
      // 在这里判断一下如果已经有了, 将不再创建, 直接使用哪个
      if (this.captchaObj) {
        this.captchaObj.verify();
        return;
      };
      const { mobile } = this.formdata;
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        // 这里是创建验证视图
        const { data } = res.data;
        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 隐藏 ，直接弹出式
        }, (captchaObj) => {
          this.captchaObj = captchaObj;
          captchaObj.onReady(() => {
          // 验证码ready之后才能调用verify方法显示验证码
            this.codeLoading = false;
            this.current = this.formdata.mobile;
            captchaObj.verify();
          }).onSuccess(() => { // 这里是人机验证成功后才会进入的
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
      this.isLoading = true;
      if (!this.formdata.agree) {
        this.isLoading = false;
        return this.$message.error('请先同意协议!!!');
      };
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.formdata // 由于手机号码没有登录过所以会报错403, 表示**无权限**, 服务器识别, 但是不给响应, 400表示, 请求的参数缺失
      }).then(res => {
        this.isLoading = false;
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
          // 由于手机号码没有注册过, 所以没有权限,这里就当是登录成功的时候
          // 保存手机号码, 保存到sessionStorage里面, 在登录后显示到AppHeader里面
          window.sessionStorage.setItem('mobileNum', this.formdata.mobile);
          this.isLoading = false;
          this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          });
          this.$router.push({
            name: 'home'
          });
        } else if (err.response.status === 400) {
          this.$message.error('手机号或者验证码错误');
          this.isLoading = false;
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
.ckb {
  margin-right: 20px;
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
