<script setup lang="ts">
import type { FormOption, FormOptionList } from '@/types/form-option'
import type { User } from '@/types/user'
import { getCustomerList } from '@/api/system'
import TableCustom from '@/components/table-custom.vue'
import TableDetail from '@/components/table-detail.vue'
import TableSearch from '@/components/table-search.vue'
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

// 查询相关
const query = reactive({
  name: '',
})
const searchOpt = ref<FormOptionList[]>([
  { type: 'input', label: '用户名：', prop: 'name' },
])
function handleSearch() {
  changePage(1)
}

// 表格相关
const columns = ref([
  { type: 'index', label: '序号', width: 55, align: 'center' },
  { prop: 'name', label: '用户名' },
  { prop: 'phone', label: '手机号' },
  { prop: 'role', label: '角色' },
  { prop: 'operator', label: '操作', width: 250 },
])
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
})
const tableData = ref<User[]>([])
async function getData() {
  const res = await getCustomerList()
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
  span: 12,
  list: [
    { type: 'input', label: '用户名', prop: 'name', required: true },
    { type: 'input', label: '手机号', prop: 'phone', required: true },
    { type: 'input', label: '密码', prop: 'password', required: true },
    { type: 'input', label: '邮箱', prop: 'email', required: true },
    { type: 'input', label: '角色', prop: 'role', required: true },
  ],
})
const visible = ref(false)
const isEdit = ref(false)
const rowData = ref({})
function handleEdit(row: User) {
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
}

// 查看详情弹窗相关
const visible1 = ref(false)
const viewData = ref({
  row: {},
  list: [],
})
function handleView(row: User) {
  viewData.value.row = { ...row }
  viewData.value.list = [
    {
      prop: 'id',
      label: '用户ID',
    },
    {
      prop: 'name',
      label: '用户名',
    },
    {
      prop: 'password',
      label: '密码',
    },
    {
      prop: 'email',
      label: '邮箱',
    },
    {
      prop: 'phone',
      label: '电话',
    },
    {
      prop: 'role',
      label: '角色',
    },
    {
      prop: 'date',
      label: '注册日期',
    },
  ]
  visible1.value = true
}

// 删除相关
function handleDelete(row: User) {
  remove(row)
  ElMessage.success('删除成功')
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
      </TableCustom>
    </div>
    <el-dialog
      v-model="visible" :title="isEdit ? '编辑' : '新增'" width="700px" destroy-on-close
      :close-on-click-modal="false" @close="closeDialog"
    >
      <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData" />
    </el-dialog>
    <el-dialog v-model="visible1" title="查看详情" width="700px" destroy-on-close>
      <TableDetail :data="viewData" />
    </el-dialog>
  </div>
</template>

<style scoped></style>
