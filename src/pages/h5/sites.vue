<script setup lang="ts">
import { useSiteStore } from '~/store'

const { dataList } = useSiteStore()
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm text-slate-600">
      练车场地信息（论文：查看场地信息功能模块）
    </p>
    <div
      v-for="s in dataList"
      :key="s.id"
      class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div class="font-medium text-slate-800">
        {{ s.site_name }}
      </div>
      <p class="mt-2 text-sm text-slate-600">
        {{ s.site_address }}
      </p>
      <p class="mt-2 text-xs text-slate-500">
        容纳约 {{ s.capacity }} 人 · 坐标 {{ s.longitude }}, {{ s.latitude }}
      </p>
      <p class="mt-2 text-sm leading-relaxed text-slate-600">
        {{ s.site_intro }}
      </p>
    </div>
  </div>
</template>
