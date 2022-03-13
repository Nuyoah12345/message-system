<template>
  <div class="manage">
    <div class="userHeader">
      <el-button type="primary" @click="dialogVisible = true">+新增</el-button>
      <my-form :form="searchVal" :formLabel="searchLabel">
        <el-button type="primary" @click="getKeyList()">搜索</el-button>
      </my-form>
    </div>

    <!-- 表格组件(带有分页器) -->
    <my-table :tableData="tableData"></my-table>

    <!-- 表单内容 -->
    <el-dialog
      :title="isAdd ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <my-form :formLabel="operateFormLabel" :form="operateForm"></my-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myTable from "@/components/myTable";
import myForm from "@/components/myForm";
import { mapState } from "vuex";
export default {
  name: "user",
  components: { myForm, myTable },
  data() {
    return {
      dialogVisible: false,
      isAdd: true,
      // 新增和搜索表单格式数据
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      searchLabel: [
        {
          model: "keyword",
          label: "关键字",
          type: "input",
        },
      ],
      // 新增内容接收
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      // 关键字接收
      searchVal: {},
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    getKeyList() {
      this.$store.dispatch("user/getkeyuser", this.searchVal);
      // this.searchVal = "";
    },
  },
  created() {
    this.$store.dispatch("user/getuserlist", 1);
  },
  computed: {
    ...mapState("user", ["tableData"]),
  },
};
</script>

<style>
.userHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>