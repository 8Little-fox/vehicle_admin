<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useContactMessageStore, useLoginStore } from '~/store'

const { currentProfile } = useLoginStore()
const { list } = useContactMessageStore()

const inbox = computed(() => {
  const me = currentProfile.value
  if (!me || me.role !== '学员')
    return []
  return [...list.value]
    .filter(m => (m.to_role === '学员' && m.to_id === me.id) || (m.from_role === '学员' && m.from_id === me.id))
    .sort((a, b) => b.time.localeCompare(a.time))
})
</script>

<template>
  <div class="space-y-4">
    <RouterLink
      to="/h5/ai"
      class="flex items-center justify-between rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-teal-800"
    >
      <span class="font-medium">AI 智能咨询</span>
      <span class="icon-[icon-park-outline--right]" />
    </RouterLink>
    <h2 class="text-sm font-semibold text-slate-700">
      联系教练 · 消息记录
    </h2>
    <div
      v-for="m in inbox.slice(0, 50)"
      :key="m.id"
      class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
    >
      <div class="text-xs text-slate-400">
        {{ m.time }} · {{ m.from_role }} → {{ m.to_role }}
      </div>
      <div class="mt-1 text-slate-700">
        {{ m.content }}
      </div>
    </div>
    <n-empty v-if="!inbox.length" description="暂无消息，可从教练详情页发送" />
  </div>
</template>
