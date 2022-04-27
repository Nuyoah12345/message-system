<template>
  <header>
    <div class="l-content">
      <el-button
        size="mini"
        plain
        icon="el-icon-menu"
        @click="$bus.$emit('changeCol')"
      ></el-button>
      <div>
        <el-breadcrumb separator="/">
          <!-- 
            :to="{ path: b.path }" 删除了跳转功能
         -->
          <el-breadcrumb-item
            v-for="b in tabsList"
            :key="b.name"
            :to="{ path: b.path }"
            @click.native="editVuex(b)"
            >{{ b.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>

    <div class="r-content">
      <el-dropdown trigger="click" size="mini" @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="./images/logo.png" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="goHome">个人中心</el-dropdown-item>
          <el-dropdown-item command="quitLogin">退出登陆</el-dropdown-item>
          <el-dropdown-item command="addMessager">新增管理员</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 表单内容 -->
    <el-dialog
      title="新增管理员"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <my-form :formLabel="msgFormLabel" :form="msgForm"></my-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </header>
</template>

<script>
import qs from "qs";
import { reqReguser } from "@/api/main.js";
import myForm from "@/components/myForm";
import { mapState } from "vuex";
export default {
  name: "my-header",
  data() {
    return {
      msgFormLabel: [
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
        {
          model: "repeatPass",
          label: "重复密码",
          type: "pass",
        },
      ],
      msgForm: {
        username: "",
        password: "",
        repeatPass: "",
      },
      dialogVisible: false,
    };
  },
  components: { myForm },
  computed: {
    ...mapState("bread", ["tabsList"]),
  },
  methods: {
    handleCommand(command) {
      if (command == "goHome") {
        this.$router.push({ name: "home" });
        this.$store.commit("bread/ADDLIST", { name: "home" });
      } else if (command == "quitLogin") {
        // 退出将vuex中token和sessionStorage中的token都删除
        this.$store.dispatch("user/quitLogin");
        this.$router.push({ name: "login" });
      } else if (command == "addMessager") {
        this.dialogVisible = true;
      }
    },
    // 面包屑路由跳转的同时，通知vuex更改current
    editVuex(val) {
      // console.log(123);
      this.$store.commit("bread/ADDLIST", val);
    },
    // 注册管理员
    async submit() {
      const val = this.msgForm;
      if (val.password != val.repeatPass) return alert("两次密码不一致！！");
      if (!confirm("确定要新增一个管理员吗?")) return;
      let data = { username: val.username, password: val.password };
      // 用于post 以application / x-www-form-urlencoded格式发送数据
      // data = qs.stringify(data);
      let res = await reqReguser(data);
      if (res.status == 1) {
        return alert(res.msg);
      } else {
        alert("注册成功");
        this.dialogVisible = false;
      }
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
}
.el-button {
  margin-right: 20px;
}
.r-content {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
}
img {
  width: 100%;
}
/* .el-breadcrumb__item {
  color: white !important;
} */
</style>