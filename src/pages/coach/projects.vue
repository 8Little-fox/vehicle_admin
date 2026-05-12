<script setup lang="ts">
import type { TrainingProject } from '~/types/driving-school'
import { useMessage } from 'naive-ui'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import { useLoginStore, useSiteStore, useTrainingProjectStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const message = useMessage()
const { currentProfile } = useLoginStore()
const { dataList: sites } = useSiteStore()
const store = useTrainingProjectStore()
const {
  dataList,
  openModalState,
  openModal,
  updateTitle,
  closeModal,
  changeModal,
  saveForm,
  isUpdate,
  removeData,
} = store

const cid = computed(() => currentProfile.value?.id ?? 0)

const rows = computed(() => dataList.value.filter(p => p.coach_id === cid.value))

const columns = [
  { title: '名称', key: 'project_name' },
  { title: '日期', key: 'train_date' },
  { title: '时段', key: 'train_time' },
  {
    title: '名额',
    key: 'booked_num',
    render: (row: TrainingProject) => `${row.booked_num}/${row.max_num}`,
  },
  { title: '状态', key: 'status' },
  {
    title: '操作',
    key: 'action',
    render: (row: TrainingProject) => {
      const gIdx = dataList.value.findIndex(x => x.id === row.id)
      return h(ActionButton, {
        onEdit: () => openModal(row, gIdx),
        onDelete: () => {
          if (gIdx >= 0)
            removeData(gIdx)
        },
        isDel: true,
      })
    },
  },
]

function confirmSave() {
  if (!isUpdate.value) {
    changeModal.value.id = nextNumericId(dataList.value)
    changeModal.value.coach_id = cid.value
    changeModal.value.booked_num = changeModal.value.booked_num ?? 0
    changeModal.value.status = changeModal.value.status ?? '可预约'
  }
  saveForm()
}

function openNew() {
  if (!cid.value) {
    message.error('未登录')
    return
  }
  openModal({
    id: 0,
    project_name: '',
    subject: '科目二',
    car_type: 'C1',
    site_id: sites.value[0]?.id ?? 1,
    coach_id: cid.value,
    train_date: '',
    train_time: '',
    max_num: 4,
    booked_num: 0,
    status: '可预约',
  } as TrainingProject)
}
</script>

<template>
  <div>
    <h3 class="mb-4 text-lg font-semibold">
      教练练车项目管理
    </h3>
    <n-button type="primary" class="!mb-4" @click="openNew">
      新增练车项目
    </n-button>
    <n-data-table :columns="columns" :data="rows" :row-key="(r: TrainingProject) => r.id" />
    <BackCrudModal
      v-model:show="openModalState"
      :title="updateTitle"
      card-class="!max-w-[560px]"
      @confirm="confirmSave"
      @cancel="closeModal"
    >
      <n-form :model="changeModal" label-width="100">
        <n-form-item label="项目名称">
          <n-input v-model:value="changeModal.project_name" />
        </n-form-item>
        <n-form-item label="科目">
          <n-input v-model:value="changeModal.subject" />
        </n-form-item>
        <n-form-item label="车型">
          <n-input v-model:value="changeModal.car_type" />
        </n-form-item>
        <n-form-item label="场地">
          <n-select
            v-model:value="changeModal.site_id"
            :options="sites.map(s => ({ label: s.site_name, value: s.id }))"
          />
        </n-form-item>
        <n-form-item label="练车日期">
          <n-input v-model:value="changeModal.train_date" placeholder="YYYY-MM-DD" />
        </n-form-item>
        <n-form-item label="时段">
          <n-input v-model:value="changeModal.train_time" />
        </n-form-item>
        <n-form-item label="可约人数">
          <n-input-number v-model:value="changeModal.max_num" class="w-full" :min="1" />
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
