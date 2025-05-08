import { createRouter, createWebHistory } from 'vue-router'
import DepartmentDirectory from '@/views/common/DepartmentDirectory.vue'
import DepartmentDetail from '@/views/common/DepartmentDetail.vue'
import PositionDirectory from '@/views/common/PositionDirectory.vue'
import PositionDetail from '@/views/common/PositionDetail.vue'
import ArchiveList from '@/views/archive/ArchiveList.vue'
import ArchiveDetail from '@/views/archive/ArchiveDetail.vue'
import StatisticsView from '@/views/statistics/StatisticsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/archive'
  },
  {
    path: '/archive',
    name: 'ArchiveList',
    component: ArchiveList
  },
  {
    path: '/archive/:id',
    name: 'ArchiveDetail',
    component: ArchiveDetail
  },
  {
    path: '/archive/meetings/:id',
    name: 'MeetingDetail',
    component: () => import('@/views/archive/MeetingDetail.vue')
  },
  {
    path: '/archive/topics/:id',
    name: 'TopicDetail',
    component: () => import('@/views/archive/TopicDetail.vue')
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: () => import('@/views/archive/SearchResults.vue')
  },
  {
    path: '/hub',
    name: 'KnowledgeHub',
    component: () => import('@/views/knowledge/KnowledgeHub.vue')
  },
  {
    path: '/person/detail',
    name: 'CommonKnowledgeDetail',
    component: () => import('@/views/common/PersonDetail.vue')
  },
  {
    path: '/personnel',
    name: 'PersonnelDirectory',
    component: () => import('@/views/common/PersonnelDirectory.vue')
  },
  {
    path: '/department',
    name: 'DepartmentDirectory',
    component: DepartmentDirectory,
    meta: {
      title: '部门目录',
      icon: 'team'
    }
  },
  {
    path: '/department/:id',
    name: 'DepartmentDetail',
    component: DepartmentDetail,
    meta: {
      title: '部门详情',
      icon: 'idcard'
    }
  },
  {
    path: '/position',
    name: 'PositionDirectory',
    component: PositionDirectory,
    meta: {
      title: '岗位目录',
      requiresAuth: true
    }
  },
  {
    path: '/position/:id',
    name: 'PositionDetail',
    component: PositionDetail,
    meta: {
      title: '岗位详情',
      requiresAuth: true
    }
  },
  {
    path: '/statistics',
    name: 'StatisticsView',
    component: StatisticsView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 