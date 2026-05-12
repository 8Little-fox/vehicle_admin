import { createGlobalState, useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { computed } from 'vue'

export interface AiChatTurn {
  id: number
  role: 'user' | 'assistant'
  content: string
  time: string
}

/** 论文 AI 咨询：本地模拟对话，无远程接口 */
export const useAiChatStore = createGlobalState(() => {
  const sessions = useLocalStorage<Record<string, AiChatTurn[]>>('driving-school-ai-chats', {})

  function keyFor(userKey: string) {
    return userKey
  }

  function replyMock(question: string) {
    const q = question.trim()
    if (!q)
      return '您好，请描述您想咨询的驾考或练车问题。'
    if (/科目二|科二/.test(q))
      return '科目二重点在于车速控制和点位记忆，建议多练倒车入库与坡道起步。如需预约练车，请在「预约练车」中选择对应项目。'
    if (/科目三|科三/.test(q))
      return '科目三注重观察与灯光规范，建议熟记模拟灯光语音，上路时注意观察后视镜与礼让行人。'
    if (/预约|练车/.test(q))
      return '您可在底部「预约」页查看可约练车项目，提交后管理员会审核；审核通过即预约成功。'
    if (/考试|费用|支付/.test(q))
      return '考试申请与费用缴纳可在「考试」「我的-费用」中办理；支付成功后状态会更新为已支付。'
    return '感谢您的提问。以上为智能助手根据常见问题给出的说明，具体以驾校工作人员答复为准。'
  }

  function append(userKey: string, role: 'user' | 'assistant', content: string) {
    const k = keyFor(userKey)
    const arr = sessions.value[k] ?? []
    const row: AiChatTurn = {
      id: (arr[arr.length - 1]?.id ?? 0) + 1,
      role,
      content,
      time: dayjs().format('HH:mm:ss'),
    }
    sessions.value = { ...sessions.value, [k]: [...arr, row] }
  }

  function ask(userKey: string, text: string) {
    append(userKey, 'user', text)
    append(userKey, 'assistant', replyMock(text))
  }

  function history(userKey: string) {
    return computed(() => sessions.value[keyFor(userKey)] ?? [])
  }

  return { sessions, ask, append, history }
})
