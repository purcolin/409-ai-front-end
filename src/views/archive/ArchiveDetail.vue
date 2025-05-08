<template>
  <div>
    <app-header />
    <div class="archive-detail">
      <a-card>
        <template #title>
          <div class="header">
            <div class="title-section">
              <h2>{{ meeting.title }}</h2>
              <div class="meta">
                <span class="time">
                  <clock-circle-outlined />
                  {{ formatTime(meeting.meetingTime) }}
                </span>
                <span class="location">
                  <environment-outlined />
                  {{ meeting.location }}
                </span>
                <a-tag :color="getStatusColor(meeting.status)">
                  {{ meeting.status }}
                </a-tag>
              </div>
            </div>
            <div class="actions">
              <a-button @click="goBack">
                <template #icon><arrow-left-outlined /></template>
                返回列表
              </a-button>
              <a-button type="primary" @click="editMeeting">
                <template #icon><edit-outlined /></template>
                编辑
              </a-button>
              <a-button type="primary" @click="exportMeeting">
                <template #icon><export-outlined /></template>
                导出
              </a-button>
            </div>
          </div>
        </template>

        <div class="content">
          <div class="section">
            <h3>参会人员</h3>
            <div class="participants">
              <a-tag v-for="person in meeting.participants" :key="person.id">
                {{ person.name }}
              </a-tag>
            </div>
          </div>

          <div class="section">
            <h3>会议纪要</h3>
            <div class="meeting-content">
              <p>{{ meeting.content }}</p>
            </div>
          </div>

          <div class="section">
            <h3>相关附件</h3>
            <div class="attachments">
              <a-empty v-if="!meeting.attachments?.length" description="暂无附件" />
              <div v-else class="attachment-list">
                <div v-for="file in meeting.attachments" :key="file.id" class="attachment-item">
                  <file-outlined />
                  <span class="file-name">{{ file.name }}</span>
                  <a-space>
                    <a @click="previewFile(file)">预览</a>
                    <a @click="downloadFile(file)">下载</a>
                  </a-space>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <h3>操作记录</h3>
            <a-timeline>
              <a-timeline-item v-for="record in meeting.operationRecords" :key="record.id">
                <template #dot>
                  <user-outlined />
                </template>
                <p>{{ record.operator }} {{ record.action }} 于 {{ formatTime(record.time) }}</p>
                <p v-if="record.comment" class="comment">{{ record.comment }}</p>
              </a-timeline-item>
            </a-timeline>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  ExportOutlined,
  FileOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import dayjs from 'dayjs'

interface Meeting {
  id: string
  title: string
  meetingTime: string
  participants: Array<{
    id: string
    name: string
  }>
  location: string
  content: string
  status: string
  attachments?: Array<{
    id: string
    name: string
    url: string
  }>
  operationRecords?: Array<{
    id: string
    operator: string
    action: string
    time: string
    comment?: string
  }>
}

const route = useRoute()
const router = useRouter()
const meeting = ref<Meeting>({
  id: '',
  title: '',
  meetingTime: '',
  participants: [],
  location: '',
  content: '',
  status: '',
  attachments: [],
  operationRecords: []
})

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    '已发布': 'success',
    '草稿': 'warning',
    '已归档': 'default'
  }
  return colorMap[status] || 'default'
}

const formatTime = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

const goBack = () => {
  router.push('/archive')
}

const editMeeting = () => {
  router.push(`/archive/${meeting.value.id}/edit`)
}

const exportMeeting = () => {
  // TODO: 实现导出功能
}

const previewFile = (file: { id: string; url: string }) => {
  // TODO: 实现文件预览功能
}

const downloadFile = (file: { id: string; url: string }) => {
  // TODO: 实现文件下载功能
}

onMounted(async () => {
  const id = route.params.id as string
  // TODO: 根据ID获取会议详情
  // 这里先使用模拟数据
  meeting.value = {
    id,
    title: '2024年第一季度工作总结会议',
    meetingTime: '2024-03-15 14:00:00',
    participants: [
      { id: '1', name: '张三' },
      { id: '2', name: '李四' },
      { id: '3', name: '王五' }
    ],
    location: '会议室A',
    content: '本次会议主要讨论了第一季度的工作总结和下一季度的工作计划...',
    status: '已发布',
    attachments: [
      { id: '1', name: '会议PPT.pptx', url: '#' },
      { id: '2', name: '会议记录.docx', url: '#' }
    ],
    operationRecords: [
      {
        id: '1',
        operator: '张三',
        action: '创建',
        time: '2024-03-15 14:00:00'
      },
      {
        id: '2',
        operator: '李四',
        action: '修改',
        time: '2024-03-15 15:30:00',
        comment: '更新了会议纪要内容'
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.archive-detail {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    
    .title-section {
      h2 {
        margin: 0 0 8px 0;
      }
      
      .meta {
        display: flex;
        align-items: center;
        gap: 16px;
        color: #666;
        
        .time, .location {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
    
    .actions {
      display: flex;
      gap: 8px;
    }
  }
  
  .content {
    .section {
      margin-bottom: 24px;
      
      h3 {
        font-size: 16px;
        margin-bottom: 16px;
        color: #333;
      }
      
      .participants {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .meeting-content {
        line-height: 1.8;
        color: #333;
      }
      
      .attachments {
        .attachment-list {
          .attachment-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px;
            border: 1px solid #f0f0f0;
            border-radius: 4px;
            margin-bottom: 8px;
            
            .file-name {
              flex: 1;
            }
          }
        }
      }
      
      .comment {
        color: #666;
        margin-top: 4px;
        padding-left: 24px;
      }
    }
  }
}
</style> 