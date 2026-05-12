<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useContactMessageStore, useLoginStore, useStudentStore } from '~/store'

const message = useMessage()
const { currentProfile } = useLoginStore()
const { dataList: students } = useStudentStore()
const { list, send } = useContactMessageStore()

const cid = computed(() => currentProfile.value?.id ?? 0)
const studentId = ref<number | null>(students.value[0]?.id ?? null)
const text = ref('')

const threads = computed(() =>
  [...list.value].filter(
    m =>
      (m.from_role === '教练' && m.from_id === cid.value)
      || (m.to_role === '教练' && m.to_id === cid.value),
  ).sort((a, b) => b.time.localeCompare(a.time)),
)

function sendMsg() {
  if (!cid.value || !studentId.value || !text.value.trim()) {
    message.warning('请选择学员并填写内容')
    return
  }
  send({
    from_role: '教练',
    from_id: cid.value,
    to_role: '学员',
    to_id: studentId.value,
    content: text.value.trim(),
  })
  text.value = ''
  message.success('已发送')
}
</script>

<template>
  <div>
    <h3 class="mb-4 text-lg font-semibold">
      联系学员
    </h3>
    <n-select
      v-model:value="studentId"
      class="mb-3 max-w-md"
      :options="students.map(s => ({ label: `${s.name}（${s.username}）`, value: s.id }))"
      placeholder="选择学员"
    />
    <n-input v-model:value="text" type="textarea" :rows="3" placeholder="留言内容" />
    <n-button class="mt-2" type="primary" @click="sendMsg">
      发送
    </n-button>
    <n-divider>最近消息</n-divider>
    <n-list bordered>
      <n-list-item v-for="m in threads.slice(0, 30)" :key="m.id">
        <div class="text-xs text-slate-500">
          {{ m.time }} · {{ m.from_role }} → {{ m.to_role }}
        </div>
        <div>{{ m.content }}</div>
      </n-list-item>
    </n-list>
  </div>
</template>
