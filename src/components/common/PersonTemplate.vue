<template>
  <a-card :title="title">
    <a-descriptions :column="2">
      <a-descriptions-item label="姓名">{{ person.name }}</a-descriptions-item>
      <a-descriptions-item label="性别">{{ person.gender }}</a-descriptions-item>
      <a-descriptions-item label="出生日期">{{ person.birthDate }}</a-descriptions-item>
      <a-descriptions-item label="联系电话">{{ person.phone }}</a-descriptions-item>
      <a-descriptions-item label="邮箱">{{ person.email }}</a-descriptions-item>
      <a-descriptions-item label="所属部门">{{ person.department }}</a-descriptions-item>
    </a-descriptions>

    <a-divider>教育背景</a-divider>
    <a-table :dataSource="person.education" :columns="educationColumns" :pagination="false" />

    <a-divider>工作经历</a-divider>
    <a-table :dataSource="person.experience" :columns="experienceColumns" :pagination="false" />
  </a-card>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['person', 'title'])

const educationColumns = [
  {
    title: '学校',
    dataIndex: 'school',
    key: 'school'
  },
  {
    title: '专业',
    dataIndex: 'major',
    key: 'major'
  },
  {
    title: '学位',
    dataIndex: 'degree',
    key: 'degree'
  },
  {
    title: '时间',
    key: 'time',
    customRender: ({ record }) => {
      return `${record.startDate} - ${record.endDate}`
    }
  }
]

const experienceColumns = [
  {
    title: '公司/单位',
    dataIndex: 'company',
    key: 'company'
  },
  {
    title: '职位',
    dataIndex: 'position',
    key: 'position'
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department'
  },
  {
    title: '时间',
    key: 'time',
    customRender: ({ record }) => {
      return `${record.startDate} - ${record.endDate}`
    }
  }
]
</script>
