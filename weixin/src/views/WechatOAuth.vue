<template>
  <div class="_wechat_oauth">
    <img src="/static/login_logo.png" class="icon-logo" />
    <van-loading size="56px" vertical color="#1989fa"><span style="color:#1989fa">页面加载中...</span></van-loading>
  </div>
</template>

<style lang="less">
._wechat_oauth {
  margin: 0 auto;
  .icon-logo {
    width: 330px;
    margin: 40px auto 80px;
    display: block;
  }
}
</style>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
    this.get_data();
  },
  methods: {
    get_data() {
      let code = this.$route.query.code;
      let redirect_url = this.$baseurl.weixin + "#" + (localStorage.getItem("xxxx_weixin_redirect") || "/");

      if (!code) {
        this.$toast.fail("不存在code！");
        window.location.href = this.$baseurl.weixin + "#/";
        return false;
      }

      if (!localStorage.getItem("xxxx_weixin_token") == false) {
        window.location.href = redirect_url;
        return false;
      }

      //发送code给服务器，返回用户信息和token
      var param = { code: code };

      this.$api.getData_Wx_WechatAuth(param)
        .then(res => {
          if (res.data.code == 200) {
            this.$store.commit("initUser", res.data.data);
            localStorage.setItem("xxxx_weixin_token", res.data.data.token);
            localStorage.setItem("xxxx_weixin_redirect", "/");  //清除xxxx_weixin_redirect，改成首页

            window.location.href = redirect_url;
          } else {
            this.$toast.fail(res.data.msg);
          }

        })
        .catch(err => { this.$toast.fail("请求出现异常！"); });
    },
  },
};
</script>
