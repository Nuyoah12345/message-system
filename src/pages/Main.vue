<template>
  <el-container style="width: 100%">
    <el-aside width="auto">
      <my-aside />
    </el-aside>
    <el-container>
      <el-header>
        <myheader />
      </el-header>
      <el-main>
        <el-tag
          type="warning"
          size="mini"
          :closable="t.label !== '首页'"
          v-for="t in tabsList"
          :key="t.name"
          :effect="t.name == currentMenu.name ? 'dark' : 'plain'"
          @close="closeHand(t.name)"
          @click="clickHand(t)"
          >{{ t.label }}</el-tag
        >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import myheader from "@/components/myHeader";
import { mapState } from "vuex";
export default {
  name: "Main",
  components: { myheader },
  computed: {
    ...mapState("bread", ["tabsList", "currentMenu"]),
  },
  methods: {
    closeHand(name) {
      const len = this.tabsList.length;
      const index = this.tabsList.findIndex((item) => item.name === name);
      // tab焦点的处理:处于焦点的关闭需要回退
      if (this.currentMenu.name == name) {
        if (len - 1 == index) {
          this.$router.push({ name: this.tabsList[index - 1].name });
          this.$store.commit("bread/SHIFTLIST", index, len);
        } else {
          this.$store.commit("bread/SHIFTLIST", index, len);
          this.$router.push({ name: this.tabsList[index].name });
        }
      } else {
        this.$store.commit("bread/SHIFTLIST", index, len);
      }
    },
    clickHand(t) {
      this.$store.commit("bread/ADDLIST", t);
      this.$router.push({ name: t.name });
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: rgb(136, 192, 230);
}
.el-aside {
  height: 100%;
}
.el-main {
  background-color: #eee;
  padding: 5px;
}
.el-tag {
  cursor: pointer;
  margin: 7px;
}
</style>
