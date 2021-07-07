<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
}
img {
  vertical-align: middle;
}
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #515a6e;
  background-color: #f7f8fa;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .van-nav-bar {
    background-color: #1989fa;
    .van-icon,
    .van-nav-bar__title,
    .van-nav-bar__text {
      color: #fff;
      &:active {
        background-color: #1989fa;
      }
    }
    &::after {
      border-bottom-width: 0px;
    }
  }
  .van-field__label {
    color: #323233;
  }
}
article,
aside,
blockquote,
body,
button,
dd,
details,
div,
dl,
dt,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
hgroup,
hr,
input,
legend,
li,
menu,
nav,
ol,
p,
section,
td,
textarea,
th,
ul {
  margin: 0;
  padding: 0;
}
.cell_field {
  .van-cell__title {
    flex: none;
    width: 6.2em;
    margin-right: 12px;
  }
  .van-cell__value {
    text-align: left;
    color: #323233;
  }
}
.cell_checkbox {
  .van-cell__title {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    width: 6.2em;
    margin-right: 12px;
  }
  .van-cell__value {
    text-align: left;
    color: #323233;
  }
  .van-checkbox {
    margin-bottom: 8px;
  }
}
.cell_radio {
  .van-cell__title {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    width: 6.2em;
    margin-right: 12px;
  }
  .van-cell__value {
    text-align: left;
    color: #323233;
  }
  .van-radio-group {
    margin-bottom: -8px;
    .van-radio {
      margin-bottom: 8px;
    }
    .van-radio--horizontal {
      margin-right: 24px;
    }
  }
}
</style>

<script>
export default {
  name: 'App'
}
</script>

