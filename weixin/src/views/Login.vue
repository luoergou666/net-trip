<template>
  <div class="_login">
    <img src="/static/login_logo.png" class="icon-logo" />

    <van-form>
      <van-cell-group border>
        <van-field v-model="query_form.name" label="姓名" placeholder="请输入姓名" />
        <van-field v-model="query_form.idCardNo" label="身份证" placeholder="请输入身份证号码" />
      </van-cell-group>
    </van-form>

    <van-button type="info" block @click="get_data()">确定</van-button>

    <van-popup round :close-on-popstate="true" :close-on-click-overlay="false" closeable close-icon="close" v-model="query_form.show_popup_sms_code" class="_login_popup">
      <van-cell title="短信验证码" icon="notes-o" :border="false" class="title" />
      <p class="tip">验证码将发送至<span>{{query_form.phoneText}}</span>,请注意查收。</p>

      <van-field v-model="query_form.verificationCode" placeholder="短信验证码" center :border="false" class="smscode">
        <van-button v-if="query_form.is_can_send_code" slot="button" size="small" type="primary" @click="send_code()">发送验证码</van-button>
        <van-button v-else slot="button" size="small" type="primary">
          <van-count-down :time="60000" format="ss 秒" @finish="query_form.is_can_send_code = true" />
        </van-button>
      </van-field>

      <van-button type="info" @click="save_data()" class="btn">确定</van-button>
    </van-popup>

  </div>
</template>

<style lang="less">
._login {
  padding: 0px 16px;
  overflow: hidden;
  background-color: #fff;
  min-height: 100vh;
  .icon-logo {
    width: 330px;
    margin: 30px auto;
    display: block;
  }
}
._login_popup {
  width: 80%;
  max-width: 300px;
  .title {
    padding: 16px;
  }
  .tip {
    margin: 8px 16px;
    font-size: 13px;
    span {
      font-size: 16px;
      padding: 0px 5px;
    }
  }

  .smscode {
    .van-field__body {
      border: 1px solid #07c160;
      border-radius: 5px;
      .van-field__control {
        padding-left: 8px;
      }
      .van-field__button {
        margin-top: -1px;
      }
    }
    .van-count-down {
      color: #fff;
      width: 76px;
    }
  }

  .btn {
    margin: 16px auto 32px;
    display: block;
    width: 268px;
    border-radius: 5px;
    height: 36px;
  }
}
</style>

</style>

<script>
export default {
  data() {
    return {
      query_form: {
        name: "",
        idCardNo: "",
        phone: "",
        phoneText: "134****2230",
        verificationCode: "",

        show_popup_sms_code: true,
        is_can_send_code: true,
      },
    };
  },
  created() {
  },
  methods: {
    get_data() {

    },
    save_data() {

    },
    send_code() {
      if (this.query_form.phone == "" || this.query_form.phone.length !== 11) { this.$toast('请填写正确的手机号码'); return false; }

      var param = { phoneNum: this.query_form.phone, }

      this.$api.sendData_SMSCode(param)
        .then(res => {
          if (res.data.code == 200) {
            this.$toast.success(res.data.msg);
            this.query_form.is_can_send_code = false;
          }
          else { this.$toast.fail(res.data.msg); }
        })
        .catch(err => { this.$toast.fail("请求出现异常！"); });
    },
  },
};
</script>
