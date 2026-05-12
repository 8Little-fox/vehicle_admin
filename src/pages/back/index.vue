<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  useCoachStore,
  useExamApplyStore,
  usePracticeBookingStore,
  useStudentStore,
  useVehicleApplicationStore,
} from '~/store'

const { dataList: students } = useStudentStore()
const { dataList: coaches } = useCoachStore()
const { list: bookings } = usePracticeBookingStore()
const { list: examApplies } = useExamApplyStore()
const { list: vehicleApps } = useVehicleApplicationStore()

const stats = computed(() => ({
  students: students.value.length,
  coaches: coaches.value.length,
  pendingBookings: bookings.value.filter(b => b.status === '待审核').length,
  pendingExam: examApplies.value.filter(a => a.status === '待审核').length,
  pendingVehicle: vehicleApps.value.filter(v => v.status === '待审核').length,
}))
</script>

<template>
  <div>
    <h2 class="mb-2 text-xl font-semibold text-slate-800">
      管理员工作台
    </h2>
    <p class="mb-6 max-w-4xl text-sm text-slate-600">
      对应论文<strong>（二）管理端功能实现</strong>：统计、用户、车辆、车辆申请、教学资源、场地、练车项目、练车预约、取消预约、考试信息、考试申请、评价、费用等模块入口见左侧菜单。
    </p>
    <n-card title="快捷入口" size="small" class="mb-6" embedded>
      <n-space wrap>
        <RouterLink v-slot="{ navigate }" to="/back/practice-booking-list" custom>
          <n-button type="primary" secondary @click="navigate">
            练车预约审核
          </n-button>
        </RouterLink>
        <RouterLink v-slot="{ navigate }" to="/back/vehicle-apply-list" custom>
          <n-button secondary @click="navigate">
            车辆申请审核
          </n-button>
        </RouterLink>
        <RouterLink v-slot="{ navigate }" to="/back/stats" custom>
          <n-button secondary @click="navigate">
            统计功能
          </n-button>
        </RouterLink>
      </n-space>
    </n-card>
    <n-grid :cols="4" :x-gap="16" :y-gap="16" responsive="screen">
      <n-gi>
        <n-card title="学员数">
          <div class="text-3xl font-bold text-teal-600">
            {{ stats.students }}
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="教练数">
          <div class="text-3xl font-bold text-teal-600">
            {{ stats.coaches }}
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="待审练车预约">
          <div class="text-3xl font-bold text-amber-600">
            {{ stats.pendingBookings }}
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="待审考试/车辆申请">
          <div class="text-2xl font-bold text-amber-600">
            {{ stats.pendingExam }} / {{ stats.pendingVehicle }}
          </div>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>
