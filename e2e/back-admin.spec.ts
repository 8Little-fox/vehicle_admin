import { expect, test } from '@playwright/test'

async function loginAsAdmin(page: import('@playwright/test').Page) {
  await page.goto('/login')
  await page.getByRole('radio', { name: '管理员' }).click()
  await page.getByPlaceholder('管理员用户名').fill('admin001')
  await page.getByPlaceholder('密码').fill('123456')
  await page.getByRole('button', { name: '登录' }).click()
  await expect(page).toHaveURL(/\/back/, { timeout: 15_000 })
}

test('E2E-BACK-STUDENT-01: 学员管理页可访问', async ({ page }) => {
  await loginAsAdmin(page)
  await page.getByText('用户与人员').click()
  await page.getByRole('link', { name: '学员管理' }).click()
  await expect(page).toHaveURL(/\/back\/student-list/, { timeout: 15_000 })
  await expect(page.getByRole('button', { name: '新增学员' })).toBeVisible()
})
