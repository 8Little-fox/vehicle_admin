<script setup lang="ts">
import dayjs from 'dayjs'
import { useMessage } from 'naive-ui'
import { useFeeStore, useLoginStore } from '~/store'

const message = useMessage()
const { currentProfile } = useLoginStore()
const { dataList, updateData } = useFeeStore()

const mine = computed(() => {
  const sid = currentProfile.value?.id
  if (sid == null)
    return []
  return dataList.value.filter(f => f.student_id === sid)
})

function pay(row: (typeof dataList.value)[0]) {
  if (row.pay_status === '已支付') {
    message.info('已支付')
    return
  }
  const i = dataList.value.findIndex(x => x.id === row.id)
  if (i < 0)
    return
  updateData(i, {
    ...row,
    pay_status: '已支付',
    pay_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    invoice: `INV-${dayjs().format('YYYYMMDDHHmmss')}`,
  })
  message.success('支付成功（本地模拟）')
}
</script>

<template>
  <div class="space-y-3">
    <p class="text-sm text-slate-600">
      费用查询与在线支付（论文：支付费用功能模块）
    </p>
    <div
      v-for="f in mine"
      :key="f.id"
      class="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div class="flex justify-between gap-2">
        <span class="font-medium text-slate-800">{{ f.fee_name }}</span>
        <span class="text-teal-700 font-semibold">¥{{ f.fee_amount }}</span>
      </div>
      <div class="text-xs text-slate-500">
        {{ f.fee_type }} · {{ f.pay_status }}
        <template v-if="f.pay_time">
          · {{ f.pay_time }}
        </template>
      </div>
      <n-button
        v-if="f.pay_status === '待支付'"
        type="primary"
        size="small"
        class="self-start"
        @click="pay(f)"
      >
        立即支付
      </n-button>
      <div v-if="f.invoice" class="text-xs text-slate-500">
        凭证 {{ f.invoice }}
      </div>
    </div>
    <n-empty v-if="!mine.length" description="暂无费用记录" />
  </div>
</template>
