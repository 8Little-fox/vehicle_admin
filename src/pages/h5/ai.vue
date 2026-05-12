<script setup lang="ts">
import { useAiChatStore, useLoginStore } from '~/store'

const { currentProfile } = useLoginStore()
const ai = useAiChatStore()
const input = ref('')

const userKey = computed(() => {
  const p = currentProfile.value
  if (!p)
    return 'guest'
  return `student-${p.id}`
})

const turns = computed(() => ai.sessions.value[userKey.value] ?? [])

function send() {
  if (!input.value.trim())
    return
  ai.ask(userKey.value, input.value)
  input.value = ''
}
</script>

<template>
  <div class="flex min-h-[60vh] flex-col rounded-xl bg-white shadow-sm">
    <div class="flex-1 space-y-3 overflow-y-auto p-3">
      <div
        v-for="t in turns"
        :key="t.id"
        class="flex"
        :class="t.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[85%] rounded-2xl px-3 py-2 text-sm"
          :class="t.role === 'user' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-800'"
        >
          {{ t.content }}
          <div class="mt-1 text-[10px] opacity-70">
            {{ t.time }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-2 border-t border-slate-100 p-3">
      <n-input v-model:value="input" placeholder="输入问题…" @keydown.enter.prevent="send" />
      <n-button type="primary" @click="send">
        发送
      </n-button>
    </div>
  </div>
</template>
