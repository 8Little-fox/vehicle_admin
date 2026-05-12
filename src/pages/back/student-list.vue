<script setup lang="ts">
import type { Student } from '~/types/driving-school'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import ColorColumn from '~/components/ColorColumn.vue'
import { useStudentStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const store = useStudentStore()
const {
  dataList,
  page,
  onUpdatePage,
  removeData,
  openModalState,
  openModal,
  updateTitle,
  closeModal,
  changeModal,
  saveForm,
  updateDataIndex,
  isUpdate,
} = store

function confirmSave() {
  if (!isUpdate.value) {
    changeModal.value.id = nextNumericId(dataList.value)
    changeModal.value.status = changeModal.value.status ?? '在训'
  }
  changeModal.value.avatar = (changeModal.value.avatar ?? '').trim()
  saveForm()
}

const columns = [
  {
    title: '头像',
    key: 'avatar',
    width: 72,
    render: (row: Student) => {
      if (row.avatar)
        return h('img', { src: row.avatar, class: 'h-9 w-9 rounded-full object-cover border border-slate-200', alt: '' })
      return h('div', { class: 'flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800' }, row.name.slice(0, 1))
    },
  },
  { title: '用户名', key: 'username' },
  { title: '姓名', key: 'name' },
  { title: '手机', key: 'phone' },
  { title: '车型', key: 'car_type' },
  {
    title: '状态',
    key: 'status',
    render: (row: Student) => h(ColorColumn, { text: row.status, danger: row.status === '停训' }),
  },
  {
    title: '操作',
    key: 'action',
    render: (row: Student, index: number) =>
      h(ActionButton, {
        onDelete: () => removeData(index),
        isDel: true,
        onEdit: () => openModal(row, index),
      }),
  },
]
</script>

<template>
  <div>
    <n-button type="primary" class="!mb-4" @click="openModal()">
      新增学员
    </n-button>
    <n-data-table :columns="columns" :data="dataList" :pagination="{ page, onUpdatePage }" />
    <BackCrudModal
      v-model:show="openModalState"
      :title="updateTitle"
      card-class="!max-w-[560px]"
      @confirm="confirmSave"
      @cancel="closeModal"
    >
      <n-form :model="changeModal" label-width="96px">
        <n-form-item label="用户名">
          <n-input v-model:value="changeModal.username" :disabled="updateDataIndex >= 0" />
        </n-form-item>
        <n-form-item label="密码">
          <n-input v-model:value="changeModal.password" type="password" show-password-on="click" />
        </n-form-item>
        <n-form-item label="头像">
          <n-input v-model:value="changeModal.avatar" placeholder="图片 URL，可留空" />
        </n-form-item>
        <n-form-item v-if="changeModal.avatar" label="预览">
          <img :src="changeModal.avatar" class="h-16 w-16 rounded-full border border-slate-200 object-cover" alt="">
        </n-form-item>
        <n-form-item label="姓名">
          <n-input v-model:value="changeModal.name" />
        </n-form-item>
        <n-form-item label="性别">
          <n-select v-model:value="changeModal.gender" :options="[{ label: '男', value: '男' }, { label: '女', value: '女' }]" />
        </n-form-item>
        <n-form-item label="年龄">
          <n-input-number v-model:value="changeModal.age" class="w-full" :min="1" />
        </n-form-item>
        <n-form-item label="身份证">
          <n-input v-model:value="changeModal.id_card" />
        </n-form-item>
        <n-form-item label="手机">
          <n-input v-model:value="changeModal.phone" />
        </n-form-item>
        <n-form-item label="地址">
          <n-input v-model:value="changeModal.address" />
        </n-form-item>
        <n-form-item label="报名车型">
          <n-input v-model:value="changeModal.car_type" />
        </n-form-item>
        <n-form-item label="学员状态">
          <n-select
            v-model:value="changeModal.status"
            :options="[{ label: '在训', value: '在训' }, { label: '毕业', value: '毕业' }, { label: '停训', value: '停训' }]"
          />
        </n-form-item>
      </n-form>
    </BackCrudModal>
  </div>
</template>
