<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import { h } from 'vue'
import { useExamApplyStore, useExamInfoStore, useStudentStore } from '~/store'

const { list, setApplyStatus } = useExamApplyStore()
const { dataList: exams } = useExamInfoStore()
const { dataList: students } = useStudentStore()

function st(id: number) {
  return students.value.find(s => s.id === id)?.name ?? id
}
function ex(id: number) {
  return exams.value.find(e => e.id === id)?.exam_name ?? id
}

const columns = [
  { title: '学员', key: 'student_id', render: (row: { student_id: number }) => st(row.student_id) },
  { title: '考试', key: 'exam_id', render: (row: { exam_id: number }) => ex(row.exam_id) },
  { title: '申请日', key: 'apply_date' },
  { title: '状态', key: 'status' },
  {
    title: '审核',
    key: 'a',
    render: (row: { id: number, status: string }) => {
      if (row.status !== '待审核')
        return '-'
      return h(NSpace, () => [
        h(NButton, { size: 'small', type: 'success', onClick: () => setApplyStatus(row.id, '已通过') }, '通过'),
        h(NButton, { size: 'small', type: 'error', onClick: () => setApplyStatus(row.id, '已驳回', '名额调整') }, '驳回'),
      ])
    },
  },
]
</script>

<template>
  <div>
    <h3 class="mb-4 text-lg font-semibold">
      考试申请管理
    </h3>
    <n-data-table :columns="columns" :data="list" :row-key="(r: { id: number }) => r.id" />
  </div>
</template>
