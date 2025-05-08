<template>
  <div class="appointments-container">
    <a-row :gutter="16">
      <a-col :span="24">
        <a-card title="职务任免">
          <template #extra>
            <a-button type="primary" @click="showAddModal">新增任免</a-button>
          </template>
          
          <a-table
            :columns="columns"
            :dataSource="appointments"
            :pagination="{ pageSize: 10 }"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <a-space>
                  <a @click="viewAppointment(record)">查看</a>
                  <a @click="editAppointment(record)">编辑</a>
                  <a-popconfirm
                    title="确定要删除这条记录吗？"
                    @confirm="deleteAppointment(record)"
                  >
                    <a class="text-danger">删除</a>
                  </a-popconfirm>
                </a-space>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>

    <a-modal
      v-model:visible="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        layout="vertical"
      >
        <a-form-item label="人员" name="personId">
          <a-select v-model:value="formState.personId" placeholder="请选择人员">
            <a-select-option v-for="person in personList" :key="person.id" :value="person.id">
              {{ person.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="原职务" name="previousPosition">
          <a-input v-model:value="formState.previousPosition" />
        </a-form-item>
        <a-form-item label="新职务" name="newPosition">
          <a-input v-model:value="formState.newPosition" />
        </a-form-item>
        <a-form-item label="任免类型" name="type">
          <a-select v-model:value="formState.type">
            <a-select-option value="任命">任命</a-select-option>
            <a-select-option value="免职">免职</a-select-option>
            <a-select-option value="调任">调任</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="任免时间" name="appointmentTime">
          <a-date-picker
            v-model:value="formState.appointmentTime"
            format="YYYY-MM-DD"
          />
        </a-form-item>
        <a-form-item label="任免文号" name="documentNumber">
          <a-input v-model:value="formState.documentNumber" />
        </a-form-item>
        <a-form-item label="任免原因" name="reason">
          <a-textarea
            v-model:value="formState.reason"
            :rows="4"
            placeholder="请输入任免原因"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableProps } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'

interface Appointment {
  id: string
  personId: string
  personName: string
  previousPosition: string
  newPosition: string
  type: string
  appointmentTime: string
  documentNumber: string
  reason: string
}

const columns = [
  {
    title: '人员',
    dataIndex: 'personName',
    key: 'personName'
  },
  {
    title: '原职务',
    dataIndex: 'previousPosition',
    key: 'previousPosition'
  },
  {
    title: '新职务',
    dataIndex: 'newPosition',
    key: 'newPosition'
  },
  {
    title: '任免类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '任免时间',
    dataIndex: 'appointmentTime',
    key: 'appointmentTime'
  },
  {
    title: '任免文号',
    dataIndex: 'documentNumber',
    key: 'documentNumber'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 200
  }
]

const appointments = ref<Appointment[]>([])
const modalVisible = ref(false)
const modalTitle = ref('新增任免')
const formRef = ref<FormInstance>()
const personList = ref([
  { id: '1', name: '张三' },
  { id: '2', name: '李四' },
  { id: '3', name: '王五' }
])

const formState = reactive({
  id: '',
  personId: '',
  previousPosition: '',
  newPosition: '',
  type: '',
  appointmentTime: '',
  documentNumber: '',
  reason: ''
})

const rules = {
  personId: [{ required: true, message: '请选择人员' }],
  previousPosition: [{ required: true, message: '请输入原职务' }],
  newPosition: [{ required: true, message: '请输入新职务' }],
  type: [{ required: true, message: '请选择任免类型' }],
  appointmentTime: [{ required: true, message: '请选择任免时间' }],
  documentNumber: [{ required: true, message: '请输入任免文号' }],
  reason: [{ required: true, message: '请输入任免原因' }]
}

const showAddModal = () => {
  modalTitle.value = '新增任免'
  formState.id = ''
  formState.personId = ''
  formState.previousPosition = ''
  formState.newPosition = ''
  formState.type = ''
  formState.appointmentTime = ''
  formState.documentNumber = ''
  formState.reason = ''
  modalVisible.value = true
}

const viewAppointment = (record: Appointment) => {
  // TODO: 实现查看详情功能
}

const editAppointment = (record: Appointment) => {
  modalTitle.value = '编辑任免'
  formState.id = record.id
  formState.personId = record.personId
  formState.previousPosition = record.previousPosition
  formState.newPosition = record.newPosition
  formState.type = record.type
  formState.appointmentTime = record.appointmentTime
  formState.documentNumber = record.documentNumber
  formState.reason = record.reason
  modalVisible.value = true
}

const deleteAppointment = (record: Appointment) => {
  // TODO: 实现删除功能
}

const handleModalOk = async () => {
  try {
    await formRef.value?.validate()
    // TODO: 实现保存功能
    modalVisible.value = false
  } catch (error) {
    console.error('Validation failed:', error)
  }
}

const handleModalCancel = () => {
  modalVisible.value = false
}

const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
  // TODO: 实现表格排序、筛选等功能
}
</script>

<style scoped>
.appointments-container {
  padding: 24px;
}

.text-danger {
  color: #ff4d4f;
}
</style> 