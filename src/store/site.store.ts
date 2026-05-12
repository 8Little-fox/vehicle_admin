import type { Site } from '~/types/driving-school'
import { createGlobalState } from '@vueuse/core'
import { useCurd } from '~/hooks'

const initData: Site[] = [
  {
    id: 1,
    site_name: '主训练场',
    site_address: '沈阳市浑南区创新路88号',
    longitude: 123.4567,
    latitude: 41.7890,
    site_photo: '',
    site_intro: '科目二五项综合训练场地，划线清晰。',
    capacity: 40,
  },
  {
    id: 2,
    site_name: '科目三道路训练段',
    site_address: '沈阳市沈北新区道义大街',
    longitude: 123.4123,
    latitude: 41.9123,
    site_photo: '',
    site_intro: '封闭路段与社会道路结合训练。',
    capacity: 20,
  },
]

export const useSiteStore = createGlobalState(() => {
  return useCurd<Site>({ key: 'driving-school-sites', initData })
})
