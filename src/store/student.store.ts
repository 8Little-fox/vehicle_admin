import type { Student } from '~/types/driving-school'
import { createGlobalState } from '@vueuse/core'
import { useCurd } from '~/hooks'

const initData: Student[] = [
  {
    id: 1,
    username: 'student001',
    password: '123456',
    name: '张三',
    phone: '13800001111',
    gender: '男',
    age: 22,
    id_card: '210102200001011234',
    address: '沈阳市和平区',
    car_type: 'C1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student001',
    status: '在训',
  },
  {
    id: 2,
    username: 'student002',
    password: '123456',
    name: '李四',
    phone: '13800002222',
    gender: '女',
    age: 28,
    id_card: '210103199801011234',
    address: '大连市中山区',
    car_type: 'C2',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student002',
    status: '在训',
  },
]

export const useStudentStore = createGlobalState(() => {
  return useCurd<Student>({ key: 'driving-school-students-v2', initData })
})
