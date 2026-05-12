<script setup lang="ts">
import type { FeeRecord } from '~/types/driving-school'
import { h } from 'vue'
import ActionButton from '~/components/ActionButton.vue'
import BackCrudModal from '~/components/BackCrudModal.vue'
import { useFeeStore, useStudentStore } from '~/store'
import { nextNumericId } from '~/utils/driving-school'

const { dataList: students } = useStudentStore()
const store = useFeeStore()
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

function stName(id: number) {
  return students.value.find(s => s.id === id)?.name ?? id
}

function confirmSave() {
  if (!isUpdate.value) {
    changeModal.value.id = nextNumericId(dataList.value)
    changeModal.value.pay_status = changeModal.value.pay_status ?? '待支付'
    changeModal.value.pay_time = changeModal.value.pay_time ?? null
    changeModal.value.invoice = changeModal.value.invoice ?? ''
  }
  saveForm()
}

const columns = [
  { title: '学员', key: 'student_id', render: (row: FeeRecord) => stName(row.student_id) },
  { title: '费用名称', key: 'fee_name' },
  { title: '金额', key: 'fee_amount' },
  { title: '支付状态', key: 'pay_status' },
  {
    title: '操作',
    key: 'action',
    render: (row: FeeRecord, index: number) =>
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
      新增费用记录
    </n-button>
    <n-data-table :columns="columns" :data="dataList" :pagination="{ page, onUpdatePage }" />
    <BackCrudModal v-model:show="openModalState" :title="updateTitle" card-class="!max-w-[560px]" @confirm="confirmSave" @cancel="closeModal">
      <n-form :model="changeModal" label-width="100px">
        <n-form-item label="学员">
          <n-select v-model:value="changeModal.student_id" :options="students.map(s => ({ label: s.name, value: s.id }))" />
        </n-form-item>
        <n-form-item label="费用名称">
          <n-input v-model:value="changeModal.fee_name" />
        </n-form-item>
        <n-form-item label="金额">
          <n-input-number v-model:value="changeModal.fee_amount" class="w-full" :min="0" :step="10" />
        </n-form-item>
        <n-form-item label="类型">
          <n-input v-model:value="changeModal.fee_type" />
        </n-form-item>
        <n-form-item label="支付状态">
          <n-select
            v-model:value="changeModal.pay_status"
            :options="[{ label: '待支付', value: '待支付' }, { label: '已支付', value: '已支付' }]"
          />
        </n-form-item>
      </n-form>
    </BackCrudModal>
  </div>
</template>
