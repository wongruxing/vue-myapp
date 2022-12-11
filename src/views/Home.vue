<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/logo.png" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-10-19</span></p>
          <p>上次登录地点：<span>广州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 15px; height: 425px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="课程"></el-table-column>
          <el-table-column prop="todayBuy" label="今日购买"> </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买"> </el-table-column>
          <el-table-column prop="totalBuy" label="总购买"> </el-table-column>
          <!-- bug -->
          <!-- <el-table-column
            v-for="(val, key) in tableLabel"
            :prop="key"
            :label="val"
          /> -->
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-right: 10px">
      <div class="num">
        <el-card
          class="el-car"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <div class="price">¥{{ item.value }}</div>
            <div class="desc">{{ item.name }}</div>
          </div>
        </el-card>
      </div>
      <el-card style="height: 260px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 260px"></div>
      </el-card>
      <div class="graph">
        <!-- 柱状图 -->
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 230px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
      // tableLabel: {
      //   name: "课程",
      //   todayBuy: "今日购买",
      //   monthBuy: "本月购买",
      //   totalBuy: "总购买",
      // },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#6AE799",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#8787FF",
        },
        {
          name: "今日未支付订单",
          value: 900,
          icon: "s-goods",
          color: "#E78235",
        },
        {
          name: "本月支付订单",
          value: 12341,
          icon: "success",
          color: "#6AE799",
        },
        {
          name: "本月收藏订单",
          value: 2103,
          icon: "star-on",
          color: "#8787FF",
        },
        {
          name: "本月未支付未支付订单",
          value: 9089,
          icon: "s-goods",
          color: "#E78235",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      console.log(data.data);
      this.tableData = tableData;
      // 折线图
      // 基于准备好的dom 初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      // 指定图表配置项和数据
      var echarts1Option = {};
      // 处理数据xAxis
      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echarts1Option.xAxis = xAxisData;
      echarts1Option.yAxis = {};
      // console.log(xAxis);
      echarts1Option.legend = xAxisData;
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });

      console.log(echarts1Option);
      // 使用刚指定的配置和数据显示图表
      echarts1.setOption(echarts1Option);
      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
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
          type: "category", //类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#6374E7",
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
                color: "#6374E7",
              },
            },
          },
        ],
        color: ["#4D57E7", "#66E77D"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      echarts2.setOption(echarts2Option);
      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#40E74B",
          "#E7A18D",
          "#E7E058",
          "#3F39E7",
          "#E762AD",
          "#3FE7E6",
          "#7375E7",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #99999999;
    }
  }
}
.login-info {
  p {
    line-height: 29px;
    font-size: 14px;
    color: #99999999;
    span {
      color: #66666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}
.el-car {
  width: 32%;
  margin-bottom: 15px;
}
.graph {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 49%;
  }
}
</style>
