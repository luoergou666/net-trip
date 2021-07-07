<template>
  <div class="_quartz_edit">
    <Form ref="ValidateForm" :model="form_data" :label-width="120" style="width: 40%; margin: 30px 0px 0px 10%;">
      <FormItem label="类别名">
        <Select v-model="form_data.jobClass" @on-change="on_change_job" :label-in-value="true">
          <template v-for="(n,i) in class_list">
            <Option :value="n.jobClass">{{n.jobClassName}}</Option>
          </template>
        </Select>
      </FormItem>
      <FormItem label="全路径类名">
        <Input v-model="form_data.jobClass" placeholder="请填写类名" readonly />
      </FormItem>
      <FormItem label="表达式">
        <Input v-model.trim="form_data.cronExpression" placeholder="请填写表达式" />
      </FormItem>
      <FormItem label="启用/暂停">
        <i-switch size="large" v-model="form_data.status" :true-value="0" :false-value="1">
          <span slot="open">启用</span>
          <span slot="close">暂停</span>
        </i-switch>
      </FormItem>
      <FormItem label>
        <Button size="large" @click="save_data" type="primary">&nbsp;&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;存&nbsp;&nbsp;&nbsp;</Button>
      </FormItem>
      <br />
      <br />
      <a href="http://www.bejson.com/othertools/cron/" target="_blank">在线生成cron表达式</a>
    </Form>
  </div>
</template>

<style lang="less"></style>

<script>
export default {
  data() {
    return {
      form_data: {
        id: "",
        jobName: "",
        jobClass: "",
        cronExpression: "",
        status: 0
      },
      class_list: [],
    };
  },
  created() {
    this.get_data();
    this.get_class();
  },
  methods: {
    get_data() {
      var id = this.$route.query.id;
      if (!id == true) { return false; }

      this.form_data.id = id;

      var param = { id: id };
      this.$api.getData_Quartz(param)
        .then(res => {
          this.form_data = res.data.data;
          delete this.form_data.creationTime;
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("请求出现异常！");
        });
    },
    save_data() {
      if (!this.form_data.jobName == true) { this.$Message.error("请选择类别名"); return false; }
      if (!this.form_data.jobClass == true) { this.$Message.error("类别名不能为空"); return false; }
      if (!this.form_data.cronExpression == true) { this.$Message.error("请填写表达式"); return false; }

      let param = this.form_data;

      this.$api.saveData_Quartz(param)
        .then(res => {
          if (res.data.code == 200) {
            this.$Message.success("保存成功!");
            this.$router.replace("/quartz/List");
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("请求出现异常！");
        });
    },
    get_class() {
      var param = {};
      this.$api.getList_Quartz_Class(param)
        .then(res => {
          this.class_list = res.data.data;
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("请求出现异常！");
        });
    },
    on_change_job(item) { this.form_data.jobName = item.label; },

  }
};
</script>