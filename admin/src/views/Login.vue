<template>
  <div @keydown="onKeydown" class="_login">
    <Row>
      <Col span="6" offset="9">
      <Card class="dev-sign-main ivu-card ivu-card-shadow">
        <h3 slot="title" class="title">XXXX管理系统</h3>
        <Form ref="form_data" label-position="top" v-bind:model="form_data" :rules="form_data.rules">
          <FormItem label="用户名(工号)" prop="userName">
            <Input v-model="form_data.userName" placeholder="请输入用户名" size="large" />
          </FormItem>
          <FormItem label="登录密码" prop="passWord">
            <Input v-model="form_data.passWord" placeholder="请输入密码" size="large" type="password" />
          </FormItem>
          <FormItem label="验证码" prop="captcha">
            <Input v-model="form_data.captcha" placeholder="请输入验证码" size="large">
            <img slot="append" :src="captchaImg" @click="getData_Code()" />
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" long icon="md-log-in" size="large" :loading="form_data.loading" @click="login()">&nbsp;登&nbsp;&nbsp;&nbsp;录&nbsp;</Button>
          </FormItem>
          <router-link to="/ResetPsw" target="_self" class="reset">重置密码</router-link>
        </Form>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<style lang='less'>
body {
  background-image: url(/static/body.svg);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
}
._login {
  .title {
    color: #333;
    line-height: 48px;
    font-weight: 400;
    font-size: 18px;
    text-align: center;
  }
  .dev-sign-main {
    width: 400px;
    margin: 100px auto;
    padding: 0 24px 40px;
    border-color: #e8eaec;
    background-color: #fff;
  }
  .ivu-form-item {
    padding-top: 10px;
    margin-bottom: 16px;
  }
  .ivu-input-group-append {
    padding: 1px;
    img {
      height: 100%;
      float: right;
      border-radius: 0 3px 3px 0;
      cursor: pointer;
    }
  }
  .ivu-modal-wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }
  .reset {
    float: right;
    margin-top: 8px;
  }
}
</style>

<script>
import smcrypto from '@/utils/smcrypto.js'

export default {
  data() {
    return {
      captchaImg: "",
      captchaKey: "",

      overtime: 60,

      form_data: {
        userName: "",
        passWord: "",
        captcha: "",
        loading: false,
        rules: {
          userName: [{ message: "账号不能为空", trigger: "blur", required: true }],
          passWord: [{ message: "密码不能为空", trigger: "blur", required: true }],
          captcha: [{ message: "验证码不能为空", trigger: "blur", required: true }],
        }
      }
    };
  },
  created() {
    this.getData_Code();
    //如果有time在5秒之内，就会提示过期
    let time = this.$route.query.time;

    if (!time == false && (Number(time) + 10000) > new Date().getTime()) { this.$Modal.info({ title: "登录信息已过期", content: "您的登录信息已过期，请您重新登录系统。" }); }

    //先登出再登录
    if (this.$route.query.logout == "logout") { this.logout(); }

    let that = this;
    let interval_code = setInterval(function () {
      if (that.overtime == 100) { clearInterval(interval_code); }
      that.overtime = that.overtime - 1;
      if (that.overtime == 0) { that.getData_Code(); }
    }, 1000);

  },
  methods: {
    //提交
    login() {
      //校验
      var validate = true;
      this.$refs.form_data.validate(val => { validate = val; });
      if (validate == false) { return false; }

      this.form_data.loading = true; //开启加载图标

      var param = {
        userName: smcrypto.sm2.doEncrypt(this.form_data.userName),
        passWord: smcrypto.sm2.doEncrypt(this.form_data.passWord),
        captcha: this.form_data.captcha,
        key: this.captchaKey,
      };

      this.$api.login(param)
        .then(res => {
          this.form_data.loading = false;   //关闭加载

          if (res.data.code == 200) {
            //用於清除验证码的定时器
            this.overtime = 100;
            //将用户存入Vuex
            this.$store.commit("initUser", res.data.data);
            localStorage.setItem("xxxx_admin_token", res.data.data.token);    //将token存入localStorage

            if (!this.$route.query.redirect == false) { this.$router.replace(this.$route.query.redirect); }
            else { this.$router.replace("/home"); }
          }
          else {
            this.form_data.loading = false; //关闭加载
            this.getData_Code();
            this.$Modal.error({ title: "登陆失败", content: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          this.getData_Code();
          this.$Message.error("请求出现异常！");
        });
    },
    logout() {
      if (localStorage.getItem("xxxx_admin_token")) {
        var param = {};
        this.$api.logout(param)
          .then(res => { localStorage.removeItem("xxxx_admin_token"); })
          .catch(err => { console.log(err); });
      }
    },
    onKeydown() { if (event.keyCode == 13) { this.login(); } },
    getData_Code() {
      this.overtime = 60;
      this.$api.getData_ImgCode({})
        .then(res => {
          this.captchaKey = res.headers.key;
          return 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        }).then(data => {
          //图片地址 <img src='data' />
          this.captchaImg = data;
          this.overtime = 60;
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("请求出现异常！");
        });
    }
  }
};
</script>

