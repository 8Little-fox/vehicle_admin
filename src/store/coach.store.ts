import type { Coach } from '~/types/driving-school'
import { createGlobalState } from '@vueuse/core'
import { useCurd } from '~/hooks'

const initData: Coach[] = [
  {
    id: 1,
    username: 'coach001',
    password: '123456',
    name: '王教练',
    phone: '13900001111',
    gender: '男',
    age: 40,
    teach_age: 12,
    intro: '科目二、科目三资深教练，耐心细致。',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coach001',
    click_num: 128,
    enabled: 1,
  },
  {
    id: 2,
    username: 'coach002',
    password: '123456',
    name: '赵教练',
    phone: '13900002222',
    gender: '女',
    age: 35,
    teach_age: 8,
    intro: '擅长新手心理疏导与基础训练。',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coach002',
    click_num: 86,
    enabled: 1,
  },
]

export const useCoachStore = createGlobalState(() => {
  return useCurd<Coach>({ key: 'driving-school-coaches-v2', initData })
})
