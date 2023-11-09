<template>
  <el-container>
    <el-header>
      <el-menu
        mode="horizontal"
        :default-active="$route.path"
        router
      >
        <el-menu-item index="/">项目管理</el-menu-item>
        <el-menu-item index="/category">分类管理</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script>

</script>