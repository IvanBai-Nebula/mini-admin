import type { LoginRecord, User } from '@/types/user'
import { getAdminProfile } from '@/api/user'

// 用户模块
export const useUserStore = defineStore(
  'user',
  () => {
    // 定义 token
    const token: Ref<string> = ref('') // 定义 token
    const setToken = t => (token.value = t) // 设置 token
    const removeToken = () => (token.value = '')
    // 记住密码
    const loginRecord: Ref<LoginRecord> = ref({})
    const setLoginRecord = (record: LoginRecord) => {
      loginRecord.value = record.remember ? record : {}
    }
    // 登录状态
    // 获取用户信息
    const user: Ref<User> = ref({})
    const getUser = async () => {
      const res = await getAdminProfile() // 请求获取数据
      user.value = res.data.data
    }

    return { token, setToken, removeToken, loginRecord, setLoginRecord, user, getUser }
  },
  {
    persist: true, // 持久化
  },
)
