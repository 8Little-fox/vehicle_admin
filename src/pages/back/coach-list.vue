<script setup lang="ts">
import type { Coach } from '~/types/driving-school'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import ColorColumn from '~/components/ColorColumn.vue'
import { useCoachStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const store = useCoachStore()
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
    changeModal.value.click_num = changeModal.value.click_num ?? 0
    changeModal.value.enabled = changeModal.value.enabled ?? 1
  }
  changeModal.value.avatar = (changeModal.value.avatar ?? '').trim()
  saveForm()
}

const columns = [
  {
    title: '头像',
    key: 'avatar',
    width: 72,
    render: (row: Coach) => {
      if (row.avatar)
        return h('img', { src: row.avatar, class: 'h-9 w-9 rounded-full object-cover border border-slate-200', alt: '' })
      return h('div', { class: 'flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800' }, row.name.slice(0, 1))
    },
  },
  { title: '用户名', key: 'username' },
  { title: '姓名', key: 'name' },
  { title: '教龄', key: 'teach_age' },
  {
    title: '状态',
    key: 'enabled',
    render: (row: Coach) => h(ColorColumn, { text: row.enabled === 1 ? '在职' : '停用', danger: row.enabled !== 1 }),
  },
  {
    title: '操作',
    key: 'action',
    render: (row: Coach, index: number) =>
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
      新增教练
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
        <n-form-item label="手机">
          <n-input v-model:value="changeModal.phone" />
        </n-form-item>
        <n-form-item label="性别">
          <n-select v-model:value="changeModal.gender" :options="[{ label: '男', value: '男' }, { label: '女', value: '女' }]" />
        </n-form-item>
        <n-form-item label="年龄">
          <n-input-number v-model:value="changeModal.age" class="w-full" :min="1" />
        </n-form-item>
        <n-form-item label="教龄">
          <n-input-number v-model:value="changeModal.teach_age" class="w-full" :min="0" />
        </n-form-item>
        <n-form-item label="简介">
          <n-input v-model:value="changeModal.intro" type="textarea" :rows="3" />
        </n-form-item>
        <n-form-item label="在职">
          <n-switch :value="changeModal.enabled === 1" @update:value="(v: boolean) => (changeModal.enabled = v ? 1 : 0)" />
        </n-form-item>
      </n-form>
    </BackCrudModal>
  </div>
</template>
