<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { RouterLink, useRouter } from 'vue-router'
import {
  useCancelBookingStore,
  useLoginStore,
  usePracticeBookingStore,
  useTrainingProjectStore,
} from '~/store'

const message = useMessage()
const router = useRouter()
const { currentProfile, logout } = useLoginStore()
const { list: bookings } = usePracticeBookingStore()
const { dataList: projects } = useTrainingProjectStore()
const { submitCancel } = useCancelBookingStore()

const reason = ref('')

const mine = computed(() => {
  const sid = currentProfile.value?.id
  if (sid == null)
    return []
  return bookings.value.filter(b => b.student_id === sid)
})

function projectLabel(pid: number) {
  return projects.value.find(p => p.id === pid)?.project_name ?? `#${pid}`
}

function requestCancel(b: (typeof bookings.value)[0]) {
  const sid = currentProfile.value?.id
  if (sid == null)
    return
  if (!reason.value.trim()) {
    message.warning('请填写取消原因')
    return
  }
  submitCancel({ appoint_id: b.id, student_id: sid, cancel_reason: reason.value.trim() })
  reason.value = ''
  message.success('取消申请已提交，待管理员审核')
}

function out() {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="space-y-4">
    <div class="rounded-xl bg-white p-4 shadow-sm">
      <div class="text-base font-semibold text-slate-800">
        {{ currentProfile?.displayName }}
      </div>
      <div class="mt-1 text-sm text-slate-500">
        {{ currentProfile?.username }}
      </div>
      <n-button class="mt-4" block secondary @click="out">
        退出登录
      </n-button>
    </div>

    <RouterLink to="/h5/my-bookings" class="block rounded-xl bg-white px-4 py-3 text-slate-800 shadow-sm">
      我的练车预约
    </RouterLink>
    <RouterLink to="/h5/fees" class="block rounded-xl bg-white px-4 py-3 text-slate-800 shadow-sm">
      支付费用
    </RouterLink>
    <RouterLink to="/h5/review" class="block rounded-xl bg-white px-4 py-3 text-slate-800 shadow-sm">
      评价教练
    </RouterLink>

    <n-card title="取消预约" size="small" embedded>
      <p class="mb-2 text-xs text-slate-500">
        选择已通过审核的预约，填写原因后提交取消申请（论文：取消预约功能模块）
      </p>
      <n-input v-model:value="reason" type="textarea" placeholder="取消原因" :rows="2" />
      <div v-for="b in mine.filter(x => x.status === '已通过')" :key="b.id" class="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <span class="text-sm text-slate-700">{{ projectLabel(b.project_id) }}</span>
        <n-button size="small" @click="requestCancel(b)">
          申请取消
        </n-button>
      </div>
      <n-empty v-if="!mine.filter(x => x.status === '已通过').length" class="mt-2" description="暂无可取消的已通过预约" />
    </n-card>
  </div>
</template>
