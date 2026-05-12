<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { useLoginStore } from '~/store'

function renderIcon(icon: string) {
  return () => h('span', { class: icon })
}

const { currentProfile, logout } = useLoginStore()
const router = useRouter()

const menuOptions: MenuOption[] = [
  { label: () => h(RouterLink, { to: '/coach' }, '教练首页'), key: 'ch-home', icon: renderIcon('icon-[icon-park-outline--home-two]') },
  { label: () => h(RouterLink, { to: '/coach/vehicle-apply' }, '车辆申请'), key: 'veh', icon: renderIcon('icon-[icon-park-outline--car]') },
  { label: () => h(RouterLink, { to: '/coach/projects' }, '练车项目管理'), key: 'proj', icon: renderIcon('icon-[icon-park-outline--calendar]') },
  { label: () => h(RouterLink, { to: '/coach/messages' }, '联系学员'), key: 'msg', icon: renderIcon('icon-[icon-park-outline--message]') },
]

function handelLogout() {
  logout()
  router.push('/login')
}
</script>

<template>
  <n-layout has-sider class="min-h-screen">
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="220">
      <div class="px-4 py-5 text-lg font-bold text-teal-700">
        教练端
      </div>
      <n-menu :options="menuOptions" :collapsed-width="64" :collapsed-icon-size="22" />
    </n-layout-sider>
    <n-layout>
      <div class="flex flex-col overflow-auto px-4 py-2">
        <header class="flex justify-between border-b border-slate-100 pb-2">
          <span class="text-slate-600">{{ currentProfile?.displayName }}（{{ currentProfile?.username }}）</span>
          <n-popconfirm @positive-click="handelLogout">
            <template #trigger>
              <n-button quaternary>
                退出
              </n-button>
            </template>
            确认退出？
          </n-popconfirm>
        </header>
        <div class="flex-1 py-4">
          <RouterView />
        </div>
      </div>
    </n-layout>
  </n-layout>
</template>
