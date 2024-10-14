<script setup lang="ts">
import { useThemeStore } from '@/store'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const theme = useThemeStore()
theme.initTheme()
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>

<style>
@import '@/assets/css/main.css';
</style>
