<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useNewsStore } from '~/store'

const { dataList: news } = useNewsStore()
</script>

<template>
  <div class="space-y-4">
    <section class="overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 px-4 py-5 text-white shadow-lg">
      <p class="text-sm opacity-90">
        欢迎使用驾校管理系统
      </p>
      <p class="mt-1 text-lg font-semibold">
        首页资讯 · 预约练车 · 考试申请
      </p>
      <div class="mt-4 flex flex-wrap gap-2">
        <RouterLink
          to="/h5/book"
          class="rounded-full bg-white/20 px-3 py-1.5 text-sm backdrop-blur"
        >
          预约练车
        </RouterLink>
        <RouterLink
          to="/h5/coaches"
          class="rounded-full bg-white/20 px-3 py-1.5 text-sm backdrop-blur"
        >
          查看教练
        </RouterLink>
        <RouterLink
          to="/h5/sites"
          class="rounded-full bg-white/20 px-3 py-1.5 text-sm backdrop-blur"
        >
          场地信息
        </RouterLink>
        <RouterLink
          to="/h5/ai"
          class="rounded-full bg-white/20 px-3 py-1.5 text-sm backdrop-blur"
        >
          AI 咨询
        </RouterLink>
      </div>
    </section>

    <h2 class="text-sm font-semibold text-slate-700">
      公告资讯
    </h2>
    <RouterLink
      v-for="n in news"
      :key="n.id"
      :to="`/h5/news/${n.id}`"
      class="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm active:bg-slate-50"
    >
      <div class="text-base font-medium text-slate-800">
        {{ n.title }}
      </div>
      <p class="mt-1 line-clamp-2 text-sm text-slate-500">
        {{ n.summary }}
      </p>
      <p class="mt-2 text-xs text-slate-400">
        {{ n.publish_time }}
      </p>
    </RouterLink>
  </div>
</template>
