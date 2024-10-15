import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import router from '@/router'
import { useUserStore } from '@/store'
import axios from 'axios'

const baseURL = 'http://192.168.3.111:8000/'

const instance: AxiosInstance = axios.create({
// 基地址，超时时间
  baseURL,
  timeout: 10000,
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //  携带token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = `Bearer ${useStore.token}`
    }
    return config
  },
  error => Promise.reject(error),
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.success) {
      return response.data
    }
    // 处理业务失败
    else {
      ElMessage.error(response.data.msg || '服务异常')
      return Promise.reject(response.data)
    }
  },
  (error) => {
    // 处理401错误
    // 错误的特殊情况（权限不足，登录过期）
    if (error.response) {
      if (error.response.status === 401) {
        router.push('/login').then()
      }
    }
    ElMessage.error('服务异常')
    return Promise.reject(error)
  },
)

export default instance
export { baseURL }
