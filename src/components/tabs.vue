<script setup lang="ts">
import { useTabsStore } from '@/store'

const route = useRoute()
const router = useRouter()
const activePath = ref(route.fullPath)
const tabs = useTabsStore()
// 设置标签
function setTags(route: any) {
  const isExist = tabs.list.some((item) => {
    return item.path === route.fullPath
  })
  if (!isExist) {
    tabs.setTabsItem({
      name: route.name,
      title: route.meta.title,
      path: route.fullPath,
    })
  }
}
setTags(route)
onBeforeRouteUpdate((to) => {
  setTags(to)
})

// 关闭全部标签
function closeAll() {
  tabs.clearTabs()
  router.push('/')
}
// 关闭其他标签
function closeOther() {
  const curItem = tabs.list.filter((item) => {
    return item.path === route.fullPath
  })
  tabs.closeTabsOther(curItem)
}
function handleTags(command: string) {
  switch (command) {
    case 'current':
      // 关闭当前页面的标签页
      tabs.closeCurrentTag({
        $router: router,
        $route: route,
      })
      break
    case 'all':
      closeAll()
      break

    case 'other':
      closeOther()
      break
  }
}

function clickTabls(item: any) {
  router.push(item.props.name)
}
function closeTabs(path: string) {
  const index = tabs.list.findIndex(item => item.path === path)
  tabs.delTabsItem(index)
  const item = tabs.list[index] || tabs.list[index - 1]
  router.push(item ? item.path : '/')
}

watch(
  () => route.fullPath,
  (newVal, oldVal) => {
    activePath.value = newVal
  },
)
</script>

<template>
  <div class="tabs-container">
    <el-tabs v-model="activePath" class="tabs" type="card" closable @tab-click="clickTabls" @tab-remove="closeTabs">
      <el-tab-pane
        v-for="item in tabs.list"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        @click="setTags(item)"
      />
    </el-tabs>
    <div class="Tabs-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary" plain>
          标签选项
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item command="current">
              关闭当前
            </el-dropdown-item>
            <el-dropdown-item command="all">
              关闭所有
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scss>
.tabs-container {
  position: relative;
  overflow: hidden;
  background: #fff;
  padding: 2px 120px 0 0;
}

.tabs {
  .el-tabs__header {
    margin-bottom: 0;
  }

  .el-tabs__nav {
    height: 28px;
  }

  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    line-height: 32px;
  }

  &.el-tabs {
    --el-tabs-header-height: 28px;
  }
}

.Tabs-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
