import type { PracticeBooking } from '~/types/driving-school'
import { createGlobalState, useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { nextNumericId } from '~/utils/driving-school'
import { useTrainingProjectStore } from './trainingProject.store'

export const usePracticeBookingStore = createGlobalState(() => {
  const list = useLocalStorage<PracticeBooking[]>('driving-school-practice-bookings', [])

  function submitBooking(input: { student_id: number, project_id: number, coach_id: number, remark?: string }) {
    const { dataList: projects, updateData: updateProject } = useTrainingProjectStore()
    const pi = projects.value.findIndex(p => p.id === input.project_id)
    if (pi < 0)
      return { ok: false, message: '练车项目不存在' }
    const proj = projects.value[pi]!
    if (proj.status !== '可预约')
      return { ok: false, message: '该项目不可预约' }
    if (proj.booked_num >= proj.max_num)
      return { ok: false, message: '名额已满' }
    const dup = list.value.some(
      b => b.student_id === input.student_id && b.project_id === input.project_id && b.status !== '已驳回' && b.status !== '已取消',
    )
    if (dup)
      return { ok: false, message: '您已预约该项目，请勿重复提交' }

    const row: PracticeBooking = {
      id: nextNumericId(list.value),
      project_id: input.project_id,
      student_id: input.student_id,
      coach_id: input.coach_id,
      appoint_date: proj.train_date,
      status: '待审核',
      remark: input.remark ?? '',
      addtime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    list.value = [...list.value, row]
    updateProject(pi, { ...proj, booked_num: proj.booked_num + 1 })
    return { ok: true, message: '预约已提交，请等待审核', booking: row }
  }

  function setStatus(bookingId: number, status: PracticeBooking['status'], remark?: string) {
    const i = list.value.findIndex(b => b.id === bookingId)
    if (i < 0)
      return false
    const b = list.value[i]!
    list.value[i] = { ...b, status, remark: remark ?? b.remark }
    list.value = [...list.value]
    if (status === '已驳回' || status === '已取消') {
      const { dataList: projects, updateData: updateProject } = useTrainingProjectStore()
      const pi = projects.value.findIndex(p => p.id === b.project_id)
      if (pi >= 0) {
        const p = projects.value[pi]!
        updateProject(pi, { ...p, booked_num: Math.max(0, p.booked_num - 1) })
      }
    }
    return true
  }

  return { list, submitBooking, setStatus }
})
