import type { ContactMessage, RoleType } from '~/types/driving-school'
import { createGlobalState, useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { nextNumericId } from '~/utils/driving-school'

export const useContactMessageStore = createGlobalState(() => {
  const list = useLocalStorage<ContactMessage[]>('driving-school-messages', [])

  function send(input: {
    from_role: RoleType
    from_id: number
    to_role: RoleType
    to_id: number
    content: string
  }) {
    const row: ContactMessage = {
      id: nextNumericId(list.value),
      from_role: input.from_role,
      from_id: input.from_id,
      to_role: input.to_role,
      to_id: input.to_id,
      content: input.content,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      read: 0,
    }
    list.value = [...list.value, row]
    return row
  }

  function markRead(ids: number[]) {
    const set = new Set(ids)
    list.value = list.value.map(m => (set.has(m.id) ? { ...m, read: 1 as const } : m))
  }

  return { list, send, markRead }
})
