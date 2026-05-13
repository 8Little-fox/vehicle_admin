<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useTeachingResourceStore } from '~/store'

const route = useRoute()
const id = computed(() => Number(route.params.id))
const { dataList, recordClick } = useTeachingResourceStore()
const item = computed(() => dataList.value.find(x => x.id === id.value))

onMounted(() => {
  if (id.value)
    recordClick(id.value)
})
</script>

<template>
  <article v-if="item" class="rounded-xl bg-white p-4 shadow-sm">
    <h1 class="text-lg font-semibold text-slate-900">
      {{ item.resource_name }}
    </h1>
    <p class="mt-2 text-xs text-slate-400">
      {{ item.resource_type }} · 浏览 {{ item.click_num }} 次
    </p>
    <n-divider class="!my-3" />
    <p class="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
      {{ item.resource_content }}
    </p>
    <p v-if="item.resource_file" class="mt-4 text-xs text-[#576b95]">
      附件：{{ item.resource_file }}
    </p>
  </article>
  <n-empty v-else description="资源不存在" />
</template>
