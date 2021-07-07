<template>
  <div class="_role_list">
    <Form :label-width="80" inline>
      <FormItem label="角色名称">
        <Input v-model="query_form.name" placeholder="角色名称" @on-change="query_list()" />
      </FormItem>
      <Button type="primary" class="query_form_btn" @click="query_list()">查&nbsp;&nbsp;&nbsp;询</Button>
      <Button type="primary" class="query_form_btn" @click="edit_data({id: '',name: '',intro: '',isActive: 0})">新建角色</Button>
      </Row>
    </Form>

    <Table border :columns="table_columns" :data="table_list" :loading="page_option.loading">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="edit_data(row)">编&nbsp;辑</Button>
        <Button type="primary" size="small" :to="'/user/RolePageEdit?id=' + row.id+'&name='+ row.name">设置权限资源</Button>
      </template>
    </Table>

    <Page :total="page_option.total" :current="page_option.current" :page-size="page_option.page_size" :show-total="true" :show-sizer="true" :page-size-opts="[20, 50, 100]" :loading="page_option.loading" class-name="page-default" @on-change="page_change" @on-page-size-change="page_size_change" />

    <Drawer title="角色详情" :closable="show_drawer" :mask-closable="false" v-model="show_drawer" width="480" class="_role_list_drawer">
      <Form>
        <FormItem label="角色名称" label-position="top">
          <Input v-model="edit_form.name" placeholder="请输入角色名称" />
        </FormItem>
        <FormItem label="角色描述" label-position="top">
          <Input v-model="edit_form.intro" type="textarea" :rows="4" placeholder="请输入角色描述" />
        </FormItem>
        <FormItem label="启用/暂停">
          <i-switch size="large" v-model="edit_form.isActive" :true-value="0" :false-value="1">
            <span slot="open">启用</span>
            <span slot="close">暂停</span>
          </i-switch>
        </FormItem>
      </Form>
      <div class="drawer-footer">
        <Button style="margin-right: 16px" @click="show_drawer = false">取消</Button>
        <Button type="primary" @click="sava_data">确定</Button>
      </div>
    </Drawer>

  </div>
</template>

<style lang="less"></style>

<script>
export default {
  data() {
    return {
      show_drawer: false,
      table_columns: [
        { title: "序号", type: "index", width: 80 },
        { title: "角色名称", key: "name" },
        { title: "描述", key: "intro" },
        { title: "禁用/启用", key: "isActive", render: (h, params) => { return h('div', (params.row.isActive == 0 && "启用") || (params.row.isActive == 1 && "禁用") || "无") } },
        { title: "操作", slot: "action", width: 250 }
      ],
      table_list: [],
      page_option: { total: 0, current: 1, page_size: 20, loading: true },
      query_form: { name: "", },
      edit_form: { id: '', name: '', intro: '', isActive: 0 },
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

      this.$api.getPage_Role(param)
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

    // 弹出编辑框，编辑数据
    edit_data(data) {
      this.edit_form = data;
      this.show_drawer = true;
    },

    // 保存数据
    sava_data() {
      var param = this.edit_form;

      this.$api.saveData_Role(param)
        .then(res => {
          if (res.data.code == 200) {
            this.$Message['success']({ background: true, content: "保存成功!" });
            this.query_list();
            this.show_drawer = false;
          } else {
            this.$Message["error"]({ background: true, content: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("请求出现异常！");
        });
    },

  }
};
</script>