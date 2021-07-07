<template>
  <div class="_user_edit">
    <Form ref="ValidateForm" :model="form_data" :rules="ruleValidate" :label-width="120" style="width:60%;margin: 30px auto;padding-right:120;">
      <FormItem label="用户名(工号)" prop="userName">
        <Input placeholder="请填写用户名(工号)" v-model="form_data.userName" />
      </FormItem>
      <FormItem label="姓名" prop="nickName">
        <Input placeholder="请填写姓名" v-model="form_data.nickName" />
      </FormItem>
      <FormItem label="手机号码" prop="mobilePhone">
        <Input placeholder="请填写手机号码" v-model="form_data.mobilePhone" />
      </FormItem>
      <FormItem label="是否允许登录">
        <i-switch size="large" v-model="form_data.isActive" :true-value="0" :false-value="1">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>

      <Button @click="save_data" type="primary" style="width: 200px;margin: 40px auto;display: block;">保&nbsp;&nbsp;&nbsp;存</Button>
    </Form>
  </div>
</template>

<style lang="less"></style>

<script>
export default {
  data() {
    return {
      orgvalue: [],
      form_data: {
        id: "",
        nickName: "",
        userName: "",
        mobilePhone: "",
        isActive: 0
      },
      ruleValidate: {
        userName: [{ required: true, message: "请填写用户名(工号)", trigger: "blur" }],
        nickName: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        mobilePhone: [{ required: true, message: "请填写手机号码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.get_data();
  },
  methods: {
    get_data() {
      var id = this.$route.query.id || "";
      if (!id == true) { return false; }

      var param = { id: id };
      this.$api.getData_User(param)
        .then(res => {
          if (res.data.code == 200) {
            this.form_data = res.data.data;
          }
          else { this.$Message.error(res.data.message); }
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("请求出现异常！");
        });
    },
    save_data() {
      let param = this.form_data;

      //校验数据
      let validate = true;
      this.$refs["ValidateForm"].validate(val => { validate = val; });
      if (validate == false) { this.$Message["warning"]({ background: true, content: "提交失败，请检查数据!" }); return false; }

      this.$api.saveData_User(param)
        .then(res => {
          if (res.data.code == 200) {
            this.$Message["success"]({ background: true, content: "保存成功!" });
            this.$router.replace("/user/List");
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