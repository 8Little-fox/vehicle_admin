<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTeachingResourceStore } from '~/store'

const { dataList } = useTeachingResourceStore()
</script>

<template>
  <div class="space-y-2">
    <p class="px-1 text-sm text-slate-600">
      教学资源列表，点击进入详情（论文：点击量统计）
    </p>
    <RouterLink
      v-for="r in dataList"
      :key="r.id"
      :to="`/h5/teaching/${r.id}`"
      class="flex items-center justify-between rounded-xl bg-white px-3 py-3 shadow-sm active:bg-slate-50"
    >
      <div>
        <div class="font-medium text-slate-900">
          {{ r.resource_name }}
        </div>
        <div class="mt-1 text-xs text-slate-500">
          {{ r.resource_type }} · {{ r.click_num }} 浏览
        </div>
      </div>
      <span class="icon-[icon-park-outline--right] text-slate-300" />
    </RouterLink>
  </div>
</template>
