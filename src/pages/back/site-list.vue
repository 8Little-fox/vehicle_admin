<script setup lang="ts">
import type { Site } from '~/types/driving-school'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import { useSiteStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const store = useSiteStore()
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
    changeModal.value.longitude = Number(changeModal.value.longitude) || 0
    changeModal.value.latitude = Number(changeModal.value.latitude) || 0
    changeModal.value.capacity = Number(changeModal.value.capacity) || 0
  }
  saveForm()
}

const columns = [
  { title: '场地名称', key: 'site_name' },
  { title: '地址', key: 'site_address' },
  { title: '容纳', key: 'capacity' },
  {
    title: '操作',
    key: 'action',
    render: (row: Site, index: number) =>
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
      新增场地
    </n-button>
    <n-data-table :columns="columns" :data="dataList" :pagination="{ page, onUpdatePage }" />
    <BackCrudModal v-model:show="openModalState" :title="updateTitle" card-class="!max-w-[560px]" @confirm="confirmSave" @cancel="closeModal">
      <n-form :model="changeModal" label-width="100px">
        <n-form-item label="场地名称">
          <n-input v-model:value="changeModal.site_name" />
        </n-form-item>
        <n-form-item label="地址">
          <n-input v-model:value="changeModal.site_address" />
        </n-form-item>
        <n-form-item label="经度">
          <n-input-number v-model:value="changeModal.longitude" class="w-full" :step="0.0001" />
        </n-form-item>
        <n-form-item label="纬度">
          <n-input-number v-model:value="changeModal.latitude" class="w-full" :step="0.0001" />
        </n-form-item>
        <n-form-item label="容纳人数">
          <n-input-number v-model:value="changeModal.capacity" class="w-full" :min="1" />
        </n-form-item>
        <n-form-item label="简介">
          <n-input v-model:value="changeModal.site_intro" type="textarea" :rows="3" />
        </n-form-item>
      </n-form>
    </BackCrudModal>
  </div>
</template>
