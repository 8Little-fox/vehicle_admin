<script setup lang="ts">
import type { Vehicle } from '~/types/driving-school'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import { useVehicleStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const store = useVehicleStore()
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
    changeModal.value.status = changeModal.value.status ?? '空闲'
  }
  saveForm()
}

const columns = [
  { title: '名称', key: 'car_name' },
  { title: '车型', key: 'car_type' },
  { title: '车牌', key: 'car_num' },
  { title: '状态', key: 'status' },
  {
    title: '操作',
    key: 'action',
    render: (row: Vehicle, index: number) =>
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
      新增车辆
    </n-button>
    <n-data-table :columns="columns" :data="dataList" :pagination="{ page, onUpdatePage }" />
    <BackCrudModal v-model:show="openModalState" :title="updateTitle" @confirm="confirmSave" @cancel="closeModal">
      <n-form :model="changeModal" label-width="96px">
        <n-form-item label="车辆名称">
          <n-input v-model:value="changeModal.car_name" />
        </n-form-item>
        <n-form-item label="车型">
          <n-input v-model:value="changeModal.car_type" />
        </n-form-item>
        <n-form-item label="车牌号">
          <n-input v-model:value="changeModal.car_num" />
        </n-form-item>
        <n-form-item label="状态">
          <n-select
            v-model:value="changeModal.status"
            :options="[{ label: '空闲', value: '空闲' }, { label: '使用中', value: '使用中' }, { label: '维修', value: '维修' }]"
          />
        </n-form-item>
      </n-form>
    </BackCrudModal>
  </div>
</template>
