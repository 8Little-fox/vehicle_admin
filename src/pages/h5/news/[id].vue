<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useNewsStore } from '~/store'

const route = useRoute()
const id = computed(() => Number(route.params.id))
const { dataList } = useNewsStore()
const item = computed(() => dataList.value.find(x => x.id === id.value))
</script>

<template>
  <div v-if="item" class="rounded-xl bg-white p-4 shadow-sm">
    <h1 class="text-lg font-semibold text-slate-800">
      {{ item.title }}
    </h1>
    <p class="mt-2 text-xs text-slate-400">
      {{ item.publish_time }}
    </p>
    <p class="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
      {{ item.content }}
    </p>
  </div>
  <n-empty v-else description="资讯不存在" />
</template>
