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
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "my-header",
  computed: {
    ...mapState("bread", ["tabsList"]),
  },
  methods: {
    handleCommand(command) {
      if (command == "goHome") {
        this.$router.push({ name: "home" });
      } else if (command == "quitLogin") {
        this.$store.commit("user/QUITLOGIN");
        this.$router.push({ name: "login" });
      }
    },
    // 面包屑路由跳转的同时，通知vuex更改current
    editVuex(val) {
      // console.log(123);
      this.$store.commit("bread/ADDLIST", val);
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