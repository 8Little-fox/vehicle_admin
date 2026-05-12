import { expect, test } from '@playwright/test'

async function loginAs(
  page: import('@playwright/test').Page,
  role: '管理员' | '教练' | '学员',
  account: string,
  password: string,
  opts?: { expectErrorMessage?: string },
) {
  await page.goto('/login')
  await page.getByRole('radio', { name: role }).click()
  const ph = role === '教练' ? '教练用户名' : role === '管理员' ? '管理员用户名' : '学员用户名'
  await page.getByPlaceholder(ph).fill(account)
  await page.getByPlaceholder('密码').fill(password)
  await page.getByRole('button', { name: '登录' }).click()
  if (opts?.expectErrorMessage) {
    await expect(page.getByText(opts.expectErrorMessage)).toBeVisible({ timeout: 15_000 })
    return
  }
  const urlPat = role === '管理员' ? /\/back/ : role === '教练' ? /\/coach/ : /\/h5/
  await expect(page).toHaveURL(urlPat, { timeout: 15_000 })
}

test.describe('E2E-AUTH / E2E-LOGIN', () => {
  test('E2E-AUTH-01: 未登录访问 / 跳转登录', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/login/)
  })

  test('E2E-AUTH-02: 未登录访问 /h5 带 redirect', async ({ page }) => {
    await page.goto('/h5/home')
    await expect(page).toHaveURL(/\/login/)
    const u = new URL(page.url())
    expect(u.searchParams.get('redirect')).toContain('/h5')
  })

  test('E2E-AUTH-03: 未登录访问 /back 带 redirect', async ({ page }) => {
    await page.goto('/back/student-list')
    await expect(page).toHaveURL(/\/login/)
    const u = new URL(page.url())
    expect(u.searchParams.get('redirect')).toContain('/back')
  })

  test('E2E-LOGIN-02: 错误密码提示', async ({ page }) => {
    await loginAs(page, '学员', 'student001', 'wrong-password', { expectErrorMessage: '用户名或密码错误' })
  })

  test('E2E-LOGIN-03: 学员登录进入 H5', async ({ page }) => {
    await loginAs(page, '学员', 'student001', '123456')
    await expect(page).toHaveURL(/\/h5/)
    await expect(page.getByText('驾校通 · 学员端')).toBeVisible()
  })

  test('E2E-AUTH-04: 学员不可访问 /back', async ({ page }) => {
    await loginAs(page, '学员', 'student001', '123456')
    await page.goto('/back')
    await expect(page).toHaveURL(/\/h5/)
  })

  test('E2E-LOGIN-04: 管理员登录管理端', async ({ page }) => {
    await loginAs(page, '管理员', 'admin001', '123456')
    await expect(page).toHaveURL(/\/back/)
    await expect(page.getByText('驾校管理后台')).toBeVisible()
  })

  test('E2E-LOGIN-05: 教练登录教练端', async ({ page }) => {
    await loginAs(page, '教练', 'coach001', '123456')
    await expect(page).toHaveURL(/\/coach/)
  })
})
