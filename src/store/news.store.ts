import type { NewsItem } from '~/types/driving-school'
import { createGlobalState } from '@vueuse/core'
import dayjs from 'dayjs'
import { useCurd } from '~/hooks'

const initData: NewsItem[] = [
  {
    id: 1,
    title: '春节期间练车安排通知',
    summary: '除夕至初三训练场闭场，初四起恢复正常预约。',
    content: '尊敬的学员：根据国家法定节假日安排，我校训练场除夕至正月初三暂停开放，正月初四起恢复预约练车。请提前在系统中调整预约计划。',
    cover: 'https://picsum.photos/seed/jxj1/320/200',
    publish_time: dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm'),
  },
  {
    id: 2,
    title: '科目三新增考试线路说明',
    summary: '自本月起启用道义大街考试线路，请教练与学员知悉。',
    content: '交管部门已批复新增考试线路，详见附件示意图。各教练组请在教学资源库下载最新路线图。',
    cover: 'https://picsum.photos/seed/jxj2/320/200',
    publish_time: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm'),
  },
]

export const useNewsStore = createGlobalState(() => {
  return useCurd<NewsItem>({ key: 'driving-school-news-v2', initData })
})
