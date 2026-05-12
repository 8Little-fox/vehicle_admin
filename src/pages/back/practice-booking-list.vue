<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import { h } from 'vue'
import {
  useCoachStore,
  usePracticeBookingStore,
  useStudentStore,
  useTrainingProjectStore,
} from '~/store'

const { list, setStatus } = usePracticeBookingStore()
const { dataList: students } = useStudentStore()
const { dataList: coaches } = useCoachStore()
const { dataList: projects } = useTrainingProjectStore()

function st(id: number) {
  return students.value.find(s => s.id === id)?.name ?? id
}
function co(id: number) {
  return coaches.value.find(c => c.id === id)?.name ?? id
}
function pj(id: number) {
  return projects.value.find(p => p.id === id)?.project_name ?? id
}

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '学员', key: 'student_id', render: (row: { student_id: number }) => st(row.student_id) },
  { title: '项目', key: 'project_id', render: (row: { project_id: number }) => pj(row.project_id) },
  { title: '教练', key: 'coach_id', render: (row: { coach_id: number }) => co(row.coach_id) },
  { title: '预约日', key: 'appoint_date' },
  { title: '状态', key: 'status' },
  {
    title: '审核',
    key: 'a',
    render: (row: { id: number, status: string }) => {
      if (row.status !== '待审核')
        return '-'
      return h(NSpace, () => [
        h(NButton, { size: 'small', type: 'success', onClick: () => setStatus(row.id, '已通过') }, '通过'),
        h(NButton, { size: 'small', type: 'error', onClick: () => setStatus(row.id, '已驳回') }, '驳回'),
      ])
    },
  },
]
</script>

<template>
  <div>
    <h3 class="mb-4 text-lg font-semibold">
      练车预约管理
    </h3>
    <n-data-table :columns="columns" :data="list" :row-key="(r: { id: number }) => r.id" />
  </div>
</template>
