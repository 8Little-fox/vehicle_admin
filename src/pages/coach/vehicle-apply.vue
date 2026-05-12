<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useLoginStore, useVehicleApplicationStore, useVehicleStore } from '~/store'

const message = useMessage()
const { currentProfile } = useLoginStore()
const { dataList: vehicles } = useVehicleStore()
const { list, coachApply } = useVehicleApplicationStore()

const cid = computed(() => currentProfile.value?.id ?? 0)
const mine = computed(() => list.value.filter(a => a.coach_id === cid.value))

function apply(carId: number) {
  if (!cid.value) {
    message.error('未登录')
    return
  }
  coachApply({ car_id: carId, coach_id: cid.value })
  message.success('申请已提交，待管理员审核')
}
</script>

<template>
  <div>
    <h3 class="mb-4 text-lg font-semibold">
      车辆申请（论文教练端）
    </h3>
    <p class="mb-4 text-sm text-slate-600">
      选择空闲车辆提交申请。
    </p>
    <n-space vertical>
      <n-card v-for="v in vehicles.filter(x => x.status === '空闲')" :key="v.id" size="small" :title="v.car_name">
        <div class="text-sm text-slate-600">
          {{ v.car_num }} · {{ v.car_type }}
        </div>
        <n-button class="mt-2" size="small" type="primary" @click="apply(v.id)">
          申请使用该车辆
        </n-button>
      </n-card>
    </n-space>
    <n-divider>我的申请记录</n-divider>
    <n-list bordered>
      <n-list-item v-for="a in mine" :key="a.id">
        车辆 #{{ a.car_id }} · {{ a.status }} · {{ a.apply_date }}
      </n-list-item>
    </n-list>
  </div>
</template>
