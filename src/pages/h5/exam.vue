<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useExamApplyStore, useExamInfoStore, useLoginStore } from '~/store'

const message = useMessage()
const { dataList: exams } = useExamInfoStore()
const { list: applies, applyExam } = useExamApplyStore()
const { currentProfile } = useLoginStore()

function apply(eid: number) {
  const sid = currentProfile.value?.id
  if (sid == null) {
    message.error('请先登录')
    return
  }
  const res = applyExam({ student_id: sid, exam_id: eid })
  if (!res.ok) {
    message.error(res.message)
    return
  }
  message.success(res.message)
}

const myApplies = computed(() => {
  const sid = currentProfile.value?.id
  if (sid == null)
    return []
  return applies.value.filter(a => a.student_id === sid)
})
</script>

<template>
  <div class="space-y-4">
    <p class="text-sm text-slate-600">
      考试申请（论文：考试申请功能模块）
    </p>
    <div
      v-for="e in exams.filter(x => x.status === '可预约')"
      :key="e.id"
      class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div class="font-medium text-slate-800">
        {{ e.exam_name }}
      </div>
      <div class="mt-2 space-y-1 text-sm text-slate-600">
        <div>{{ e.exam_subject }} · {{ e.exam_type }}</div>
        <div>{{ e.exam_date }} {{ e.exam_address }}</div>
        <div>名额 {{ e.booked_num }}/{{ e.max_num }}</div>
      </div>
      <n-button class="mt-3 w-full" type="primary" :disabled="e.booked_num >= e.max_num" @click="apply(e.id)">
        申请考试
      </n-button>
    </div>
    <n-divider>我的考试申请</n-divider>
    <div v-for="a in myApplies" :key="a.id" class="mb-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
      考试 #{{ a.exam_id }} · {{ a.status }} · {{ a.apply_date }}
    </div>
    <n-empty v-if="!myApplies.length" description="暂无申请记录" />
  </div>
</template>
