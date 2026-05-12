<script setup lang="ts">
import type { DrivingReview } from '~/types/driving-school'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import { useCoachStore, useDrivingReviewStore, useStudentStore } from '~/store'

const { list, updateCoachFeedback } = useDrivingReviewStore()
const { dataList: students } = useStudentStore()
const { dataList: coaches } = useCoachStore()

const show = ref(false)
const editing = ref<DrivingReview | null>(null)
const coachReply = ref('')
const coachStar = ref(5)
const coachComment = ref('')

function st(id: number) {
  return students.value.find(s => s.id === id)?.name ?? id
}
function co(id: number) {
  return coaches.value.find(c => c.id === id)?.name ?? id
}

function openEdit(row: DrivingReview) {
  editing.value = row
  coachReply.value = row.coach_reply
  coachStar.value = row.coach_star || 5
  coachComment.value = row.coach_comment
  show.value = true
}

function save() {
  if (!editing.value)
    return
  updateCoachFeedback(editing.value.id, {
    coach_star: coachStar.value,
    coach_comment: coachComment.value,
    coach_reply: coachReply.value,
  })
  show.value = false
}

const columns = [
  { title: '学员', key: 'student_id', render: (row: DrivingReview) => st(row.student_id) },
  { title: '教练', key: 'coach_id', render: (row: DrivingReview) => co(row.coach_id) },
  { title: '学员星', key: 'student_star' },
  { title: '教练星', key: 'coach_star' },
  {
    title: '操作',
    key: 'a',
    render: (row: DrivingReview) =>
      h(ActionButton, {
        isDel: false,
        onEdit: () => openEdit(row),
      }),
  },
]
</script>

<template>
  <div>
    <h3 class="mb-4 text-lg font-semibold">
      评价管理（双向评价）
    </h3>
    <n-data-table :columns="columns" :data="list" :row-key="(r: DrivingReview) => r.id" />
    <BackCrudModal v-model:show="show" title="编辑教练侧评价" @confirm="save" @cancel="show = false">
      <n-form label-width="100px">
        <n-form-item label="教练评分">
          <n-rate v-model:value="coachStar" />
        </n-form-item>
        <n-form-item label="教练评价">
          <n-input v-model:value="coachComment" type="textarea" :rows="2" />
        </n-form-item>
        <n-form-item label="教练回复">
          <n-input v-model:value="coachReply" type="textarea" :rows="2" />
        </n-form-item>
      </n-form>
    </BackCrudModal>
  </div>
</template>
