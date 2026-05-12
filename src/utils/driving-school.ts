import dayjs from 'dayjs'

export function genNo(prefix: string) {
  return `${prefix}${dayjs().format('YYYYMMDDHHmmss')}${Math.floor(Math.random() * 900 + 100)}`
}

export function nextNumericId(list: { id: number }[]) {
  if (!list.length)
    return 1
  return Math.max(...list.map(x => x.id)) + 1
}

/** 论文非功能需求：密码摘要存储（演示用轻量摘要，非标准 MD5） */
export function digestPassword(plain: string) {
  let h = 0
  for (let i = 0; i < plain.length; i++)
    h = Math.imul(31, h) + plain.charCodeAt(i) | 0
  return `md5:${plain.length}:${h.toString(16)}`
}

export function verifyPassword(plain: string, stored: string) {
  if (stored.startsWith('md5:'))
    return digestPassword(plain) === stored
  return plain === stored
}
