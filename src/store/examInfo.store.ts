import type { ExamInfo } from '~/types/driving-school'
import { createGlobalState } from '@vueuse/core'
import dayjs from 'dayjs'
import { useCurd } from '~/hooks'

const d = dayjs().add(10, 'day').format('YYYY-MM-DD')

const initData: ExamInfo[] = [
  {
    id: 1,
    exam_name: '科目一理论考试',
    exam_subject: '科目一',
    exam_type: '机考',
    exam_address: '沈阳市车管所考场A厅',
    exam_date: d,
    max_num: 80,
    booked_num: 12,
    status: '可预约',
  },
  {
    id: 2,
    exam_name: '科目二场地驾驶技能考试',
    exam_subject: '科目二',
    exam_type: '场考',
    exam_address: '浑南机动车驾驶人考试中心',
    exam_date: dayjs().add(15, 'day').format('YYYY-MM-DD'),
    max_num: 30,
    booked_num: 8,
    status: '可预约',
  },
]

export const useExamInfoStore = createGlobalState(() => {
  return useCurd<ExamInfo>({ key: 'driving-school-exam-info', initData })
})
