<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
//spin-fix需要父容易有position: relative;

.page-default {
  margin-top: 30px;
  text-align: right;
}
.ivu-checkbox-wrapper.ivu-checkbox-border,
.ivu-radio-wrapper.ivu-radio-border {
  margin-bottom: 8px;
}
// 查询表单按钮
.query_form_btn {
  margin: 0px 0px 24px 16px;
}
// 二级菜单
.menu-sub {
  &.ivu-menu {
    margin: -24px 0px 30px;
  }
}
// 抽屉的底部按钮栏
.ivu-drawer-body {
  padding: 16px 16px 60px 16px;
  position: static;
  .drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
    .ivu-btn {
      padding: 0 24px;
      min-width: 90px;
    }
  }
}
// 表格的按钮
.ivu-table {
  .ivu-btn {
    margin: 0px 4px;
  }
}
// texteara展示换行
.pre-text {
  white-space: pre-line;
}
</style>

<script>
export default {
  name: 'App'
}
</script>

