<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useLoginStore, usePracticeBookingStore, useSiteStore, useTrainingProjectStore } from '~/store'

const message = useMessage()
const { currentProfile } = useLoginStore()
const { dataList: projects } = useTrainingProjectStore()
const { dataList: sites } = useSiteStore()
const { submitBooking } = usePracticeBookingStore()

const remark = ref('')

function siteName(id: number) {
  return sites.value.find(s => s.id === id)?.site_name ?? '-'
}

function book(p: (typeof projects.value)[0]) {
  const sid = currentProfile.value?.id
  if (sid == null) {
    message.error('请先登录')
    return
  }
  const res = submitBooking({
    student_id: sid,
    project_id: p.id,
    coach_id: p.coach_id,
    remark: remark.value,
  })
  if (!res.ok) {
    message.error(res.message)
    return
  }
  message.success(res.message)
  remark.value = ''
}
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm text-slate-600">
      选择可预约练车项目，提交后状态为「待审核」，与论文练车预约流程一致。
    </p>
    <n-input v-model:value="remark" type="textarea" placeholder="备注（可选）" :rows="2" class="rounded-xl" />
    <div
      v-for="p in projects.filter(x => x.status === '可预约')"
      :key="p.id"
      class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div class="font-medium text-slate-800">
        {{ p.project_name }}
      </div>
      <div class="mt-2 space-y-1 text-sm text-slate-600">
        <div>科目 {{ p.subject }} · 车型 {{ p.car_type }}</div>
        <div>{{ p.train_date }} {{ p.train_time }}</div>
        <div>场地 {{ siteName(p.site_id) }}</div>
        <div>名额 {{ p.booked_num }}/{{ p.max_num }}</div>
      </div>
      <n-button
        class="mt-3 w-full"
        type="primary"
        :disabled="p.booked_num >= p.max_num"
        @click="book(p)"
      >
        立即预约
      </n-button>
    </div>
    <n-empty v-if="!projects.filter(x => x.status === '可预约').length" description="暂无可约项目" />
  </div>
</template>
