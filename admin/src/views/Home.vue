
<template>
  <div class="layout _home">
    <Layout class="i-layout">
      <Sider class="i-layout-sider">
        <div class="i-layout-sider-logo"> <img src="/static/logo.png" class="icon-logo" /> 广电员福报销 </div>
        <Menu ref="menus" :active-name="menu_active" :open-names="menu_opens" theme="dark" accordion class="i-layout-menu-side i-scrollbar-hide" style="width: auto;">
          <template v-for="(node,index) in menu_data">
            <Submenu :name="node.name" v-if="is_can_show_menu(node.codes)">
              <template slot="title">
                <Icon :type="node.icon" size="18" />{{node.text}}
              </template>
              <template v-for="(n,i) in node.items">
                <MenuItem :name="n.name" :to="n.to" v-if="is_can_show_menu(n.codes)">{{n.text}}</MenuItem>
              </template>
            </Submenu>
          </template>
        </Menu>
      </Sider>
      <Layout class="i-layout-inside">
        <Header class="i-layout-header">
          <Breadcrumb :style="{ width: '60%',display: 'inline-block'}">
            <BreadcrumbItem v-for="(item, index) in $route.meta.name" :key="index" :to="path(index)">{{item}}</BreadcrumbItem>
          </Breadcrumb>
          <Dropdown style="float: right;">
            <div style="cursor: pointer;">
              <Icon type="md-person" size="16"></Icon>
              <span style="font-size:14px;margin:0px 6px;">{{($store.state.user&&$store.state.user.nickName)||"暂无用户"}}</span>
              <Icon type="ios-arrow-down" size="16"></Icon>
            </div>
            <DropdownMenu slot="list">
              <router-link to="/home" replace tag="a">
                <DropdownItem>
                  <Icon type="ios-apps" />&nbsp;&nbsp;&nbsp;主页
                </DropdownItem>
              </router-link>
              <router-link to="/ResetPsw" replace tag="a">
                <DropdownItem>
                  <Icon type="md-key" />&nbsp;&nbsp;&nbsp;修改密码
                </DropdownItem>
              </router-link>
              <router-link to="/?logout=logout" replace tag="a">
                <DropdownItem>
                  <Icon type="md-log-out" />&nbsp;&nbsp;&nbsp;退出
                </DropdownItem>
              </router-link>
            </DropdownMenu>
          </Dropdown>
        </Header>
        <Content class="i-layout-content">
          <transition name="slide">
            <router-view></router-view>
          </transition>
        </Content>
      </Layout>
    </Layout>
    <BackTop :height="400" :bottom="50"></BackTop>
  </div>
</template>

<style lang="less">
._home {
  .i-layout {
    .i-layout-sider {
      min-height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 13;
      background: #1d1e23;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

      .i-layout-sider-logo {
        height: 64px;
        line-height: 64px;
        text-align: center;
        border-bottom: 1px solid #101117;
        background: #1d1e23;
        color: #fff;
        a {
          color: #fff;
          font-size: 18px;
        }
        .icon-logo {
          width: 22px;
          position: relative;
          top: 5px;
          left: -2px;
        }
      }

      .i-layout-menu-side {
        position: static;
        height: calc(100vh - 64px);
        overflow-y: auto;
        background: #1d1e23;

        .ivu-menu-submenu-title {
          background: transparent;
          &:hover {
            font-weight: bold;
          }
        }

        .ivu-menu-item {
          background: transparent;
          &:hover {
            background-color: initial;
            font-weight: bold;
          }
        }

        .ivu-menu-opened {
          background: #101117;
          .ivu-menu-submenu-title {
            background: #1d1e23;
          }
        }

        .ivu-menu-item > i {
          margin-right: 8px;
        }

        .ivu-menu-item-selected {
          color: #fff;
          background: #515a6e !important;
        }
      }
    }

    .i-layout-inside {
      min-height: 100vh;
      padding-left: 200px;
      transition: all 0.2s ease-in-out;

      .i-layout-header {
        background-color: #fff;
        border-bottom: 1px solid #efefef;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        position: fixed;
        top: 0;
        right: 0;
        left: 200px;
        z-index: 11;
        padding: 0px 24px;
      }

      .i-layout-content {
        flex: auto;
        margin-top: 64px;
        padding: 24px;
        background-color: #fff;
      }
    }

    .i-scrollbar-hide {
      &::-webkit-scrollbar {
        width: 0;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: #e8eaec;
      }
    }

    .i-copyright {
      flex: 0 0 auto;
      margin: 48px 0 24px 0;
      padding: 0 16px;
      text-align: center;
      .i-global-footer-copyright {
        color: #808695;
        font-size: 14px;
        a {
          color: inherit;
        }
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      menu_active: "",
      menu_opens: [],
      menu_data: [
        {
          text: "申请管理",
          icon: "logo-buffer",
          name: "apply",
          items: [
            { text: "测试列表", name: "apply_list", to: "/apply/List", codes: [""] },
            { text: "测试列表", name: "apply_list", to: "/apply/List", codes: [""] },
            { text: "测试列表", name: "apply_list", to: "/apply/List", codes: [""] },
          ]
        },
        {
          text: "用户管理",
          icon: "md-person",
          name: "user",
          items: [
            { text: "后台用户", name: "user_list", to: "/user/List", codes: ["user"] },
            { text: "角色", name: "user_role", to: "/user/RoleList", codes: ["role"] },
            { text: "权限资源", name: "user_page", to: "/user/PageList", codes: ["page"] },
            { text: "定时任务", name: "user_quartz", to: "/quartz/List", codes: ["quartz"] },
          ]
        },
      ],
      user_codes: [],
      content_area_maxheight: (document.documentElement.clientHeight - 64) + "px",
    };
  },
  created() {
    //当前用的权限码
    this.user_codes = (!this.$store.state.user == true && []) || (!this.$store.state.user.codes == true && []) || this.$store.state.user.codes;
    //合并生成主节点需要的code
    let that = this;
    this.menu_data.forEach(function (node, index) {
      let list = [];  // 主节点的code，取所有子节点的code
      node.items.forEach(function (n, i) {
        n.codes.forEach(function (k, l) { list.push(k); });
      });

      // 判断code集合中有不需要权限code的，则主节点的code为空
      if (list.some(p => { return p == "" })) { that.$set(node, 'codes', []); }
      else { that.$set(node, 'codes', Array.from(new Set(list))); }
    });
    // 展开和选择菜单节点
    this.update_menus();
  },
  mounted() {
    const that = this;
    window.onresize = function temp() { that.content_area_maxheight = (document.documentElement.clientHeight - 64) + "px"; };
  },
  watch: {
    $route(to, from) { this.update_menus(); },
  },
  computed: {
    path() { return function (index) { return this.$route.meta.path[index]; } },
  },
  methods: {
    is_can_show_menu(codes) {
      if (codes == "") { return true; }

      let code_list = this.user_codes;
      return codes.some(node => code_list.indexOf(node) > -1);
    },
    update_menus() {
      let menu_path = this.$route.meta.menu || "";
      this.menu_active = menu_path;
      this.menu_opens = [menu_path.split("_")[0]];
      this.$nextTick(function () {
        this.$refs.menus.updateOpened();
        this.$refs.menus.updateActiveName();
      });
    },
  },
};
</script>
