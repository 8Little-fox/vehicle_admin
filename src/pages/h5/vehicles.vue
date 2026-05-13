<script setup lang="ts">
import { useVehicleStore } from '~/store'

const { dataList } = useVehicleStore()
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm text-slate-600">
      查看教练车辆信息（论文：学员端查看车辆与场地）
    </p>
    <div
      v-for="v in dataList"
      :key="v.id"
      class="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
    >
      <div class="flex items-start justify-between gap-2">
        <div>
          <div class="text-base font-medium text-slate-900">
            {{ v.car_name }}
          </div>
          <p class="mt-1 text-sm text-slate-600">
            {{ v.car_num }} · {{ v.car_type }}
          </p>
        </div>
        <span
          class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
          :class="v.status === '空闲' ? 'bg-emerald-50 text-[#07c160]' : 'bg-amber-50 text-amber-700'"
        >
          {{ v.status }}
        </span>
      </div>
    </div>
  </div>
</template>
