<template>
  <div>
    <app-header />
    <div class="statistics-container">
      <!-- 分类导航 -->
      <div class="category-nav">
        <a-radio-group v-model:value="currentView" button-style="solid">
          <a-radio-button value="timeline">
            <template #icon><calendar-outlined /></template>
            时间轴
          </a-radio-button>
          <a-radio-button value="department">
            <template #icon><bank-outlined /></template>
            部门统计
          </a-radio-button>
          <a-radio-button value="project">
            <template #icon><project-outlined /></template>
            项目统计
          </a-radio-button>
          <a-radio-button value="topic">
            <template #icon><tags-outlined /></template>
            主题统计
          </a-radio-button>
        </a-radio-group>
      </div>

      <!-- 时间轴视图 -->
      <div v-if="currentView === 'timeline'" class="timeline-view">
        <div class="timeline-header">
          <a-select v-model:value="timeRange" style="width: 200px">
            <a-select-option value="year">按年查看</a-select-option>
            <a-select-option value="quarter">按季度查看</a-select-option>
            <a-select-option value="month">按月查看</a-select-option>
          </a-select>
          <a-range-picker v-model:value="dateRange" />
        </div>
        
        <!-- 统计卡片 -->
        <div class="stats-cards">
          <a-card class="stat-card">
            <template #title>会议总数</template>
            <div class="stat-value">{{ timelineStats.totalMeetings }}</div>
            <div class="stat-label">场会议</div>
          </a-card>
          <a-card class="stat-card">
            <template #title>参与人数</template>
            <div class="stat-value">{{ timelineStats.totalParticipants }}</div>
            <div class="stat-label">人次</div>
          </a-card>
          <a-card class="stat-card">
            <template #title>平均参与</template>
            <div class="stat-value">{{ timelineStats.averageParticipants }}</div>
            <div class="stat-label">人/场</div>
          </a-card>
          <a-card class="stat-card">
            <template #title>会议类型</template>
            <div class="stat-value">{{ Object.keys(timelineStats.meetingTypes).length }}</div>
            <div class="stat-label">种类型</div>
          </a-card>
        </div>
        
        <a-timeline mode="alternate">
          <a-timeline-item v-for="item in timelineData" :key="item.id">
            <template #dot>
              <file-text-outlined style="font-size: 16px" />
            </template>
            <div class="timeline-card">
              <div class="timeline-title">{{ item.title }}</div>
              <div class="timeline-meta">
                <span><clock-circle-outlined /> {{ formatTime(item.time) }}</span>
                <span><environment-outlined /> {{ item.location }}</span>
                <span><team-outlined /> {{ item.participants.length }}人参与</span>
              </div>
              <div class="timeline-tags">
                <a-tag v-for="tag in item.tags" :key="tag" color="blue">{{ tag }}</a-tag>
              </div>
              <div class="timeline-content">
                {{ item.content }}
              </div>
              <div class="timeline-actions">
                <a-button type="link" @click="viewDetail(item.id)">查看详情</a-button>
              </div>
            </div>
          </a-timeline-item>
        </a-timeline>
      </div>

      <!-- 部门统计视图 -->
      <div v-if="currentView === 'department'" class="department-view">
        <div class="stat-charts">
          <div class="chart-card">
            <div class="chart-title">各部门会议数量统计</div>
            <div class="chart-container">
              <v-chart class="chart" :option="barChartOption" autoresize />
            </div>
          </div>
          <div class="chart-card">
            <div class="chart-title">各部门参与度分析</div>
            <div class="chart-container">
              <v-chart class="chart" :option="pieChartOption" autoresize />
            </div>
          </div>
        </div>
        <div class="department-list">
          <a-table :columns="departmentColumns" :data-source="departmentData" />
        </div>
      </div>

      <!-- 项目统计视图 -->
      <div v-if="currentView === 'project'" class="project-view">
        <div class="project-grid">
          <a-card v-for="project in projectData" :key="project.id" class="project-card">
            <template #title>
              <div class="project-title">
                <project-outlined />
                {{ project.name }}
              </div>
            </template>
            <div class="project-stats">
              <div class="stat-item">
                <div class="stat-value">{{ project.meetingCount }}</div>
                <div class="stat-label">会议数量</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ project.participantCount }}</div>
                <div class="stat-label">参与人数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ project.duration }}</div>
                <div class="stat-label">持续时间</div>
              </div>
            </div>
            <div class="project-progress">
              <a-progress :percent="project.progress" />
            </div>
          </a-card>
        </div>
      </div>

      <!-- 主题统计视图 -->
      <div v-if="currentView === 'topic'" class="topic-view">
        <div class="topic-cloud">
          <div class="tag-cloud">
            <a-tag 
              v-for="item in topicData" 
              :key="item.name"
              :style="{
                fontSize: `${12 + item.weight / 10}px`,
                padding: `${4 + item.weight / 20}px ${8 + item.weight / 20}px`,
                margin: '8px',
                backgroundColor: getTagColor(item.weight)
              }"
            >
              {{ item.name }}
              <span class="tag-count">({{ item.meetingCount }})</span>
            </a-tag>
          </div>
        </div>
        <div class="topic-list">
          <a-list :data-source="topicData" :grid="{ gutter: 16, column: 4 }">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-card class="topic-card">
                  <template #title>
                    <tags-outlined />
                    {{ item.name }}
                  </template>
                  <div class="topic-stats">
                    <div>相关会议：{{ item.meetingCount }}</div>
                    <div>参与人数：{{ item.participantCount }}</div>
                  </div>
                </a-card>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

import {
  CalendarOutlined,
  BankOutlined,
  ProjectOutlined,
  TagsOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  TeamOutlined
} from '@ant-design/icons-vue'
import dayjs from 'dayjs'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const router = useRouter()
const currentView = ref('timeline')
const timeRange = ref('month')
const dateRange = ref([])

// 模拟数据
const timelineData = ref([
  {
    id: '1',
    title: '2024年第一季度工作总结会议',
    time: '2024-03-15 14:00:00',
    location: '会议室A',
    participants: ['张三', '李四', '王五', '赵六', '钱七'],
    tags: ['工作总结', '计划', '季度会议'],
    content: '本次会议主要讨论了第一季度的工作总结和下一季度的工作计划，各部门负责人分别汇报了工作进展。'
  },
  {
    id: '2',
    title: '技术架构升级方案讨论',
    time: '2024-03-10 10:00:00',
    location: '技术中心',
    participants: ['李明', '王洪', '刘晓', '张伟', '陈静'],
    tags: ['技术', '架构', '升级'],
    content: '讨论了系统架构升级方案，包括微服务改造、容器化部署等技术方案。'
  },
  {
    id: '3',
    title: '产品需求评审会',
    time: '2024-03-05 09:30:00',
    location: '产品部会议室',
    participants: ['王芳', '李强', '张明', '刘洋'],
    tags: ['产品', '需求', '评审'],
    content: '对新产品功能需求进行了详细评审，确定了开发优先级和排期。'
  },
  {
    id: '4',
    title: '项目进度汇报',
    time: '2024-02-28 15:00:00',
    location: '会议室B',
    participants: ['赵总', '钱经理', '孙主管', '李工'],
    tags: ['项目', '进度', '汇报'],
    content: '各项目组汇报了当前项目进度，讨论了存在的问题和解决方案。'
  },
  {
    id: '5',
    title: '团队建设活动',
    time: '2024-02-20 13:00:00',
    location: '公司活动室',
    participants: ['全体成员'],
    tags: ['团队', '活动', '建设'],
    content: '组织了团队建设活动，增强了团队凝聚力和协作能力。'
  }
])

const departmentColumns = [
  {
    title: '部门名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '会议数量',
    dataIndex: 'meetingCount',
    key: 'meetingCount'
  },
  {
    title: '参与人数',
    dataIndex: 'participantCount',
    key: 'participantCount'
  }
]

const departmentData = ref([
  { name: '技术部', meetingCount: 45, participantCount: 120 },
  { name: '产品部', meetingCount: 38, participantCount: 95 },
  { name: '设计部', meetingCount: 25, participantCount: 60 }
])

const projectData = ref([
  {
    id: '1',
    name: '数字化转型项目',
    meetingCount: 12,
    participantCount: 45,
    duration: '6个月',
    progress: 75
  },
  {
    id: '2',
    name: '新产品开发',
    meetingCount: 8,
    participantCount: 30,
    duration: '3个月',
    progress: 40
  }
])

const topicData = ref([
  { name: '数字化转型', meetingCount: 15, participantCount: 50, weight: 100 },
  { name: '技术架构', meetingCount: 12, participantCount: 40, weight: 80 },
  { name: '产品规划', meetingCount: 10, participantCount: 35, weight: 60 },
  { name: '数据治理', meetingCount: 8, participantCount: 30, weight: 50 },
  { name: '系统迁移', meetingCount: 6, participantCount: 25, weight: 40 }
])

// 柱状图配置
const barChartOption = ref({
  title: {
    text: '各部门会议数量统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: departmentData.value.map(item => item.name),
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '会议数量',
      type: 'bar',
      data: departmentData.value.map(item => item.meetingCount),
      itemStyle: {
        color: '#1a4b91'
      }
    }
  ]
})

// 饼图配置
const pieChartOption = ref({
  title: {
    text: '各部门参与度分析',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '参与人数',
      type: 'pie',
      radius: '50%',
      data: departmentData.value.map(item => ({
        value: item.participantCount,
        name: item.name
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

// 统计数据
const timelineStats = ref({
  totalMeetings: 0,
  totalParticipants: 0,
  averageParticipants: 0,
  meetingTypes: {}
})

// 计算统计数据
const calculateStats = () => {
  const stats = {
    totalMeetings: timelineData.value.length,
    totalParticipants: 0,
    averageParticipants: 0,
    meetingTypes: {}
  }

  timelineData.value.forEach(meeting => {
    stats.totalParticipants += meeting.participants.length
    meeting.tags.forEach(tag => {
      stats.meetingTypes[tag] = (stats.meetingTypes[tag] || 0) + 1
    })
  })

  stats.averageParticipants = Math.round(stats.totalParticipants / stats.totalMeetings)
  timelineStats.value = stats
}

// 监听数据变化，重新计算统计
watch(timelineData, () => {
  calculateStats()
}, { immediate: true })

const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}

const viewDetail = (id) => {
  router.push(`/archive/detail/${id}`)
}

// 获取标签颜色
const getTagColor = (weight) => {
  const colors = [
    'rgba(26, 75, 145, 0.1)',
    'rgba(245, 34, 45, 0.1)',
    'rgba(82, 196, 26, 0.1)',
    'rgba(250, 140, 22, 0.1)',
    'rgba(114, 46, 209, 0.1)'
  ]
  return colors[Math.floor(weight / 20) % colors.length]
}
</script>

<style lang="less" scoped>
.statistics-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
}

.category-nav {
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.timeline-view {
  .timeline-header {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .stats-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;

    .stat-card {
      text-align: center;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #1a4b91;
        margin: 10px 0;
      }

      .stat-label {
        color: #666;
        font-size: 12px;
      }
    }
  }

  .timeline-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 10px 0;

    .timeline-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .timeline-meta {
      display: flex;
      gap: 20px;
      color: #666;
      margin-bottom: 10px;
    }

    .timeline-tags {
      margin-bottom: 10px;
    }

    .timeline-content {
      color: #333;
      line-height: 1.6;
      margin-bottom: 10px;
    }

    .timeline-actions {
      text-align: right;
    }
  }
}

.department-view {
  .stat-charts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 30px;

    .chart-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      .chart-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .chart-container {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        border-radius: 4px;

        .chart {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.project-view {
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;

    .project-card {
      .project-title {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .project-stats {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;

        .stat-item {
          text-align: center;

          .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #1a4b91;
          }

          .stat-label {
            color: #666;
            font-size: 12px;
          }
        }
      }
    }
  }
}

.topic-view {
  .topic-cloud {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    .tag-cloud {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 20px;

      .tag-count {
        margin-left: 4px;
        font-size: 0.8em;
        opacity: 0.8;
      }
    }
  }

  .topic-card {
    .topic-stats {
      color: #666;
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style> 