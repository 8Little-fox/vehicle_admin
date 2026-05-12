<script setup lang="ts">
import { useLoginStore, usePracticeBookingStore, useVehicleApplicationStore } from '~/store'

const { currentProfile } = useLoginStore()
const { list: bookings } = usePracticeBookingStore()
const { list: apps } = useVehicleApplicationStore()
const cid = computed(() => currentProfile.value?.id ?? 0)

const myBookings = computed(() => bookings.value.filter(b => b.coach_id === cid.value))
const myApps = computed(() => apps.value.filter(a => a.coach_id === cid.value))
</script>

<template>
  <div>
    <h2 class="mb-4 text-xl font-semibold text-slate-800">
      教练工作台
    </h2>
    <n-grid :cols="3" :x-gap="16" responsive="screen">
      <n-gi>
        <n-card title="与我相关的练车预约">
          <div class="text-3xl font-bold text-teal-600">
            {{ myBookings.length }}
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="我的车辆申请">
          <div class="text-3xl font-bold text-teal-600">
            {{ myApps.length }}
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="待审核申请">
          <div class="text-3xl font-bold text-amber-600">
            {{ myApps.filter(a => a.status === '待审核').length }}
          </div>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>
