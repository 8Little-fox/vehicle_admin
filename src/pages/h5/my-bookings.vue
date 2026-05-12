<script setup lang="ts">
import { useLoginStore, usePracticeBookingStore, useTrainingProjectStore } from '~/store'

const { currentProfile } = useLoginStore()
const { list: bookings } = usePracticeBookingStore()
const { dataList: projects } = useTrainingProjectStore()

const mine = computed(() => {
  const sid = currentProfile.value?.id
  if (sid == null)
    return []
  return [...bookings.value].filter(b => b.student_id === sid).sort((a, b) => b.id - a.id)
})

function name(pid: number) {
  return projects.value.find(p => p.id === pid)?.project_name ?? `#${pid}`
}
</script>

<template>
  <div class="space-y-3">
    <div v-for="b in mine" :key="b.id" class="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
      <div class="font-medium text-slate-800">
        {{ name(b.project_id) }}
      </div>
      <div class="mt-2 text-slate-600">
        预约日 {{ b.appoint_date }} · 状态 <n-tag size="small" type="info">
          {{ b.status }}
        </n-tag>
      </div>
      <p v-if="b.remark" class="mt-1 text-xs text-slate-500">
        备注：{{ b.remark }}
      </p>
    </div>
    <n-empty v-if="!mine.length" description="暂无预约" />
  </div>
</template>
