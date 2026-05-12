import type { AdminUser } from '~/types/driving-school'
import { createGlobalState } from '@vueuse/core'
import { useCurd } from '~/hooks'

const initData: AdminUser[] = [
  { id: 1, username: 'admin001', password: '123456', role: '管理员' },
]

export const useAdminStore = createGlobalState(() => {
  return useCurd<AdminUser>({ key: 'driving-school-admin', initData })
})
