import type { LoginSession, RoleType } from '~/types/driving-school'
import { createGlobalState, useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { verifyPassword } from '~/utils/driving-school'
import { useAdminStore } from './admin.store'
import { useCacheStore } from './cache.store'
import { useCoachStore } from './coach.store'
import { useStudentStore } from './student.store'

const SESSION_STORAGE_KEY = 'driving-school-session'

function readSessionFromLocalStorage(): LoginSession | null {
  if (typeof localStorage === 'undefined')
    return null
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY)
    if (raw == null || raw === '' || raw === 'null')
      return null
    const o = JSON.parse(raw) as LoginSession
    if (!o || typeof o.role !== 'string' || typeof o.account !== 'string')
      return null
    return o
  }
  catch {
    return null
  }
}

export function readSessionSnapshot(): LoginSession | null {
  return readSessionFromLocalStorage()
}

export const useLoginStore = createGlobalState(() => {
  const session = useLocalStorage<LoginSession | null>(SESSION_STORAGE_KEY, null)
  const { setToken, removeToken } = useCacheStore()

  const isLogin = computed(() => !!session.value)
  const currentRole = computed(() => session.value?.role ?? null)

  const currentProfile = computed(() => {
    if (!session.value)
      return null
    const { role, account } = session.value
    if (role === '管理员') {
      const { dataList } = useAdminStore()
      const a = dataList.value.find(x => x.username === account)
      if (!a)
        return null
      return { role, username: a.username, displayName: a.username, id: a.id }
    }
    if (role === '教练') {
      const { dataList } = useCoachStore()
      const c = dataList.value.find(x => x.username === account)
      if (!c)
        return null
      return { role, username: c.username, displayName: c.name, id: c.id }
    }
    const { dataList } = useStudentStore()
    const s = dataList.value.find(x => x.username === account)
    if (!s)
      return null
    return { role, username: s.username, displayName: s.name, id: s.id }
  })

  function login(role: RoleType, account: string, password: string) {
    if (role === '管理员') {
      const { dataList } = useAdminStore()
      const u = dataList.value.find(x => x.username === account && verifyPassword(password, x.password))
      if (!u)
        return { ok: false, message: '用户名或密码错误' }
      const token = `mock-admin-${u.id}`
      session.value = { role, account, token }
      setToken(token)
      return { ok: true }
    }
    if (role === '教练') {
      const { dataList } = useCoachStore()
      const u = dataList.value.find(x => x.username === account && verifyPassword(password, x.password))
      if (!u)
        return { ok: false, message: '用户名或密码错误' }
      if (u.enabled !== 1)
        return { ok: false, message: '账号已停用' }
      const token = `mock-coach-${u.id}`
      session.value = { role, account: u.username, token }
      setToken(token)
      return { ok: true }
    }
    const { dataList } = useStudentStore()
    const u = dataList.value.find(x => x.username === account && verifyPassword(password, x.password))
    if (!u)
      return { ok: false, message: '用户名或密码错误' }
    if (u.status === '停训')
      return { ok: false, message: '学员账号已停训，请联系管理员' }
    const token = `mock-student-${u.id}`
    session.value = { role, account: u.username, token }
    setToken(token)
    return { ok: true }
  }

  function logout() {
    session.value = null
    removeToken()
  }

  function hydrateSessionFromStorage() {
    const parsed = readSessionFromLocalStorage()
    const cur = session.value
    if (cur != null && parsed == null)
      return
    const same = (cur == null && parsed == null)
      || (cur != null && parsed != null && cur.role === parsed.role && cur.account === parsed.account && cur.token === parsed.token)
    if (!same)
      session.value = parsed
  }

  function resetPassword(role: RoleType, account: string, newPassword: string) {
    if (!newPassword)
      return { ok: false, message: '新密码不能为空' }
    if (role === '管理员') {
      const { dataList, updateData } = useAdminStore()
      const i = dataList.value.findIndex(x => x.username === account)
      if (i < 0)
        return { ok: false, message: '未找到该管理员账号' }
      updateData(i, { ...dataList.value[i]!, password: newPassword })
      return { ok: true, message: '密码已重置' }
    }
    if (role === '教练') {
      const { dataList, updateData } = useCoachStore()
      const i = dataList.value.findIndex(x => x.username === account)
      if (i < 0)
        return { ok: false, message: '未找到该教练账号' }
      updateData(i, { ...dataList.value[i]!, password: newPassword })
      return { ok: true, message: '密码已重置' }
    }
    const { dataList, updateData } = useStudentStore()
    const i = dataList.value.findIndex(x => x.username === account)
    if (i < 0)
      return { ok: false, message: '未找到该学员用户名' }
    updateData(i, { ...dataList.value[i]!, password: newPassword })
    return { ok: true, message: '密码已重置' }
  }

  return {
    session,
    isLogin,
    currentRole,
    currentProfile,
    login,
    logout,
    resetPassword,
    hydrateSessionFromStorage,
  }
})
