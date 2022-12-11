<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        circle
        size="mini"
        style="margin-right: 20px"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown
        text-color="#CDCD3D"
        active-text-color="#51AB9A"
        @command="handleClick"
      >
        <span class="el-dropdown-link">
          <img class="user" src="../assets/logo.png" alt="" srcset="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
// 辅助函数
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    handleClick(command) {
      if (command === "cancel") {
        console.log("登出");
        // 清除cookie 退出回到登录页面
        Cookie.remove("token");
        //清除cookie中的menu
        Cookie.remove("menu");
        // 跳转登录页面
        this.$router.push("/login");
      }
    },
  },
  computed: {
    // 要加扩展运算符
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  mounted() {
    console.log(this.tags, "tags");
  },
};
</script>
<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background: -webkit-linear-gradient(top left, #272d5e, #c4c4c4);
  height: 60px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    font-size: 16px;
    color: #ffff;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
      ///deep/样式穿刺
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #fff;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #938ce7;
        }
      }
    }
  }
}
</style>