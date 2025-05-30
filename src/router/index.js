import { createRouter, createWebHistory } from 'vue-router'
import DepartmentDirectory from '@/views/common/DepartmentDirectory.vue'
import DepartmentDetail from '@/views/common/DepartmentDetail.vue'
import PositionDirectory from '@/views/common/PositionDirectory.vue'
import PositionDetail from '@/views/common/PositionDetail.vue'
import StatisticsView from '@/views/meeting/statistics/StatisticsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/hub'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      showHeader: false
    }
  },
  {
    path: '/meeting',
    name: 'MeetingHome',
    component: () => import('@/views/meeting/MeetingHome.vue')
  },
  {
    path: '/meeting/detail/:id',
    name: 'MeetingSubDetail',
    component: () => import('@/views/meeting/MeetingDetail.vue')
  },
  {
    path: '/meeting/topics/:id',
    name: 'TopicDetail',
    component: () => import('@/views/meeting/MeetingTopicDetail.vue')
  },
  {
    path: '/meeting/search',
    name: 'MeetingSearch',
    component: () => import('@/views/meeting/MeetingSearch.vue')
  },
  {
    path: '/meeting/statistics',
    name: 'StatisticsView',
    component: StatisticsView
  },
  {
    path: '/hub',
    name: 'KnowledgeHub',
    component: () => import('@/views/hub/KnowledgeHub.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router