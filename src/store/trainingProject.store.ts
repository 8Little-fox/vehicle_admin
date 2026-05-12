import type { TrainingProject } from '~/types/driving-school'
import { createGlobalState } from '@vueuse/core'
import dayjs from 'dayjs'
import { useCurd } from '~/hooks'

const d0 = dayjs().add(1, 'day').format('YYYY-MM-DD')
const d1 = dayjs().add(2, 'day').format('YYYY-MM-DD')

const initData: TrainingProject[] = [
  {
    id: 1,
    project_name: '科目二倒车入库强化',
    subject: '科目二',
    car_type: 'C1',
    site_id: 1,
    coach_id: 1,
    train_date: d0,
    train_time: '09:00-11:00',
    max_num: 4,
    booked_num: 1,
    status: '可预约',
  },
  {
    id: 2,
    project_name: '科目三道路驾驶',
    subject: '科目三',
    car_type: 'C1',
    site_id: 2,
    coach_id: 1,
    train_date: d0,
    train_time: '14:00-16:00',
    max_num: 3,
    booked_num: 0,
    status: '可预约',
  },
  {
    id: 3,
    project_name: '科目二五项连训',
    subject: '科目二',
    car_type: 'C2',
    site_id: 1,
    coach_id: 2,
    train_date: d1,
    train_time: '08:30-11:30',
    max_num: 5,
    booked_num: 0,
    status: '可预约',
  },
]

export const useTrainingProjectStore = createGlobalState(() => {
  return useCurd<TrainingProject>({ key: 'driving-school-training-projects', initData })
})
