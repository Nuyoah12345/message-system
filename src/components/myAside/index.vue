<template>
  <el-menu
    :default-active="currentMenu.name"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 v-show="!isCollapse">后台管理系统</h3>
    <h3 v-show="isCollapse">后台</h3>
    <el-menu-item
      :index="i.name"
      v-for="i in noChildren"
      :key="i.name"
      @click="changeCom(i)"
    >
      <i :class="'el-icon-' + i.icon"></i>
      <span slot="title">{{ i.label }}</span>
    </el-menu-item>

    <el-submenu index="1" v-for="i in hasChildren" :key="i.icon">
      <template slot="title">
        <i :class="'el-icon-' + i.icon"></i>
        <span slot="title">{{ i.label }}</span>
      </template>
      <el-menu-item-group v-for="i in i.children" :key="i.name">
        <el-menu-item :index="i.name" @click="changeCom(i)">{{
          i.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "myAside",
  mounted() {
    this.$bus.$on("changeCol", this.changeCol);
  },
  data() {
    return {
      isCollapse: true,
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeCom(i) {
      this.$router.push({ name: i.name });
      //   console.log(i);
      this.$store.commit("bread/ADDLIST", i);
    },
    changeCol() {
      this.isCollapse = !this.isCollapse;
    },
  },
  computed: {
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    ...mapState("bread", ["currentMenu"]),
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: 0;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>