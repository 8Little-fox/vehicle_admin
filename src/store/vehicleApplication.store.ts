import type { VehicleApplication } from '~/types/driving-school'
import { createGlobalState, useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { nextNumericId } from '~/utils/driving-school'

export const useVehicleApplicationStore = createGlobalState(() => {
  const list = useLocalStorage<VehicleApplication[]>('driving-school-vehicle-applies', [])

  function coachApply(input: { car_id: number, coach_id: number }) {
    const row: VehicleApplication = {
      id: nextNumericId(list.value),
      car_id: input.car_id,
      coach_id: input.coach_id,
      apply_date: dayjs().format('YYYY-MM-DD'),
      status: '待审核',
      check_remark: '',
      addtime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    list.value = [...list.value, row]
    return row
  }

  function setStatus(id: number, status: VehicleApplication['status'], check_remark?: string) {
    const i = list.value.findIndex(x => x.id === id)
    if (i < 0)
      return false
    list.value[i] = { ...list.value[i]!, status, check_remark: check_remark ?? list.value[i]!.check_remark }
    list.value = [...list.value]
    return true
  }

  return { list, coachApply, setStatus }
})
