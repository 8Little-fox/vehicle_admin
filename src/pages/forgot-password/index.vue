<script setup lang="ts">
import type { RoleType } from '~/types/driving-school'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AUTH_PAGE_BG_URL } from '~/constants/auth-page-bg'
import { useLoginStore } from '~/store'

const router = useRouter()
const message = useMessage()
const { resetPassword } = useLoginStore()

const form = reactive({
  role: '学员' as RoleType,
  account: '',
  newPassword: '',
  confirm: '',
})
const loading = ref(false)

function submit() {
  if (!form.account.trim() || !form.newPassword) {
    message.warning('请填写账号与新密码')
    return
  }
  if (form.newPassword !== form.confirm) {
    message.error('两次输入的新密码不一致')
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    const res = resetPassword(form.role, form.account.trim(), form.newPassword)
    if (!res.ok) {
      message.error(res.message || '重置失败')
      return
    }
    message.success(res.message || '已重置')
    router.replace('/login')
  }, 200)
}
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-end overflow-y-auto bg-slate-800 bg-cover bg-center bg-no-repeat px-4 py-10 sm:px-8 md:pr-16 lg:pr-24"
    :style="{ backgroundImage: `url(${AUTH_PAGE_BG_URL})` }"
  >
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />
    <div class="relative z-10 my-auto w-full max-w-md rounded-2xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-md sm:p-10">
      <h1 class="mb-2 text-center text-xl font-semibold text-slate-800">
        找回密码
      </h1>
      <n-space vertical :size="12">
        <n-radio-group v-model:value="form.role" name="role">
          <n-space>
            <n-radio value="学员">
              学员
            </n-radio>
            <n-radio value="教练">
              教练
            </n-radio>
            <n-radio value="管理员">
              管理员
            </n-radio>
          </n-space>
        </n-radio-group>
        <n-input v-model:value="form.account" placeholder="登录账号" />
        <n-input v-model:value="form.newPassword" type="password" show-password-on="click" placeholder="新密码" />
        <n-input v-model:value="form.confirm" type="password" show-password-on="click" placeholder="确认新密码" />
        <n-space justify="space-between">
          <n-button @click="router.push('/login')">
            返回登录
          </n-button>
          <n-button type="primary" :loading="loading" @click="submit">
            重置密码
          </n-button>
        </n-space>
      </n-space>
    </div>
  </div>
</template>
