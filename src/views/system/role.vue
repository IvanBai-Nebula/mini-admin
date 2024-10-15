<script setup lang="ts" name="system-role">
import type { FormOption, FormOptionList } from '@/types/form-option'
import type { Role } from '@/types/role'
import { getRoleList } from '@/api/system'
import TableCustom from '@/components/table-custom.vue'
import TableDetail from '@/components/table-detail.vue'
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import RolePermission from './role-permission.vue'

// 查询相关
const query = reactive({
  name: '',
})
const searchOpt = ref<FormOptionList[]>([
  { type: 'input', label: '角色名称：', prop: 'name' },
])
function handleSearch() {
  changePage(1)
}

// 表格相关
const columns = ref([
  { type: 'index', label: '序号', width: 55, align: 'center' },
  { prop: 'name', label: '角色名称' },
  { prop: 'key', label: '角色标识' },
  { prop: 'status', label: '状态' },
  { prop: 'permissions', label: '权限管理' },
  { prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const tableData = ref<Role[]>([])
async function getData() {
  const res = await getRoleList()
  tableData.value = res.data.list
  page.total = res.data.pageTotal
}
getData()
function changePage(val: number) {
  page.index = val
  getData()
}

// 新增/编辑弹窗相关
const options = ref<FormOption>({
  labelWidth: '100px',
  span: 24,
  list: [
    { type: 'input', label: '角色名称', prop: 'name', required: true },
    { type: 'input', label: '角色标识', prop: 'key', required: true },
    { type: 'switch', label: '状态', prop: 'status', required: false, activeText: '启用', inactiveText: '禁用' },
  ],
})
const visible = ref(false)
const isEdit = ref(false)
const rowData = ref({})
function handleEdit(row: Role) {
  rowData.value = { ...row }
  isEdit.value = true
  visible.value = true
}
function updateData() {
  closeDialog()
  getData()
}
function closeDialog() {
  visible.value = false
  isEdit.value = false
  rowData.value = {}
}

// 查看详情弹窗相关
const visible1 = ref(false)
const viewData = ref({
  row: {},
  list: [],
  column: 1,
})
function handleView(row: Role) {
  viewData.value.row = { ...row }
  viewData.value.list = [
    {
      prop: 'id',
      label: '角色ID',
    },
    {
      prop: 'name',
      label: '角色名称',
    },
    {
      prop: 'key',
      label: '角色标识',
    },
    {
      prop: 'status',
      label: '角色状态',
    },
  ]
  visible1.value = true
}

// 删除相关
function handleDelete(row: Role) {
  ElMessage.success('删除成功')
}

// 权限管理弹窗相关
const visible2 = ref(false)
const permissOptions = ref({})
function handlePermission(row: Role) {
  visible2.value = true
  permissOptions.value = {
    id: row.id,
    permiss: row.permiss,
  }
}
</script>

<template>
  <div>
    <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    <div class="container">
      <TableCustom
        :columns="columns" :table-data="tableData" :total="page.total" :view-func="handleView"
        :del-func="handleDelete" :page-change="changePage" :edit-func="handleEdit"
      >
        <template #toolbarBtn>
          <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">
            新增
          </el-button>
        </template>
        <template #status="{ rows }">
          <el-tag v-if="rows.status" type="success">
            启用
          </el-tag>
          <el-tag v-else type="danger">
            禁用
          </el-tag>
        </template>
        <template #permissions="{ rows }">
          <el-button type="primary" size="small" plain @click="handlePermission(rows)">
            管理
          </el-button>
        </template>
      </TableCustom>
    </div>
    <el-dialog
      v-model="visible" :title="isEdit ? '编辑' : '新增'" width="700px" destroy-on-close
      :close-on-click-modal="false" @close="closeDialog"
    >
      <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData" />
    </el-dialog>
    <el-dialog v-model="visible1" title="查看详情" width="700px" destroy-on-close>
      <TableDetail :data="viewData">
        <template #status="{ rows }">
          <el-tag v-if="rows.status" type="success">
            启用
          </el-tag>
          <el-tag v-else type="danger">
            禁用
          </el-tag>
        </template>
      </TableDetail>
    </el-dialog>
    <el-dialog v-model="visible2" title="权限管理" width="500px" destroy-on-close>
      <RolePermission :permiss-options="permissOptions" />
    </el-dialog>
  </div>
</template>

<style scoped></style>
