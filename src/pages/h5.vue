<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  { name: '首页', path: '/h5/home', icon: 'icon-[icon-park-outline--home-two]' },
  { name: '预约', path: '/h5/book', icon: 'icon-[icon-park-outline--calendar]' },
  { name: '考试', path: '/h5/exam', icon: 'icon-[icon-park-outline--notebook-one]' },
  { name: '消息', path: '/h5/messages', icon: 'icon-[icon-park-outline--message]' },
  { name: '我的', path: '/h5/profile', icon: 'icon-[icon-park-outline--user]' },
]

const active = computed(() => {
  const p = route.path
  if (p.startsWith('/h5/home') || p.startsWith('/h5/news'))
    return '/h5/home'
  if (p.startsWith('/h5/book') || p.startsWith('/h5/coach') || p.startsWith('/h5/coaches') || p.startsWith('/h5/sites'))
    return '/h5/book'
  if (p.startsWith('/h5/exam'))
    return '/h5/exam'
  if (p.startsWith('/h5/messages') || p.startsWith('/h5/ai'))
    return '/h5/messages'
  if (p.startsWith('/h5/profile') || p.startsWith('/h5/fees') || p.startsWith('/h5/review') || p.startsWith('/h5/my-bookings'))
    return '/h5/profile'
  return ''
})
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-slate-100 pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
    <header class="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 px-4 py-3 text-center text-base font-semibold text-slate-800 backdrop-blur">
      驾校通 · 学员端
    </header>
    <main class="flex-1 overflow-y-auto px-3 py-3">
      <RouterView />
    </main>
    <nav
      class="fixed bottom-0 left-0 right-0 z-20 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <button
        v-for="t in tabs"
        :key="t.path"
        type="button"
        class="flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] transition"
        :class="active === t.path ? 'text-teal-600' : 'text-slate-500'"
        @click="router.push(t.path)"
      >
        <span class="text-xl" :class="[t.icon]" />
        {{ t.name }}
      </button>
    </nav>
  </div>
</template>
