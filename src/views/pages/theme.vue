<script setup lang="ts">
import { useSidebarStore, useThemeStore } from '@/store'

const themeStore = useThemeStore()
const sidebar = useSidebarStore()

const color = reactive({
  primary: localStorage.getItem('theme-primary') || '#409eff',
  success: localStorage.getItem('theme-success') || '#67c23a',
  warning: localStorage.getItem('theme-warning') || '#e6a23c',
  danger: localStorage.getItem('theme-danger') || '#f56c6c',
  info: localStorage.getItem('theme-info') || '#909399',
  headerBgColor: themeStore.headerBgColor,
  headerTextColor: themeStore.headerTextColor,
})
const sidebarColor = reactive({
  bgColor: sidebar.bgColor,
  textColor: sidebar.textColor,
})
const themes = [
  {
    name: 'primary',
    color: themeStore.primary || color.primary,
  },
  {
    name: 'success',
    color: themeStore.success || color.success,
  },
  {
    name: 'warning',
    color: themeStore.warning || color.warning,
  },
  {
    name: 'danger',
    color: themeStore.danger || color.danger,
  },
  {
    name: 'info',
    color: themeStore.info || color.info,
  },
]

function changeColor(name: string) {
  themeStore.setPropertyColor(color[name], name)
}

function resetTheme() {
  themeStore.resetTheme()
}
function resetHeader() {
  localStorage.removeItem('header-bg-color')
  localStorage.removeItem('header-text-color')
  location.reload()
}
function resetSidebar() {
  localStorage.removeItem('sidebar-bg-color')
  localStorage.removeItem('sidebar-text-color')
  location.reload()
}
const system = [
  {
    name: '默认',
    color: '#242f42',
  },
  {
    name: '健康',
    color: '#1ABC9C',
  },
  {
    name: '优雅',
    color: '#722ed1',
  },
  {
    name: '热情',
    color: '#f44336',
  },
  {
    name: '宁静',
    color: '#00bcd4',
  },
]
function setSystemTheme(data: any) {
  if (data.name === '默认') {
    resetSystemTheme()
  }
  else {
    themeStore.setHeaderBgColor(data.color)
    themeStore.setHeaderTextColor('#fff')
    sidebar.setBgColor('#fff')
    sidebar.setTextColor('#5b6e88')
    themeStore.setPropertyColor(data.color, 'primary')
  }
}
function resetSystemTheme() {
  resetTheme()
  resetHeader()
  resetSidebar()
}
</script>

<template>
  <div>
    <el-card class="mgb20" shadow="hover">
      <template #header>
        <div class="content-title">
          系统主题
        </div>
      </template>
      <div class="theme-list mgb20">
        <div
          v-for="item in system" class="theme-item" :style="{ backgroundColor: item.color, color: '#fff' }"
          @click="setSystemTheme(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="flex-center">
        <el-button @click="resetSystemTheme">
          重置主题
        </el-button>
      </div>
    </el-card>
    <el-card class="mgb20" shadow="hover">
      <template #header>
        <div class="content-title">
          Element-Plus主题
        </div>
      </template>
      <div class="theme-list mgb20">
        <div v-for="theme in themes" class="theme-item">
          <el-button :type="theme.name">
            {{ theme.name }}
          </el-button>
          <div class="theme-color">
            {{ theme.color }}
          </div>
          <el-color-picker v-model="color[theme.name]" @change="changeColor(theme.name)" />
        </div>
      </div>
      <div class="flex-center">
        <el-button @click="resetTheme">
          重置主题
        </el-button>
      </div>
    </el-card>

    <el-row :gutter="50">
      <el-col :span="12">
        <el-card class="mgb20" shadow="hover">
          <template #header>
            <div class="content-title">
              头部主题
            </div>
          </template>
          <div class="theme-list mgb20">
            <div class="theme-item">
              <el-button :color="color.headerBgColor">
                背景颜色
              </el-button>
              <div class="theme-color">
                {{ color.headerBgColor }}
              </div>
              <el-color-picker
                v-model="color.headerBgColor"
                @change="themeStore.setHeaderBgColor(color.headerBgColor)"
              />
            </div>
            <div class="theme-item">
              <el-button :color="color.headerTextColor">
                文字颜色
              </el-button>
              <div class="theme-color">
                {{ color.headerTextColor }}
              </div>
              <el-color-picker
                v-model="color.headerTextColor"
                @change="themeStore.setHeaderTextColor(color.headerTextColor)"
              />
            </div>
          </div>
          <div class="flex-center">
            <el-button @click="resetHeader">
              重置主题
            </el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="mgb20" shadow="hover">
          <template #header>
            <div class="content-title">
              菜单主题
            </div>
          </template>
          <div class="theme-list mgb20">
            <div class="theme-item">
              <el-button :color="sidebar.bgColor">
                背景颜色
              </el-button>
              <div class="theme-color">
                {{ sidebar.bgColor }}
              </div>
              <el-color-picker
                v-model="sidebarColor.bgColor"
                @change="sidebar.setBgColor(sidebarColor.bgColor)"
              />
            </div>
            <div class="theme-item">
              <el-button :color="sidebar.textColor">
                文字颜色
              </el-button>
              <div class="theme-color">
                {{ sidebar.textColor }}
              </div>
              <el-color-picker
                v-model="sidebarColor.textColor"
                @change="sidebar.setTextColor(sidebarColor.textColor)"
              />
            </div>
          </div>
          <div class="flex-center">
            <el-button @click="resetSidebar">
              重置主题
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.theme-list {
  display: flex;
  justify-content: center;
}

.theme-item {
  margin-right: 20px;
  padding: 30px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  text-align: center;
}

.theme-color {
  color: #787878;
  margin: 20px 0;
}
</style>
