import type { CancelBookingRequest } from '~/types/driving-school'
import { createGlobalState, useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { seedCancelBookings } from '~/constants/back-office-list-seed'
import { nextNumericId } from '~/utils/driving-school'
import { usePracticeBookingStore } from './practiceBooking.store'

export const useCancelBookingStore = createGlobalState(() => {
  const list = useLocalStorage<CancelBookingRequest[]>(
    'driving-school-cancel-bookings-v2',
    () => seedCancelBookings.map(r => ({ ...r })),
  )

  function submitCancel(input: { appoint_id: number, student_id: number, cancel_reason: string }) {
    const row: CancelBookingRequest = {
      id: nextNumericId(list.value),
      appoint_id: input.appoint_id,
      student_id: input.student_id,
      cancel_reason: input.cancel_reason,
      status: '待审核',
      check_remark: '',
      addtime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    list.value = [...list.value, row]
    return { ok: true, row }
  }

  function setStatus(id: number, status: CancelBookingRequest['status'], check_remark?: string) {
    const i = list.value.findIndex(x => x.id === id)
    if (i < 0)
      return false
    const cur = list.value[i]!
    list.value[i] = { ...cur, status, check_remark: check_remark ?? cur.check_remark }
    list.value = [...list.value]
    if (status === '已通过') {
      const { setStatus: setBookingStatus } = usePracticeBookingStore()
      setBookingStatus(cur.appoint_id, '已取消')
    }
    return true
  }

  return { list, submitCancel, setStatus }
})
