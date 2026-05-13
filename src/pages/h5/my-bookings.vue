<script setup lang="ts">
import { useCancelBookingStore, useLoginStore, usePracticeBookingStore, useTrainingProjectStore } from '~/store'

const { currentProfile } = useLoginStore()
const { list: bookings } = usePracticeBookingStore()
const { dataList: projects } = useTrainingProjectStore()
const { list: cancels } = useCancelBookingStore()

const mine = computed(() => {
  const sid = currentProfile.value?.id
  if (sid == null)
    return []
  return [...bookings.value].filter(b => b.student_id === sid).sort((a, b) => b.id - a.id)
})

function cancelRowFor(appointId: number) {
  return cancels.value.find(c => c.appoint_id === appointId)
}

function name(pid: number) {
  return projects.value.find(p => p.id === pid)?.project_name ?? `#${pid}`
}
</script>

<template>
  <div class="space-y-2">
    <p class="rounded-lg bg-white px-3 py-2 text-[13px] text-slate-600 shadow-sm">
      练车预约记录；取消申请状态见每条下方标签。
    </p>
    <div
      v-for="b in mine"
      :key="b.id"
      class="rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm"
    >
      <div class="flex items-start justify-between gap-2">
        <div>
          <div class="text-[15px] font-medium text-slate-900">
            {{ name(b.project_id) }}
          </div>
          <div class="mt-1 text-xs text-slate-500">
            预约日 {{ b.appoint_date }}
          </div>
        </div>
        <n-tag size="small" :type="b.status === '已通过' ? 'success' : b.status === '待审核' ? 'warning' : 'default'">
          {{ b.status }}
        </n-tag>
      </div>
      <p v-if="b.remark" class="mt-2 text-xs text-slate-400">
        备注：{{ b.remark }}
      </p>
      <div v-if="cancelRowFor(b.id)" class="mt-2 flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5 text-xs">
        <span class="text-slate-600">取消申请</span>
        <n-tag size="small" :type="cancelRowFor(b.id)!.status === '已通过' ? 'success' : cancelRowFor(b.id)!.status === '已驳回' ? 'error' : 'warning'">
          <span>{{ cancelRowFor(b.id)!.status }}</span>
        </n-tag>
      </div>
    </div>
    <n-empty v-if="!mine.length" description="暂无预约" />
  </div>
</template>
