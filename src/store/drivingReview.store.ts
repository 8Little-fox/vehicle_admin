import type { DrivingReview } from '~/types/driving-school'
import { createGlobalState, useLocalStorage } from '@vueuse/core'
import { nextNumericId } from '~/utils/driving-school'

export const useDrivingReviewStore = createGlobalState(() => {
  const list = useLocalStorage<DrivingReview[]>('driving-school-reviews', [
    {
      id: 1,
      student_id: 1,
      coach_id: 1,
      student_star: 5,
      student_comment: '讲解清楚，练车安排合理。',
      coach_star: 5,
      coach_comment: '学员认真，进步快。',
      student_reply: '谢谢教练！',
      coach_reply: '加油通过考试！',
    },
  ])

  function upsertStudentReview(input: { student_id: number, coach_id: number, student_star: number, student_comment: string }) {
    const i = list.value.findIndex(r => r.student_id === input.student_id && r.coach_id === input.coach_id)
    if (i >= 0) {
      const r = list.value[i]!
      list.value[i] = { ...r, ...input }
    }
    else {
      list.value.push({
        id: nextNumericId(list.value),
        student_id: input.student_id,
        coach_id: input.coach_id,
        student_star: input.student_star,
        student_comment: input.student_comment,
        coach_star: 0,
        coach_comment: '',
        student_reply: '',
        coach_reply: '',
      })
    }
    list.value = [...list.value]
  }

  function updateCoachFeedback(id: number, patch: Partial<Pick<DrivingReview, 'coach_star' | 'coach_comment' | 'coach_reply' | 'student_reply'>>) {
    const i = list.value.findIndex(r => r.id === id)
    if (i < 0)
      return false
    list.value[i] = { ...list.value[i]!, ...patch }
    list.value = [...list.value]
    return true
  }

  return { list, upsertStudentReview, updateCoachFeedback }
})
