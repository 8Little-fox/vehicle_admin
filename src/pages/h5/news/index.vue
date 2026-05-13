<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useNewsStore } from '~/store'

const { dataList: news } = useNewsStore()
</script>

<template>
  <div class="space-y-2">
    <h1 class="px-1 text-base font-semibold text-slate-900">
      全部公告
    </h1>
    <RouterLink
      v-for="n in news"
      :key="n.id"
      :to="`/h5/news/${n.id}`"
      class="flex gap-3 rounded-xl bg-white p-3 shadow-sm active:bg-slate-50"
    >
      <div
        class="h-16 w-20 shrink-0 rounded-lg bg-slate-100"
        :style="n.cover ? { backgroundImage: `url(${n.cover})`, backgroundSize: 'cover' } : {}"
      />
      <div class="min-w-0">
        <div class="font-medium text-slate-900">
          {{ n.title }}
        </div>
        <p class="mt-1 text-xs text-slate-500">
          {{ n.publish_time }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>
