<template>
  <div class="_user_role_page_edit">
    <Alert>角色名：{{name}}</Alert>
    <br />
    <Transfer :data="data_all" :target-keys="target_keys" filterable :filter-method="filterMethod" :render-format="renderFormat" :titles="['未选择的资源','已选择的资源']" @on-change="onChange"></Transfer>
    <Button size="large" @click="save_data" type="primary" class="btn">保存设置</Button>
  </div>
</template>

<style lang="less">
._user_role_page_edit {
  max-width: 900px;
  margin: 0 auto;
  .ivu-transfer-list {
    width: 45%;
    height: 500px;
  }
  .ivu-transfer-operation {
    padding: 0 16px;
    margin: 0;
    width: 10%;
  }
  .ivu-transfer-operation .ivu-btn {
    margin: 0 auto 12px;
  }
  .btn {
    width: 50%;
    margin: 60px auto 30px;
    display: block;
  }
}
</style>

<script>
export default {
  data() {
    return {
      id: this.$route.query.id,
      name: this.$route.query.name,
      data_all: [],
      target_keys: [],
    };
  },
  created() {
    this.get_data_all();
    this.get_target_keys();
  },
  methods: {
    get_data_all() {
      var param = { name: "", pageNum: 1, pageSize: 5000 };

      this.$api.getPage_Page(param)
        .then(res => {
          if (res.data.code == 200) {
            let list = res.data.data.records;
            list.forEach(function (n, i) { n["key"] = n.id; });
            this.data_all = list;
          }
          else { this.$Message.error(res.data.message); }
        })
        .catch(err => { this.$Message.error("请求出现异常！"); });
    },
    get_target_keys() {
      var param = { roleId: this.id };

      this.$api.getList_RolePage(param)
        .then(res => {
          if (res.data.code == 200) {
            let list = [];
            res.data.data.forEach(function (n, i) { list.push(n.pageId); });
            this.target_keys = Array.from(new Set(list));
          }
          else { this.$Message.error(res.data.message); }
        })
        .catch(err => { this.$Message.error("请求出现异常！"); });
    },
    save_data() {
      var param = {
        roleId: this.id,
        pages: this.target_keys.length == 0 ? "" : this.target_keys
      };

      this.$api.addList_RolePage(param)
        .then(res => {
          if (res.data.code == 200) {
            this.$Message['success']({ background: true, content: "保存成功!" });
            this.$router.replace("/user/RoleList");
          }
          else { this.$Message.error(res.data.message); }
        })
        .catch(err => { this.$Message.error("请求出现异常！"); });
    },
    onChange(newTargetKeys, direction, moveKeys) { this.target_keys = newTargetKeys; },
    filterMethod(data, query) { return data.code.indexOf(query) > -1 || data.name.indexOf(query) > -1; },
    renderFormat(item) { return item.code + '（ ' + item.name + ' ）'; }
  }
};
</script>