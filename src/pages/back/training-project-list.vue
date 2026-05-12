<script setup lang="ts">
import type { TrainingProject } from '~/types/driving-school'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import { useCoachStore, useSiteStore, useTrainingProjectStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const { dataList: coaches } = useCoachStore()
const { dataList: sites } = useSiteStore()
const store = useTrainingProjectStore()
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

function coachName(id: number) {
  return coaches.value.find(c => c.id === id)?.name ?? id
}
function siteName(id: number) {
  return sites.value.find(s => s.id === id)?.site_name ?? id
}

function confirmSave() {
  if (!isUpdate.value) {
    changeModal.value.id = nextNumericId(dataList.value)
    changeModal.value.booked_num = changeModal.value.booked_num ?? 0
    changeModal.value.status = changeModal.value.status ?? '可预约'
  }
  saveForm()
}

const columns = [
  { title: '项目', key: 'project_name' },
  { title: '教练', key: 'coach_id', render: (row: TrainingProject) => coachName(row.coach_id) },
  { title: '场地', key: 'site_id', render: (row: TrainingProject) => siteName(row.site_id) },
  { title: '日期', key: 'train_date' },
  { title: '名额', key: 'booked_num', render: (row: TrainingProject) => `${row.booked_num}/${row.max_num}` },
  { title: '状态', key: 'status' },
  {
    title: '操作',
    key: 'action',
    render: (row: TrainingProject, index: number) =>
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
      新增练车项目
    </n-button>
    <n-data-table :columns="columns" :data="dataList" :pagination="{ page, onUpdatePage }" />
    <BackCrudModal v-model:show="openModalState" :title="updateTitle" card-class="!max-w-[560px]" @confirm="confirmSave" @cancel="closeModal">
      <n-form :model="changeModal" label-width="100px">
        <n-form-item label="项目名称">
          <n-input v-model:value="changeModal.project_name" />
        </n-form-item>
        <n-form-item label="科目">
          <n-input v-model:value="changeModal.subject" />
        </n-form-item>
        <n-form-item label="车型">
          <n-input v-model:value="changeModal.car_type" />
        </n-form-item>
        <n-form-item label="教练">
          <n-select v-model:value="changeModal.coach_id" :options="coaches.map(c => ({ label: c.name, value: c.id }))" />
        </n-form-item>
        <n-form-item label="场地">
          <n-select v-model:value="changeModal.site_id" :options="sites.map(s => ({ label: s.site_name, value: s.id }))" />
        </n-form-item>
        <n-form-item label="练车日期">
          <n-input v-model:value="changeModal.train_date" />
        </n-form-item>
        <n-form-item label="时段">
          <n-input v-model:value="changeModal.train_time" />
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
            :options="[{ label: '可预约', value: '可预约' }, { label: '已满', value: '已满' }, { label: '已结束', value: '已结束' }]"
          />
        </n-form-item>
      </n-form>
    </BackCrudModal>
  </div>
</template>
