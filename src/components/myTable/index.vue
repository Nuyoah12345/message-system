<template>
  <div class="messaeg-detail">
    <el-table
      :data="tableData.list"
      stripe
      style="width: 100%"
      :show-overflow-tooltip="true"
      height="340"
    >
      <el-table-column
        :prop="c.prop"
        :label="c.label"
        :width="c.width ? c.width : 150"
        v-for="c in tableColName"
        :key="c.prop"
      >
      </el-table-column>

      <el-table-column label="操作">
        <el-button type="warning" size="mini" @click="Edit">编辑</el-button>
        <el-button type="danger" size="mini" @click="Del">删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      layout="prev, pager, next"
      :total="tableData.total"
      :page-size="5"
      class="pager"
      :current-page="tableData.current"
      @current-change="chagePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "myTable",
  // 配置信息以及表格数据通过uesr传入
  props: ["tableData"],
  data() {
    return {
      tableColName: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
        {
          prop: "date",
          label: "出生日期",
          width: 260,
        },
        {
          prop: "address",
          label: "地址",
          width: 450,
        },
      ],
    };
  },
  methods: {
    Edit() {},
    Del() {},
    chagePage(page) {
      // console.log(a);
      this.$store.dispatch("user/getuserlist", page);
    },
  },
};
</script>

<style>
.messaeg-detail {
  position: relative;
  height: 380px;
}
.pager {
  position: absolute;
  bottom: 0;
  right: 40%;
}
</style>