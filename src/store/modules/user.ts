import type { LoginRecord, User } from '@/types/user'
import { encrypt } from '@/utils/encrypt'

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
      loginRecord.value.username = record.username
      loginRecord.value.password = encrypt(record.password)
    }
    const removeLoginRecord = () => {
      loginRecord.value = {}
    }
    // 用户信息
    const user: Ref<User> = ref({})
    const setUser = (u: User) => {
      user.value = u
    }
    const resetUser = () => {
      user.value = {}
    }
    // 退出登录
    const logout = () => {
      removeToken()
      resetUser()
    }
    return { token, setToken, removeToken, loginRecord, setLoginRecord, removeLoginRecord, user, setUser, resetUser, logout }
  },
  {
    persist: true, // 持久化
  },
)
