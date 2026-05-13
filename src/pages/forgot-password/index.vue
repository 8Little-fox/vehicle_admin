<script setup lang="ts">
import type { RoleType } from '~/types/driving-school'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
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
  <div class="relative flex min-h-screen items-center justify-center overflow-y-auto bg-slate-100 px-4 py-10 sm:px-8">
    <div class="relative z-10 my-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
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
