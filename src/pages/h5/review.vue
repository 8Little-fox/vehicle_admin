<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useCoachStore, useDrivingReviewStore, useLoginStore } from '~/store'

const message = useMessage()
const { currentProfile } = useLoginStore()
const { dataList: coaches } = useCoachStore()
const { list, upsertStudentReview } = useDrivingReviewStore()

const coachId = ref<number | null>(coaches.value[0]?.id ?? null)
const star = ref(5)
const comment = ref('')

const existing = computed(() => {
  const sid = currentProfile.value?.id
  if (sid == null || coachId.value == null)
    return null
  return list.value.find(r => r.student_id === sid && r.coach_id === coachId.value)
})

function submit() {
  const sid = currentProfile.value?.id
  if (sid == null || coachId.value == null) {
    message.error('请选择教练')
    return
  }
  upsertStudentReview({
    student_id: sid,
    coach_id: coachId.value,
    student_star: star.value,
    student_comment: comment.value.trim() || '满意',
  })
  message.success('评价已保存（双向评价数据写入本地缓存）')
}
</script>

<template>
  <div class="space-y-4 rounded-xl bg-white p-4 shadow-sm">
    <p class="text-sm text-slate-600">
      学员对教练的星级与文字评价（论文：评价功能模块）
    </p>
    <n-select
      v-model:value="coachId"
      :options="coaches.map(c => ({ label: c.name, value: c.id }))"
      placeholder="选择教练"
    />
    <div>
      <div class="mb-1 text-sm text-slate-600">
        星级
      </div>
      <n-rate v-model:value="star" />
    </div>
    <n-input v-model:value="comment" type="textarea" placeholder="评价内容" :rows="3" />
    <n-button type="primary" block @click="submit">
      提交评价
    </n-button>
    <n-divider />
    <div v-if="existing" class="text-sm text-slate-600">
      <div>当前记录：学员 {{ existing.student_star }} 星</div>
      <div class="mt-1">
        {{ existing.student_comment }}
      </div>
      <div v-if="existing.coach_comment" class="mt-2 border-t border-slate-100 pt-2">
        教练回复：{{ existing.coach_comment }}
      </div>
    </div>
  </div>
</template>
