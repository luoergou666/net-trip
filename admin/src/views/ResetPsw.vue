<template>
  <div class="_reset_psw">
    <Row>
      <Col span="6" offset="9">
      <Card class="dev-sign-main ivu-card ivu-card-shadow">
        <h3 slot="title" class="title">修改密码</h3>
        <Form ref="form_data" label-position="top" v-bind:model="form_data" :rules="form_data.rules">
          <FormItem label="用户名(工号)" prop="userName">
            <Input v-model="form_data.userName" placeholder="请输入用户名" size="large" />
          </FormItem>
          <FormItem label="手机号码" prop="mobilePhone">
            <Input v-model="form_data.mobilePhone" placeholder="请输入手机号码" size="large" maxlength="11" />
          </FormItem>
          <FormItem label="短信验证码" prop="authCode">
            <Input placeholder="请输入手机短信验证码" v-model="form_data.authCode" search :enter-button="send_code_text" @on-search="sendCode" size="large" />
          </FormItem>
          <FormItem label="新的登录密码" prop="passWord">
            <Input v-model="form_data.passWord" placeholder="包含大小写字母及数字，密码长度8到16位" size="large" type="password" />
          </FormItem>
          <FormItem>
            <Button type="primary" long size="large" :loading="form_data.loading" @click="save_data">确&nbsp;&nbsp;&nbsp;定</Button>
          </FormItem>
          <router-link to="/" target="_self" class="reset">去登录</router-link>
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
._reset_psw {
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
  .msg {
    min-width: 60px;
    margin: 0;
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
      send_code_text: "获取验证码",
      sms_code_overtime: 60,
      overtime: 60,

      form_data: {
        userName: "",
        passWord: "",
        mobilePhone: "",
        authCode: "",

        loading: false,
        rules: {
          userName: [{ message: "用户名不能为空", trigger: "blur", required: true }],
          passWord: [{ message: "密码不能为空", trigger: "blur", required: true }],
          mobilePhone: [{ message: "手机号码不能为空", trigger: "blur", required: true }],
          authCode: [{ message: "短信验证码不能为空", trigger: "blur", required: true }],
        }
      }
    };
  },
  created() { },
  methods: {
    //提交
    save_data() {
      //校验
      var validate = true;
      this.$refs.form_data.validate(val => { validate = val; });
      if (validate == false) { return false; }

      this.form_data.loading = true; //开启加载图标

      var param = {
        userName: smcrypto.sm2.doEncrypt(this.form_data.userName),
        passWord: smcrypto.sm2.doEncrypt(this.form_data.passWord),
        mobilePhone: this.form_data.mobilePhone,
        authCode: this.form_data.authCode,
      };

      this.$api.updateData_ResetPassword(param)
        .then(res => {
          this.form_data.loading = false; //开启加载图标
          if (res.data.code == 200) {
            let that = this;
            this.$Modal.success({ title: "修改密码", content: "修改密码成功，请重新登录。", onOk: function () { that.$router.push("/?logout=logout"); } });
          }
          else {
            this.$Message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("请求出现异常！");
        });
    },
    sendCode() {
      let that = this;

      if (that.send_code_text != "获取验证码") { return false; }

      let interval_code = setInterval(function () {
        that.sms_code_overtime = that.sms_code_overtime - 1;
        if (that.sms_code_overtime > 0) {
          that.send_code_text = that.sms_code_overtime + "s";
        } else {
          that.sms_code_overtime = 60;
          that.send_code_text = "获取验证码";
          clearInterval(interval_code);
        }
      }, 1000);

      var param = {
        phoneNum: this.form_data.mobilePhone,
      };

      this.$api.sendData_SMSCode(param)
        .then(res => {
          if (res.data.code == 200) { this.$Message["success"]({ background: true, content: "发送成功，请注意查收。" }); }
          else {
            that.sms_code_overtime = 60;
            that.send_code_text = "获取验证码";
            clearInterval(interval_code);
            this.$Message.error({ background: true, content: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          that.sms_code_overtime = 60;
          that.send_code_text = "获取验证码";
          clearInterval(interval_code);
          this.$Message.error({ background: true, content: "请求出现异常！" });
        });
    },
  }
};
</script>

