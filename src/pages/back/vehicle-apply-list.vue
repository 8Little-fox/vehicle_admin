<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import { h } from 'vue'
import { useCoachStore, useVehicleApplicationStore, useVehicleStore } from '~/store'

const { list, setStatus } = useVehicleApplicationStore()
const { dataList: vehicles } = useVehicleStore()
const { dataList: coaches } = useCoachStore()

function vname(id: number) {
  return vehicles.value.find(v => v.id === id)?.car_name ?? id
}
function cname(id: number) {
  return coaches.value.find(c => c.id === id)?.name ?? id
}

const columns = [
  { title: '车辆', key: 'car_id', render: (row: { car_id: number }) => vname(row.car_id) },
  { title: '教练', key: 'coach_id', render: (row: { coach_id: number }) => cname(row.coach_id) },
  { title: '申请日', key: 'apply_date' },
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
      车辆申请管理
    </h3>
    <n-data-table :columns="columns" :data="list" :row-key="(r: { id: number }) => r.id" />
  </div>
</template>
