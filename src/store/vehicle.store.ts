import type { Vehicle } from '~/types/driving-school'
import { createGlobalState } from '@vueuse/core'
import { useCurd } from '~/hooks'

const initData: Vehicle[] = [
  { id: 1, car_name: '教练车1号', car_type: 'C1', car_num: '辽A·K1001', car_photo: '', status: '空闲' },
  { id: 2, car_name: '教练车2号', car_type: 'C1', car_num: '辽A·K1002', car_photo: '', status: '空闲' },
  { id: 3, car_name: '教练车3号', car_type: 'C2', car_num: '辽A·K2001', car_photo: '', status: '使用中' },
]

export const useVehicleStore = createGlobalState(() => {
  return useCurd<Vehicle>({ key: 'driving-school-vehicles', initData })
})
