<template>
  <div class="_quartz_list">
    <Form :label-width="80">
      <Row>
        <Col span="20">&nbsp;</Col>
        <Col span="4">
        <Button type="primary" style="margin-left: 15px" to="/quartz/Edit">新建定时任务</Button>
        </Col>
      </Row>
    </Form>
    <br />

    <Table border :columns="table_columns" :data="table_list" :loading="page_option.loading">
      <template slot-scope="{ index }" slot="index">{{ index + 1 }}</template>

      <template slot-scope="{ row }" slot="status">{{(row.status == 0 && "启用") || (row.status == 1 && "暂停")}}</template>

      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 8px" :to="'/quartz/Edit?id=' + row.id">编辑</Button>
        <Button v-if="row.status == 0" type="warning" size="small" @click="qartz_pausejob(row.jobName)">暂停</Button>
        <Button v-else type="info" size="small" @click="qartz_resumejob(row.jobName)">启用</Button>
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
        { title: "序号", slot: "index", width: 70 },
        { title: "类别名", key: "jobName", width: 250 },
        { title: "全路径类名", key: "jobClass" },
        { title: "表达式", key: "cronExpression", width: 200 },
        { title: "任务状态", key: "status", slot: "status", width: 100 },
        // { title: "创建时间", key: "creationTime", width: 170  },
        { title: "操作", slot: "action", width: 150 }
      ],
      table_list: [],
      page_option: {
        total: 0,
        current: 1,
        page_size: 20,
        loading: true
      },
      query_form: {
        jobName: ""
      }
    };
  },
  created() {
    this.get_list();
  },
  methods: {
    auto_query () { this.query_list(); },
    page_change(current) {
      this.page_option.current = current;
      this.get_list();
    },
    page_size_change(page_size) {
      this.page_option.current = 1;
      this.page_option.page_size = page_size;
      this.get_list();
    },
    get_list() {
      this.page_option.loading = true;

      var param = {
        pageNum: this.page_option.current,
        pageSize: this.page_option.page_size
      };

      this.$api.getPage_Quartz(param)
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
    query_list() {
      this.page_option.current = 1;
      this.get_list();
    },
    //暂停任务
    qartz_pausejob (jobName) {
      var param = { name: jobName };
      this.$api.UpdateData_Quartz_PauseJob(param)
        .then(res => {
          if (res.data.code == 200) {
            this.query_list();
          } else {
            this.$Message.error("请求出现异常！");
          }
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("请求出现异常！");
        });
    },
    //启动任务
    qartz_resumejob (jobName) {
      var param = { name: jobName };
      this.$api.UpdateData_Quartz_ResumeJo(param)
        .then(res => {
          if (res.data.code == 200) {
            this.query_list();
          } else {
            this.$Message.error("请求出现异常！");
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