<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { postAdminLogin } from '@/api/user/login'
import { useTabsStore, useUserStore } from '@/store'
import { decrypt } from '@/utils/encrypt'
import { Lock } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const defParam = userStore.loginRecord || {}
const checked: Ref<boolean> = ref(!!defParam)

interface LoginInfo {
  username: string
  password: string
}

const param = reactive<LoginInfo>({
  username: defParam.username || '',
  password: defParam.password || '',
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
const login = ref<FormInstance>()

function submitForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      if (defParam) {
        param.password = decrypt(defParam.password)
      }
      const res = await postAdminLogin(param)
      userStore.setToken(res.token)
      userStore.setUser(res.data)

      if (checked.value) {
        userStore.setLoginRecord(param)
      }
      else {
        userStore.removeLoginRecord()
      }

      ElMessage.success('登录成功')
      await router.push('/')
    }
  })
}

const tabs = useTabsStore()
tabs.clearTabs()
</script>

<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-header">
        <img class="logo mr10" src="@/assets/img/logo.svg" alt="">
        <div class="login-title">
          照护日记管理系统
        </div>
      </div>
      <el-form ref="login" :model="param" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名">
            <template #prepend>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="param.password"
            type="password"
            placeholder="密码"
            @keyup.enter="submitForm(login)"
          >
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="pwd-tips">
          <el-checkbox v-model="checked" class="pwd-checkbox" label="记住密码" />
          <el-link type="primary" @click="$router.push('/reset-pwd')">
            忘记密码
          </el-link>
        </div>
        <el-button class="login-btn" type="primary" size="large" @click="submitForm(login)">
          登录
        </el-button>
        <p class="login-tips">
          Tips : 用户名和密码随便填。
        </p>
        <p class="login-text">
          没有账号？
          <el-link type="primary" @click="$router.push('/register')">
            立即注册
          </el-link>
        </p>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url(../../assets/img/login-bg.jpg) center/cover no-repeat;
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.logo {
  width: 35px;
}

.login-title {
  font-size: 22px;
  color: #333;
  font-weight: bold;
}

.login-container {
  width: 450px;
  border-radius: 5px;
  background: #fff;
  padding: 40px 50px 50px;
  box-sizing: border-box;
}

.pwd-tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin: -10px 0 10px;
  color: #787878;
}

.pwd-checkbox {
  height: auto;
}

.login-btn {
  display: block;
  width: 100%;
}

.login-tips {
  font-size: 12px;
  color: #999;
}

.login-text {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #787878;
}
</style>
