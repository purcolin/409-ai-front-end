<template>
  <div class="awards-container">
    <a-row :gutter="16">
      <a-col :span="24">
        <a-card title="奖励荣誉">
          <template #extra>
            <a-button type="primary" @click="showAddModal">新增奖励</a-button>
          </template>
          
          <a-table
            :columns="columns"
            :dataSource="awards"
            :pagination="{ pageSize: 10 }"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <a-space>
                  <a @click="viewAward(record)">查看</a>
                  <a @click="editAward(record)">编辑</a>
                  <a-popconfirm
                    title="确定要删除这条记录吗？"
                    @confirm="deleteAward(record)"
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
        <a-form-item label="奖励名称" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="获奖人员" name="recipients">
          <a-select
            v-model:value="formState.recipients"
            mode="multiple"
            placeholder="请选择获奖人员"
          >
            <a-select-option v-for="person in personList" :key="person.id" :value="person.id">
              {{ person.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="奖励级别" name="level">
          <a-select v-model:value="formState.level">
            <a-select-option value="国家级">国家级</a-select-option>
            <a-select-option value="省级">省级</a-select-option>
            <a-select-option value="市级">市级</a-select-option>
            <a-select-option value="区级">区级</a-select-option>
            <a-select-option value="校级">校级</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="获奖时间" name="awardTime">
          <a-date-picker
            v-model:value="formState.awardTime"
            format="YYYY-MM-DD"
          />
        </a-form-item>
        <a-form-item label="颁奖单位" name="awardingUnit">
          <a-input v-model:value="formState.awardingUnit" />
        </a-form-item>
        <a-form-item label="奖励说明" name="description">
          <a-textarea
            v-model:value="formState.description"
            :rows="4"
            placeholder="请输入奖励说明"
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

interface Award {
  id: string
  name: string
  recipients: string[]
  level: string
  awardTime: string
  awardingUnit: string
  description: string
}

const columns = [
  {
    title: '奖励名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '获奖人员',
    dataIndex: 'recipients',
    key: 'recipients',
    customRender: ({ text }: { text: string[] }) => {
      return text.join(', ')
    }
  },
  {
    title: '奖励级别',
    dataIndex: 'level',
    key: 'level'
  },
  {
    title: '获奖时间',
    dataIndex: 'awardTime',
    key: 'awardTime'
  },
  {
    title: '颁奖单位',
    dataIndex: 'awardingUnit',
    key: 'awardingUnit'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 200
  }
]

const awards = ref<Award[]>([])
const modalVisible = ref(false)
const modalTitle = ref('新增奖励')
const formRef = ref<FormInstance>()
const personList = ref([
  { id: '1', name: '张三' },
  { id: '2', name: '李四' },
  { id: '3', name: '王五' }
])

const formState = reactive({
  id: '',
  name: '',
  recipients: [] as string[],
  level: '',
  awardTime: '',
  awardingUnit: '',
  description: ''
})

const rules = {
  name: [{ required: true, message: '请输入奖励名称' }],
  recipients: [{ required: true, message: '请选择获奖人员' }],
  level: [{ required: true, message: '请选择奖励级别' }],
  awardTime: [{ required: true, message: '请选择获奖时间' }],
  awardingUnit: [{ required: true, message: '请输入颁奖单位' }],
  description: [{ required: true, message: '请输入奖励说明' }]
}

const showAddModal = () => {
  modalTitle.value = '新增奖励'
  formState.id = ''
  formState.name = ''
  formState.recipients = []
  formState.level = ''
  formState.awardTime = ''
  formState.awardingUnit = ''
  formState.description = ''
  modalVisible.value = true
}

const viewAward = (record: Award) => {
  // TODO: 实现查看详情功能
}

const editAward = (record: Award) => {
  modalTitle.value = '编辑奖励'
  formState.id = record.id
  formState.name = record.name
  formState.recipients = record.recipients
  formState.level = record.level
  formState.awardTime = record.awardTime
  formState.awardingUnit = record.awardingUnit
  formState.description = record.description
  modalVisible.value = true
}

const deleteAward = (record: Award) => {
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
.awards-container {
  padding: 24px;
}

.text-danger {
  color: #ff4d4f;
}
</style> 