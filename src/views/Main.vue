<template>
  <div>
    <el-container>
      <el-aside width="auto"><component-aside /></el-aside>
      <el-container>
        <el-header class="el-header">
          <component-header />
        </el-header>

        <component-tag />

        <el-main>
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件渲染在这里 -->
          <router-view></router-view
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import ComponentAside from "@/components/ComponentAside.vue";
import ComponentHeader from "@/components/ComponentHeader.vue";
import ComponentTag from "@/components/ComponentTag.vue";
export default {
  components: { ComponentAside, ComponentHeader, ComponentTag },

  data() {
    return {};
  },
};
</script>
<style scoped>
.el-header {
  padding: 0;
}
</style>>