<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCoachStore } from '~/store'

const { dataList, updateData } = useCoachStore()

function bumpClick(row: (typeof dataList.value)[0]) {
  const i = dataList.value.findIndex(x => x.id === row.id)
  if (i < 0)
    return
  updateData(i, { ...row, click_num: row.click_num + 1 })
}
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm text-slate-600">
      查看教练信息（论文：查看教练信息功能模块）
    </p>
    <RouterLink
      v-for="c in dataList"
      :key="c.id"
      :to="`/h5/coach/${c.id}`"
      class="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm active:bg-slate-50"
      @click="bumpClick(c)"
    >
      <img
        v-if="c.avatar"
        :src="c.avatar"
        alt=""
        class="h-14 w-14 shrink-0 rounded-full border border-slate-200 object-cover"
      >
      <div
        v-else
        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-700"
      >
        {{ c.name.slice(0, 1) }}
      </div>
      <div class="min-w-0 flex-1">
        <div class="font-medium text-slate-800">
          {{ c.name }}
        </div>
        <p class="mt-1 line-clamp-2 text-xs text-slate-500">
          {{ c.intro }}
        </p>
        <p class="mt-1 text-xs text-slate-400">
          教龄 {{ c.teach_age }} 年 · 浏览 {{ c.click_num }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>
