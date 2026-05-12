<script setup lang="ts">
import type { TeachingResource } from '~/types/driving-school'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import { useCoachStore, useTeachingResourceStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const { dataList: coaches } = useCoachStore()
const store = useTeachingResourceStore()
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
  isUpdate,
} = store

function confirmSave() {
  if (!isUpdate.value) {
    changeModal.value.id = nextNumericId(dataList.value)
    changeModal.value.click_num = changeModal.value.click_num ?? 0
    changeModal.value.coach_id = changeModal.value.coach_id ?? null
  }
  saveForm()
}

const columns = [
  { title: '标题', key: 'resource_name' },
  { title: '类型', key: 'resource_type' },
  { title: '点击', key: 'click_num' },
  {
    title: '操作',
    key: 'action',
    render: (row: TeachingResource, index: number) =>
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
      新增教学资源
    </n-button>
    <n-data-table :columns="columns" :data="dataList" :pagination="{ page, onUpdatePage }" />
    <BackCrudModal v-model:show="openModalState" :title="updateTitle" card-class="!max-w-[560px]" @confirm="confirmSave" @cancel="closeModal">
      <n-form :model="changeModal" label-width="100px">
        <n-form-item label="资源名称">
          <n-input v-model:value="changeModal.resource_name" />
        </n-form-item>
        <n-form-item label="类型">
          <n-input v-model:value="changeModal.resource_type" />
        </n-form-item>
        <n-form-item label="内容">
          <n-input v-model:value="changeModal.resource_content" type="textarea" :rows="4" />
        </n-form-item>
        <n-form-item label="发布教练">
          <n-select
            v-model:value="changeModal.coach_id"
            clearable
            :options="[{ label: '无（管理员）', value: null as any }, ...coaches.map(c => ({ label: c.name, value: c.id }))]"
          />
        </n-form-item>
      </n-form>
    </BackCrudModal>
  </div>
</template>
