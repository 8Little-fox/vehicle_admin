import type { TeachingResource } from '~/types/driving-school'
import { createGlobalState } from '@vueuse/core'
import { useCurd } from '~/hooks'

const initData: TeachingResource[] = [
  {
    id: 1,
    resource_name: '科目二五项操作图解',
    resource_type: '图文',
    resource_content: '倒车入库、侧方停车、曲线行驶、直角转弯、坡道定点。',
    resource_file: '',
    coach_id: 1,
    click_num: 320,
  },
  {
    id: 2,
    resource_name: '科目三灯光模拟语音',
    resource_type: '音频',
    resource_content: '夜间灯光使用规范与模拟考试流程说明。',
    resource_file: '',
    coach_id: null,
    click_num: 156,
  },
]

export const useTeachingResourceStore = createGlobalState(() => {
  return useCurd<TeachingResource>({ key: 'driving-school-resources', initData })
})
