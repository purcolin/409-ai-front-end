<template>
  <a-card :title="title">
    <a-descriptions :column="2">
      <a-descriptions-item label="部门名称">{{ department.name }}</a-descriptions-item>
      <a-descriptions-item label="部门代码">{{ department.code }}</a-descriptions-item>
      <a-descriptions-item label="上级部门">{{ department.parentDepartment }}</a-descriptions-item>
      <a-descriptions-item label="部门负责人">{{ department.manager }}</a-descriptions-item>
      <a-descriptions-item label="成立时间">{{ department.establishDate }}</a-descriptions-item>
      <a-descriptions-item label="联系电话">{{ department.phone }}</a-descriptions-item>
    </a-descriptions>

    <a-divider>部门职责</a-divider>
    <a-list :dataSource="department.responsibilities" :pagination="false">
      <template #renderItem="{ item }">
        <a-list-item>{{ item }}</a-list-item>
      </template>
    </a-list>

    <a-divider>部门人员</a-divider>
    <a-table :dataSource="department.staff" :columns="staffColumns" :pagination="false" />
  </a-card>
</template>

<script setup lang="ts">
interface Staff {
  name: string
  position: string
  entryDate: string
  status: string
}

interface Department {
  name: string
  code: string
  parentDepartment: string
  manager: string
  establishDate: string
  phone: string
  responsibilities: string[]
  staff: Staff[]
}

const props = defineProps<{
  department: Department
  title?: string
}>()

const staffColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '职位',
    dataIndex: 'position',
    key: 'position'
  },
  {
    title: '入职日期',
    dataIndex: 'entryDate',
    key: 'entryDate'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }
]
</script> 