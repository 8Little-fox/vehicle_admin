<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const router = useRouter()
const message = useMessage()
const { dataList, addData } = useStudentStore()

const form = reactive({
  username: '',
  password: '',
  name: '',
  gender: '男',
  age: 22,
  id_card: '',
  phone: '',
  address: '',
  car_type: 'C1',
  avatar: '',
})

const loading = ref(false)

function submit() {
  if (!form.username.trim() || !form.password) {
    message.warning('请填写用户名和密码')
    return
  }
  if (dataList.value.some(p => p.username === form.username.trim())) {
    message.error('用户名已存在')
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false
    addData({
      id: nextNumericId(dataList.value),
      username: form.username.trim(),
      password: form.password,
      name: form.name || form.username.trim(),
      gender: form.gender,
      age: Number(form.age) || 18,
      id_card: form.id_card || '-',
      phone: form.phone || '-',
      address: form.address || '-',
      car_type: form.car_type || 'C1',
      avatar: (form.avatar || '').trim(),
      status: '在训',
    })
    message.success('注册成功，请使用学员身份登录')
    router.replace('/login')
  }, 200)
}
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-y-auto bg-slate-100 px-4 py-10 sm:px-8">
    <div
      class="relative z-10 my-auto w-full max-w-lg max-h-[min(100vh-2rem,900px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10"
    >
      <h1 class="mb-2 text-center text-xl font-semibold text-slate-800">
        学员注册
      </h1>
      <p class="mb-6 text-center text-sm text-slate-600">
        用户注册：用户名、密码、姓名、性别、年龄、身份证、手机、地址、报名车型
      </p>
      <n-form label-placement="left" label-width="96">
        <n-form-item label="用户名">
          <n-input v-model:value="form.username" placeholder="登录用户名" />
        </n-form-item>
        <n-form-item label="密码">
          <n-input v-model:value="form.password" type="password" show-password-on="click" />
        </n-form-item>
        <n-form-item label="姓名">
          <n-input v-model:value="form.name" />
        </n-form-item>
        <n-form-item label="性别">
          <n-select v-model:value="form.gender" :options="[{ label: '男', value: '男' }, { label: '女', value: '女' }]" />
        </n-form-item>
        <n-form-item label="年龄">
          <n-input-number v-model:value="form.age" class="w-full" :min="1" :max="80" />
        </n-form-item>
        <n-form-item label="身份证">
          <n-input v-model:value="form.id_card" />
        </n-form-item>
        <n-form-item label="手机">
          <n-input v-model:value="form.phone" />
        </n-form-item>
        <n-form-item label="地址">
          <n-input v-model:value="form.address" />
        </n-form-item>
        <n-form-item label="报名车型">
          <n-select v-model:value="form.car_type" :options="[{ label: 'C1', value: 'C1' }, { label: 'C2', value: 'C2' }]" />
        </n-form-item>
        <n-form-item label="头像">
          <n-input v-model:value="form.avatar" placeholder="选填：图片 URL" />
        </n-form-item>
        <n-space justify="space-between" class="mt-4">
          <n-button size="large" @click="router.push('/login')">
            返回登录
          </n-button>
          <n-button type="primary" size="large" :loading="loading" @click="submit">
            提交注册
          </n-button>
        </n-space>
      </n-form>
    </div>
  </div>
</template>
