<template>
  <div class="archive-container">
    <a-row :gutter="16">
      <a-col :span="24">
        <a-card title="会议纪要">
          <template #extra>
            <a-button type="primary" @click="showAddModal">新增会议</a-button>
          </template>
          
          <a-table
            :columns="columns"
            :dataSource="meetings"
            :pagination="{ pageSize: 10 }"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <a-space>
                  <a @click="viewMeeting(record)">查看</a>
                  <a @click="editMeeting(record)">编辑</a>
                  <a-popconfirm
                    title="确定要删除这条记录吗？"
                    @confirm="deleteMeeting(record)"
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
        <a-form-item label="会议主题" name="title">
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item label="会议时间" name="meetingTime">
          <a-date-picker
            v-model:value="formState.meetingTime"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item label="参会人员" name="participants">
          <a-select
            v-model:value="formState.participants"
            mode="multiple"
            placeholder="请选择参会人员"
          >
            <a-select-option v-for="person in personList" :key="person.id" :value="person.id">
              {{ person.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="会议地点" name="location">
          <a-input v-model:value="formState.location" />
        </a-form-item>
        <a-form-item label="会议纪要" name="content">
          <a-textarea
            v-model:value="formState.content"
            :rows="6"
            placeholder="请输入会议纪要内容"
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

interface Meeting {
  id: string
  title: string
  meetingTime: string
  participants: string[]
  location: string
  content: string
}

const columns = [
  {
    title: '会议主题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '会议时间',
    dataIndex: 'meetingTime',
    key: 'meetingTime'
  },
  {
    title: '参会人员',
    dataIndex: 'participants',
    key: 'participants',
    customRender: ({ text }: { text: string[] }) => {
      return text.join(', ')
    }
  },
  {
    title: '会议地点',
    dataIndex: 'location',
    key: 'location'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 200
  }
]

const meetings = ref<Meeting[]>([])
const modalVisible = ref(false)
const modalTitle = ref('新增会议')
const formRef = ref<FormInstance>()
const personList = ref([
  { id: '1', name: '张三' },
  { id: '2', name: '李四' },
  { id: '3', name: '王五' }
])

const formState = reactive({
  id: '',
  title: '',
  meetingTime: '',
  participants: [] as string[],
  location: '',
  content: ''
})

const rules = {
  title: [{ required: true, message: '请输入会议主题' }],
  meetingTime: [{ required: true, message: '请选择会议时间' }],
  participants: [{ required: true, message: '请选择参会人员' }],
  location: [{ required: true, message: '请输入会议地点' }],
  content: [{ required: true, message: '请输入会议纪要内容' }]
}

const showAddModal = () => {
  modalTitle.value = '新增会议'
  formState.id = ''
  formState.title = ''
  formState.meetingTime = ''
  formState.participants = []
  formState.location = ''
  formState.content = ''
  modalVisible.value = true
}

const viewMeeting = (record: Meeting) => {
  // TODO: 实现查看详情功能
}

const editMeeting = (record: Meeting) => {
  modalTitle.value = '编辑会议'
  formState.id = record.id
  formState.title = record.title
  formState.meetingTime = record.meetingTime
  formState.participants = record.participants
  formState.location = record.location
  formState.content = record.content
  modalVisible.value = true
}

const deleteMeeting = (record: Meeting) => {
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
.archive-container {
  padding: 24px;
}

.text-danger {
  color: #ff4d4f;
}
</style> 