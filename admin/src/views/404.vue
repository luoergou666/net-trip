<template>
  <div class="_404">
    <div class="ivu-exception">
      <div class="ivu-exception-img">
        <div class="ivu-exception-img-element" style="background-image: url('/static/icon-404-color.svg');"></div>
      </div>
      <div class="ivu-exception-content">
        <h1>404</h1>
        <div class="ivu-exception-content-desc">很抱歉，你访问的页面不存在了</div>
        <div class="ivu-exception-content-actions">
          <router-link to="/Welcome" target="_self" class="ivu-btn ivu-btn-primary ivu-btn-large"> <span>返回首页</span> </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
._404 {
  margin: 0;
  .ivu-exception {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 80vh;
    min-height: 500px;
    .ivu-exception-img {
      -webkit-box-flex: 0;
      flex: 0 0 62.5%;
      width: 62.5%;
      padding-right: 152px;
      zoom: 1;
      &:before {
        content: " ";
        display: table;
      }
      &:after {
        clear: both;
        height: 0;
        font-size: 0;
        visibility: hidden;
      }
      .ivu-exception-img-element {
        float: right;
        width: 100%;
        max-width: 430px;
        height: 360px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
      }
    }
    .ivu-exception-content {
      -webkit-box-flex: 1;
      -ms-flex: auto;
      flex: auto;
      h1 {
        margin-bottom: 24px;
        color: #515a6e;
        font-weight: 600;
        font-size: 72px;
        line-height: 72px;
      }
      .ivu-exception-content-desc {
        margin-bottom: 16px;
        color: #808695;
        font-size: 20px;
        line-height: 28px;
      }
    }
  }
}
</style>

<script>
export default {};
</script>