<script lang="ts" setup>
import { watchImmediate } from '@vueuse/core'
import { useLoginStore } from '~/store'

const router = useRouter()
const login = useLoginStore()
login.hydrateSessionFromStorage()
const { isLogin, currentRole } = login

watchImmediate([isLogin, currentRole], () => {
  if (!isLogin.value) {
    router.replace('/login')
    return
  }
  const r = currentRole.value
  router.replace(r === '管理员' ? '/back' : r === '教练' ? '/coach' : '/h5/home')
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
    正在进入驾校管理系统…
  </div>
</template>
