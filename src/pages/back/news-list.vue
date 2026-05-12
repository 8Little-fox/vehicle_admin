<script setup lang="ts">
import type { NewsItem } from '~/types/driving-school'
import dayjs from 'dayjs'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import { useNewsStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const store = useNewsStore()
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
    changeModal.value.publish_time = dayjs().format('YYYY-MM-DD HH:mm')
    changeModal.value.cover = changeModal.value.cover ?? ''
  }
  saveForm()
}

const columns = [
  { title: '标题', key: 'title' },
  { title: '发布时间', key: 'publish_time' },
  {
    title: '操作',
    key: 'action',
    render: (row: NewsItem, index: number) =>
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
      新增公告
    </n-button>
    <n-data-table :columns="columns" :data="dataList" :pagination="{ page, onUpdatePage }" />
    <BackCrudModal v-model:show="openModalState" :title="updateTitle" card-class="!max-w-[560px]" @confirm="confirmSave" @cancel="closeModal">
      <n-form :model="changeModal" label-width="88px">
        <n-form-item label="标题">
          <n-input v-model:value="changeModal.title" />
        </n-form-item>
        <n-form-item label="摘要">
          <n-input v-model:value="changeModal.summary" />
        </n-form-item>
        <n-form-item label="正文">
          <n-input v-model:value="changeModal.content" type="textarea" :rows="5" />
        </n-form-item>
      </n-form>
    </BackCrudModal>
  </div>
</template>
