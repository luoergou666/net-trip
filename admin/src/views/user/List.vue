<template>
  <div class="_user_list">
    <Form :label-width="80" inline>
      <FormItem label="姓名">
        <Input v-model="query_form.name" placeholder="姓名" @on-change="query_list()" clearable />
      </FormItem>
      <Button type="primary" class="query_form_btn" @click="query_list()">查&nbsp;&nbsp;&nbsp;询</Button>
      <Button type="primary" class="query_form_btn" to="/user/Edit">新建用户</Button>
    </Form>

    <Table border :columns="table_columns" :data="table_list" :loading="page_option.loading">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" :to="'/user/Edit?id=' + row.id">编&nbsp;辑</Button>
        <Button type="primary" size="small" :to="'/user/UserRoleEdit?id=' + row.id+'&name='+ row.nickName">设置角色</Button>

        <Button v-if="row.isActive == 0" type="primary" size="small" @click="update_IsActive(row.id,row.isActive)">禁&nbsp;用</Button>
        <Button v-else type="primary" size="small" @click="update_IsActive(row.id,row.isActive)">启&nbsp;用</Button>
      </template>
    </Table>

    <Page :total="page_option.total" :current="page_option.current" :page-size="page_option.page_size" :show-total="true" :show-sizer="true" :page-size-opts="[20, 50, 100]" :loading="page_option.loading" class-name="page-default" @on-change="page_change" @on-page-size-change="page_size_change" />
  </div>
</template>

<style lang="less">
</style>

<script>

export default {
  data() {
    return {
      table_columns: [
        { title: "序号", type: "index", width: 70 },
        { title: "用户名(工号)", key: "userName" },
        { title: "姓名", key: "nickName" },
        { title: "电话", key: "mobilePhone" },
        { title: "可登录？", key: "isActive", width: 100, render: (h, params) => { return h('div', (params.row.isActive == 0 && "是") || (params.row.isActive == 1 && "不可登录") || "") } },
        { title: "操作", slot: "action", fixed: "right", width: 320 }
      ],
      table_list: [],
      page_option: { total: 0, current: 1, page_size: 20, loading: true },
      query_form: { name: "", groupCode: "", deptCode: "", teamCode: "", },
    };
  },
  created() {
    this.query_list();
  },
  methods: {
    page_change(current) {
      this.page_option.current = current;
      this.get_list();
    },
    page_size_change(page_size) {
      this.page_option.current = 1;
      this.page_option.page_size = page_size;
      this.get_list();
    },
    query_list() {
      this.page_option.current = 1;
      this.get_list();
    },
    get_list() {
      this.page_option.loading = true;

      var param = {
        name: this.query_form.name,

        pageNum: this.page_option.current,
        pageSize: this.page_option.page_size
      };

      this.$api.getPage_User(param)
        .then(res => {
          this.page_option.loading = false;

          var data = res.data.data;
          this.page_option.total = data.total;
          this.page_option.current = data.current;
          this.table_list = res.data.data.records;
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("请求出现异常！");
        });
    },
    // 禁用启用事件
    update_IsActive: function (id, active) {
      var param = { id: id, isActive: active == 0 ? 1 : 0 };

      this.$api.updateData_User_IsActive(param)
        .then(res => {
          if (res.data.code == 200) {
            this.get_list();
          }
          else { this.$Message.error(res.data.message); }
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("请求出现异常！");
        });
    },
  }
};
</script>