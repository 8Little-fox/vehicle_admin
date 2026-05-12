<script setup lang="ts">
import type { ExamInfo } from '~/types/driving-school'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import { useExamInfoStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const store = useExamInfoStore()
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
    changeModal.value.booked_num = changeModal.value.booked_num ?? 0
    changeModal.value.status = changeModal.value.status ?? '可预约'
  }
  saveForm()
}

const columns = [
  { title: '考试名称', key: 'exam_name' },
  { title: '科目', key: 'exam_subject' },
  { title: '日期', key: 'exam_date' },
  { title: '名额', key: 'booked_num', render: (row: ExamInfo) => `${row.booked_num}/${row.max_num}` },
  {
    title: '操作',
    key: 'action',
    render: (row: ExamInfo, index: number) =>
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
      新增考试信息
    </n-button>
    <n-data-table :columns="columns" :data="dataList" :pagination="{ page, onUpdatePage }" />
    <BackCrudModal v-model:show="openModalState" :title="updateTitle" card-class="!max-w-[560px]" @confirm="confirmSave" @cancel="closeModal">
      <n-form :model="changeModal" label-width="100px">
        <n-form-item label="考试名称">
          <n-input v-model:value="changeModal.exam_name" />
        </n-form-item>
        <n-form-item label="科目">
          <n-input v-model:value="changeModal.exam_subject" />
        </n-form-item>
        <n-form-item label="形式">
          <n-input v-model:value="changeModal.exam_type" />
        </n-form-item>
        <n-form-item label="地点">
          <n-input v-model:value="changeModal.exam_address" />
        </n-form-item>
        <n-form-item label="日期">
          <n-input v-model:value="changeModal.exam_date" />
        </n-form-item>
        <n-form-item label="可约人数">
          <n-input-number v-model:value="changeModal.max_num" class="w-full" :min="1" />
        </n-form-item>
        <n-form-item label="已约">
          <n-input-number v-model:value="changeModal.booked_num" class="w-full" :min="0" />
        </n-form-item>
        <n-form-item label="状态">
          <n-select
            v-model:value="changeModal.status"
            :options="[{ label: '可预约', value: '可预约' }, { label: '已满', value: '已满' }]"
          />
        </n-form-item>
      </n-form>
    </BackCrudModal>
  </div>
</template>
