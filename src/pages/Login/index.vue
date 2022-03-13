<template>
  <div class="message-login">
    <!-- <span>登陆</span> -->
    <my-form :form="form" :formLabel="formLabel">
      <div class="my-button">
        <el-button type="primary" @click="Login">登陆</el-button>
      </div>
    </my-form>
  </div>
</template>

<script>
import myForm from "@/components/myForm";
import { mapState } from "vuex";
export default {
  name: "myLogin",
  components: { myForm },
  data() {
    return {
      form: {},
      formLabel: [
        {
          model: "username",
          label: "用户名",
          type: "input",
        },
        {
          model: "password",
          label: "密码",
          type: "pass",
        },
      ],
    };
  },
  computed: {
    ...mapState("user", ["token"]),
  },
  methods: {
    Login() {
      // 给token给vuex
      this.$store.dispatch("user/login", this.form);
    },
  },
  watch: {
    token() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
body {
  overflow: hidden;
  background: url(./imgs/003.jpg) no-repeat center;
  background-size: 100%;
}
.message-login {
  background-color: #fff;
  width: 300px;
  margin: 50px auto 0 auto;
  padding: 20px;
  border: 2px solid #bbb;
  border-radius: 10px;
  text-align: center;
}
.el-form-item__label {
  padding-right: 30px;
}
</style>