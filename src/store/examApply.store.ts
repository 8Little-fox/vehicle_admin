import type { ExamApply } from '~/types/driving-school'
import { createGlobalState, useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { nextNumericId } from '~/utils/driving-school'
import { useExamInfoStore } from './examInfo.store'

export const useExamApplyStore = createGlobalState(() => {
  const list = useLocalStorage<ExamApply[]>('driving-school-exam-applies', [])

  function applyExam(input: { student_id: number, exam_id: number }) {
    const { dataList: exams, updateData: updateExam } = useExamInfoStore()
    const ei = exams.value.findIndex(e => e.id === input.exam_id)
    if (ei < 0)
      return { ok: false, message: '考试信息不存在' }
    const ex = exams.value[ei]!
    if (ex.booked_num >= ex.max_num)
      return { ok: false, message: '该考试名额已满，请选择其他场次' }
    const duplicated = list.value.some(
      a =>
        a.student_id === input.student_id
        && a.exam_id === input.exam_id
        && (a.status === '待审核' || a.status === '已通过'),
    )
    if (duplicated)
      return { ok: false, message: '您已申请过该考试，请勿重复提交' }

    const row: ExamApply = {
      id: nextNumericId(list.value),
      exam_id: input.exam_id,
      student_id: input.student_id,
      apply_date: dayjs().format('YYYY-MM-DD'),
      status: '待审核',
      check_remark: '',
      addtime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    list.value = [...list.value, row]
    updateExam(ei, { ...ex, booked_num: ex.booked_num + 1 })
    return { ok: true, message: '考试申请提交成功', apply: row }
  }

  function setApplyStatus(applyId: number, status: ExamApply['status'], check_remark?: string) {
    const i = list.value.findIndex(a => a.id === applyId)
    if (i < 0)
      return false
    const a = list.value[i]!
    list.value[i] = { ...a, status, check_remark: check_remark ?? a.check_remark }
    list.value = [...list.value]
    if (status === '已驳回') {
      const { dataList: exams, updateData: updateExam } = useExamInfoStore()
      const ei = exams.value.findIndex(e => e.id === a.exam_id)
      if (ei >= 0) {
        const ex = exams.value[ei]!
        updateExam(ei, { ...ex, booked_num: Math.max(0, ex.booked_num - 1) })
      }
    }
    return true
  }

  return { list, applyExam, setApplyStatus }
})
