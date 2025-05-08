<template>
  <a-card :title="title">
    <a-descriptions :column="2">
      <a-descriptions-item label="岗位名称">{{ position.name }}</a-descriptions-item>
      <a-descriptions-item label="岗位代码">{{ position.code }}</a-descriptions-item>
      <a-descriptions-item label="所属部门">{{ position.department }}</a-descriptions-item>
      <a-descriptions-item label="岗位级别">{{ position.level }}</a-descriptions-item>
      <a-descriptions-item label="编制人数">{{ position.quota }}</a-descriptions-item>
      <a-descriptions-item label="现有人数">{{ position.currentCount }}</a-descriptions-item>
    </a-descriptions>

    <a-divider>岗位职责</a-divider>
    <a-list :dataSource="position.responsibilities" :pagination="false">
      <template #renderItem="{ item }">
        <a-list-item>{{ item }}</a-list-item>
      </template>
    </a-list>

    <a-divider>任职要求</a-divider>
    <a-descriptions :column="1">
      <a-descriptions-item label="学历要求">{{ position.requirements.education }}</a-descriptions-item>
      <a-descriptions-item label="专业要求">{{ position.requirements.major }}</a-descriptions-item>
      <a-descriptions-item label="工作经验">{{ position.requirements.experience }}</a-descriptions-item>
      <a-descriptions-item label="技能要求">
        <a-tag v-for="skill in position.requirements.skills" :key="skill">
          {{ skill }}
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="其他要求">{{ position.requirements.others }}</a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script setup lang="ts">
interface Requirements {
  education: string
  major: string
  experience: string
  skills: string[]
  others: string
}

interface Position {
  name: string
  code: string
  department: string
  level: string
  quota: number
  currentCount: number
  responsibilities: string[]
  requirements: Requirements
}

const props = defineProps<{
  position: Position
  title?: string
}>()
</script> 