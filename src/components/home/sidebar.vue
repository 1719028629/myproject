<template>
  <!-- el-menu 菜单栏 -->
  <el-menu default-active="users" :unique-opened="true" :router="true">
    <!-- 选项 -->
    <el-submenu index="1">
      <!-- 菜单选项内容 -->
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-location"></i>
        <!-- 字体 -->
        <span>用户管理</span>
      </template>
      <!-- 子选项 -->
      <el-menu-item index="user">
        <!-- 子选项内容 -->
        <i class="el-icon-menu"></i>
        <span>用户列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="role">
        <i class="el-icon-menu"></i>
        <span>角色列表</span>
      </el-menu-item>
      <el-menu-item index="jurisdiction">
        <i class="el-icon-menu"></i>
        <span>权限列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管理</span>
      </template>
      <el-menu-item index="goods">
        <i class="el-icon-menu"></i>
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item index="3-2">
        <i class="el-icon-menu"></i>
        <span>分类参数</span>
      </el-menu-item>
      <el-menu-item index="3-3">
        <i class="el-icon-menu"></i>
        <span>商品分类</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item index="4-1">
        <i class="el-icon-menu"></i>
        <span>订单列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>数据统计</span>
      </template>
      <el-menu-item index="5-1">
        <i class="el-icon-menu"></i>
        <span>数据报表</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>
