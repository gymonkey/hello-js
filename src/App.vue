<script setup>
import zhCN from "element-plus/es/locale/lang/zh-cn";
import PLayout from "@/components/Layout.vue";
import 'element-plus/es/components/message/style/css'
</script>

<template>
  <el-config-provider :locale="zhCN">
    <p-layout>
      <router-view />
    </p-layout>
  </el-config-provider>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
</style>
