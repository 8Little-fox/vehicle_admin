import type { FeeRecord } from '~/types/driving-school'
import { createGlobalState } from '@vueuse/core'
import dayjs from 'dayjs'
import { useCurd } from '~/hooks'

const initData: FeeRecord[] = [
  {
    id: 1,
    student_id: 1,
    fee_name: '科目二练车费',
    fee_amount: 200,
    fee_type: '练车费',
    pay_status: '待支付',
    pay_time: null,
    invoice: '',
  },
  {
    id: 2,
    student_id: 1,
    fee_name: '科目三考试费',
    fee_amount: 260,
    fee_type: '考试费',
    pay_status: '已支付',
    pay_time: dayjs().subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
    invoice: 'INV-20260101001',
  },
]

export const useFeeStore = createGlobalState(() => {
  return useCurd<FeeRecord>({ key: 'driving-school-fees', initData })
})
