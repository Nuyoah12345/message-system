<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-card class="box-card" shadow="always">
        <div class="user">
          <img src="./images/logo.png" alt="" />
          <div class="user-info">
            <p>Admin</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间: <span>2022-3-2</span></p>
          <p>登陆地点: <span>河南</span></p>
        </div>
      </el-card>

      <el-card style="margin-top: 10px; height: 370px">
        <el-table :data="tableList">
          <el-table-column
            :prop="k"
            :label="v"
            v-for="(v, k) in tableKey"
            :key="k"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16">
      <div class="num">
        <el-card
          v-for="c in countData"
          :key="c.name"
          :body-style="{
            width: '249px',
            display: 'flex',
            padding: '10px',
          }"
        >
          <i
            :class="`el-icon-${c.icon}`"
            :style="{ backgroundColor: c.color }"
          ></i>
          <div class="detail">
            <p>{{ c.name }}</p>
            <p>{{ c.value }}</p>
          </div>
        </el-card>
      </div>
      <el-card class="echart">
        <div
          style="width: 100%; height: 270px; margin-top: -50px"
          ref="chart3"
        ></div>
      </el-card>
      <div class="gragh">
        <el-card class="tu">
          <div
            ref="chart1"
            style="width: 400px; height: 250px; margin-left: -20px"
          ></div>
        </el-card>
        <el-card class="tu">
          <div
            ref="chart2"
            style="width: 400px; height: 250px; margin-left: -20px"
          ></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { reqEchart } from "@/api/main";
import * as echarts from "echarts";
export default {
  name: "home",
  data() {
    return {
      tableKey: {
        name: "姓名",
        todayBuy: "日购买",
        monthBuy: "月购买",
        totalBuy: "总购买",
      },
      tableList: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "三星",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      EchartsList: [],
    };
  },
  async mounted() {
    // console.log(this.$store);
    const token = this.$store.state.user.token;
    let data = await reqEchart(token);
    console.log(data);
    this.EchartsList = data.data;
    // console.log(this.EchartsList.map((item) => item.data));
    // 饼状图
    const option = {
      series: [
        {
          type: "pie",
          data: [
            {
              value: 100,
              name: "A",
            },
            {
              value: 200,
              name: "B",
            },
            {
              value: 300,
              name: "C",
            },
            {
              value: 400,
              name: "D",
            },
            {
              value: 500,
              name: "E",
            },
          ],
          roseType: "area",
        },
      ],
    };
    const e2 = echarts.init(this.$refs.chart2);
    e2.setOption(option);
    // 折线图
    const option2 = {
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        data: ["A", "B", "C", "D", "E"],
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 43, 49],
          type: "line",
          label: {
            show: true,
            position: "top",
            textStyle: {
              fontSize: 16,
            },
          },
        },
        {
          data: [5, 4, 3, 5, 10],
          type: "line",
          label: {
            show: true,
            position: "top",
            textStyle: {
              fontSize: 16,
            },
          },
        },
      ],
    };
    const e3 = echarts.init(this.$refs.chart3);
    e3.setOption(option2);
  },
  watch: {
    EchartsList() {
      // 柱状图
      const user = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: this.EchartsList.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: this.EchartsList.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: this.EchartsList.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      const e1 = echarts.init(this.$refs.chart1);
      e1.setOption(user);
    },
  },
};
</script>

<style>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.user img {
  width: 100px;
}
.user-info {
  flex: 1;
  text-align: center;
}
.login-info {
  margin-top: 10px;
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.num i {
  width: 50px;
  text-align: center;
  line-height: 50px;
}
.detail {
  flex: 1;
  text-align: center;
}
.echart {
  height: 200px;
  margin-top: 20px;
}
.gragh {
  display: flex;
  justify-content: space-between;
}
.tu {
  margin-top: 20px;
  width: 400px;
  height: 250px;
}
</style>