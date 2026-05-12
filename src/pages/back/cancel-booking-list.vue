<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import { h } from 'vue'
import { useCancelBookingStore, useStudentStore } from '~/store'

const { list, setStatus } = useCancelBookingStore()
const { dataList: students } = useStudentStore()

function st(id: number) {
  return students.value.find(s => s.id === id)?.name ?? id
}

const columns = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '学员', key: 'student_id', render: (row: { student_id: number }) => st(row.student_id) },
  { title: '预约ID', key: 'appoint_id' },
  { title: '原因', key: 'cancel_reason' },
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
      取消预约管理
    </h3>
    <n-data-table :columns="columns" :data="list" :row-key="(r: { id: number }) => r.id" />
  </div>
</template>
