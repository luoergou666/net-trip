<template>
  <div class="_error">
    <div class="img-404"></div>
    <p class="notfound-p">哎呀出错了...</p>
    <div class="notfound-reason">
      <p>可能的原因：</p>
      <ul>
        <li>原来的页面不存在了</li>
        <li>我们的服务器被外星人劫持了</li>
      </ul>
    </div>
    <van-button type="info" size="small" to="/">返回首页</van-button>
  </div>
</template>

<style lang="less">
._error {
  margin: 0 auto;
  .img-404 {
    height: 155px;
    background: url(/static/404.png) center center no-repeat;
    background-size: 150px auto;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .notfound-p {
    line-height: 22px;
    font-size: 17px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f6f6f6;
    text-align: center;
    color: #262b31;
  }
  .notfound-reason {
    color: #9ca4ac;
    font-size: 13px;
    line-height: 13px;
    text-align: left;
    width: 210px;
    margin: 20px auto 0px;
    p {
      margin-top: 13px;
    }
    ul {
      list-style-type: disc;
    }
    li {
      margin-top: 10px;
      margin-left: 36px;
      display: list-item;
    }
  }
  .van-button {
    width: 76px;
    margin: 36px auto;
    display: block;
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
  created() {
    localStorage.removeItem('xxxx_weixin');
    localStorage.removeItem('xxxx_weixin_token');
  },
};
</script>
