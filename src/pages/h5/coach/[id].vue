<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useRoute } from 'vue-router'
import { useCoachStore, useContactMessageStore, useLoginStore } from '~/store'

const message = useMessage()
const route = useRoute()
const id = computed(() => Number(route.params.id))
const { dataList } = useCoachStore()
const coach = computed(() => dataList.value.find(c => c.id === id.value))
const { send } = useContactMessageStore()
const { currentProfile } = useLoginStore()
const text = ref('')

function sendMsg() {
  const sid = currentProfile.value?.id
  if (sid == null || !coach.value) {
    message.error('无法发送')
    return
  }
  if (!text.value.trim()) {
    message.warning('请输入内容')
    return
  }
  send({
    from_role: '学员',
    from_id: sid,
    to_role: '教练',
    to_id: coach.value.id,
    content: text.value.trim(),
  })
  text.value = ''
  message.success('已发送给教练')
}
</script>

<template>
  <div v-if="coach" class="space-y-4 rounded-xl bg-white p-4 shadow-sm">
    <div class="flex items-center gap-3">
      <img
        v-if="coach.avatar"
        :src="coach.avatar"
        alt=""
        class="h-16 w-16 shrink-0 rounded-full border border-slate-200 object-cover"
      >
      <div
        v-else
        class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-700"
      >
        {{ coach.name.slice(0, 1) }}
      </div>
      <div>
        <h1 class="text-lg font-semibold text-slate-800">
          {{ coach.name }}
        </h1>
        <p class="text-sm text-slate-500">
          {{ coach.phone }} · 教龄 {{ coach.teach_age }} 年
        </p>
      </div>
    </div>
    <p class="text-sm leading-relaxed text-slate-600">
      {{ coach.intro }}
    </p>
    <n-divider>联系教练</n-divider>
    <n-input v-model:value="text" type="textarea" placeholder="给教练留言" :rows="3" />
    <n-button type="primary" block @click="sendMsg">
      发送
    </n-button>
  </div>
  <n-empty v-else description="教练不存在" />
</template>
