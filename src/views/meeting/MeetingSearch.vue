<template>
  <div>
    <app-header />
    <div class="main-content">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-container">
          <input type="text" class="search-box" placeholder="搜索会议档案关键词..." v-model="searchQuery">
          <button class="search-btn" @click="handleSearch">
            <search-outlined />
            搜索
          </button>
        </div>
        <div class="search-helper">
          已为您找到 <span class="result-count">{{ totalResults }}</span> 条与"{{ searchQuery }}"相关的会议纪要记录
        </div>
      </div>

      <!-- 筛选器和结果区域布局 -->
      <div class="results-layout">
        <!-- 左侧筛选器 -->
        <div class="filter-panel">
          <div class="filter-section">
            <h3 class="filter-title">时间范围</h3>
            <div class="filter-content">
              <div class="date-range">
                <input type="date" class="date-input" v-model="startDate">
                <span class="date-separator">至</span>
                <input type="date" class="date-input" v-model="endDate">
              </div>
              <div class="date-quick-select">
                <button
                  v-for="(option, index) in dateOptions"
                  :key="index"
                  class="quick-date"
                  :class="{ active: selectedDateOption === option.value }"
                  @click="handleDateOption(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
          </div>

          <div class="filter-section">
            <h3 class="filter-title">部门筛选</h3>
            <div class="filter-content">
              <div class="checkbox-filter">
                <div class="filter-item" v-for="(dept, index) in departments" :key="index">
                  <input
                    type="checkbox"
                    :id="'dep' + (index + 1)"
                    v-model="selectedDepartments"
                    :value="dept.value"
                  >
                  <label :for="'dep' + (index + 1)">{{ dept.label }}</label>
                </div>
              </div>
              <div class="filter-more">
                <a href="#" class="more-link-small">显示更多 <down-outlined /></a>
              </div>
            </div>
          </div>

          <div class="filter-section">
            <h3 class="filter-title">知识类型</h3>
            <div class="filter-content">
              <div class="checkbox-filter">
                <div class="filter-item" v-for="(type, index) in knowledgeTypes" :key="index">
                  <input
                    type="checkbox"
                    :id="'type' + (index + 1)"
                    v-model="selectedTypes"
                    :value="type.value"
                  >
                  <label :for="'type' + (index + 1)">{{ type.label }}</label>
                </div>
              </div>
            </div>
          </div>

          <div class="filter-buttons">
            <button class="filter-btn reset-btn" @click="resetFilters">重置筛选</button>
            <button class="filter-btn apply-btn" @click="applyFilters">应用筛选</button>
          </div>
        </div>

        <!-- 右侧结果区域 -->
        <div class="results-panel">
          <!-- 结果排序和视图选项 -->
          <div class="results-header">
            <div class="sort-options">
              <span class="sort-label">排序方式:</span>
              <a
                v-for="(option, index) in sortOptions"
                :key="index"
                href="#"
                class="sort-option"
                :class="{ active: selectedSort === option.value }"
                @click.prevent="handleSort(option.value)"
              >
                {{ option.label }} <down-outlined v-if="option.value === selectedSort" />
              </a>
            </div>
            <div class="view-options">
              <a
                v-for="(option, index) in viewOptions"
                :key="index"
                href="#"
                class="view-option"
                :class="{ active: selectedView === option.value }"
                @click.prevent="handleView(option.value)"
              >
                <component :is="option.icon" />
              </a>
            </div>
          </div>

          <!-- 结果列表 -->
          <div class="results-list">
            <!-- 议题结果项 -->
            <div class="result-item" v-for="(item, index) in searchResults" :key="index">
              <div class="result-header">
                <div class="result-type">
                  <span class="result-badge" :class="item.type + '-badge'">{{ item.typeLabel }}</span>
                </div>
                <div class="result-date">{{ item.dateLabel }}: {{ item.date }}</div>
              </div>
              <div class="result-title">
                <router-link :to="item.link">{{ item.title }}</router-link>
                <span v-if="item.tag" class="tag" :class="'tag-' + item.tagType">{{ item.tag }}</span>
              </div>
              <div class="result-summary">
                {{ item.summary }}
                <span class="highlight-text">{{ searchQuery }}</span>
              </div>
              <div class="result-meta">
                <span v-for="(meta, metaIndex) in item.meta" :key="metaIndex">
                  <component :is="meta.icon" /> {{ meta.text }}
                </span>
                <router-link :to="item.link" class="view-detail">
                  查看详情 <right-outlined />
                </router-link>
              </div>
            </div>
          </div>

          <!-- 分页控件 -->
          <div class="pagination-container">
            <button class="pagination-btn" :disabled="currentPage === 1" @click="prevPage">
              <left-outlined />
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              class="pagination-btn"
              :class="{ active: currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            <span v-if="totalPages > 5" class="pagination-ellipsis">...</span>
            <button
              class="pagination-btn"
              :disabled="currentPage === totalPages"
              @click="nextPage"
            >
              <right-outlined />
            </button>
          </div>
        </div>
      </div>

      <!-- 底部区域 -->
      <footer class="footer-section">
        <div class="footer-content">
          <div class="footer-logo">
            <bank-outlined />
            会议纪要档案管理系统
          </div>
          <div class="footer-links">
            <a href="#">关于系统</a>
            <a href="#">帮助中心</a>
            <a href="#">联系我们</a>
          </div>
          <div class="footer-copyright">
            © 2023 会议纪要档案管理系统 版权所有
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  BankOutlined,
  FileTextOutlined,
  SearchOutlined,
  BarChartOutlined,
  SettingOutlined,
  DownOutlined,
  RightOutlined,
  LeftOutlined,
  FileOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  FilePdfOutlined,
  EyeOutlined,
  UserOutlined,
  CalendarOutlined
} from '@ant-design/icons-vue'
import AppHeader from '@/components/meeting/MeetingHeader.vue'

// 搜索相关
const searchQuery = ref('数字化转型')
const totalResults = ref(18)

// 日期筛选
const startDate = ref('2023-01-01')
const endDate = ref('2023-12-31')
const selectedDateOption = ref('all')
const dateOptions = [
  { label: '全部', value: 'all' },
  { label: '最近一月', value: 'month' },
  { label: '最近三月', value: 'quarter' },
  { label: '最近一年', value: 'year' }
]

// 部门筛选
const departments = [
  { label: '全部部门', value: 'all' },
  { label: '技术研发部', value: 'tech' },
  { label: '产品规划部', value: 'product' },
  { label: '市场营销部', value: 'marketing' },
  { label: '战略规划部', value: 'strategy' }
]
const selectedDepartments = ref(['all'])

// 知识类型筛选
const knowledgeTypes = [
  { label: '全部类型', value: 'all' },
  { label: '会议', value: 'meeting' },
  { label: '议题', value: 'topic' },
  { label: '人物', value: 'person' },
  { label: '文档', value: 'document' }
]
const selectedTypes = ref(['all'])

// 排序选项
const sortOptions = [
  { label: '相关度', value: 'relevance' },
  { label: '会议时间', value: 'date' },
  { label: '重要程度', value: 'importance' }
]
const selectedSort = ref('relevance')

// 视图选项
const viewOptions = [
  { label: '列表视图', value: 'list', icon: 'FileOutlined' },
  { label: '网格视图', value: 'grid', icon: 'AppstoreOutlined' },
  { label: '日历视图', value: 'calendar', icon: 'CalendarOutlined' }
]
const selectedView = ref('list')

// 分页
const currentPage = ref(1)
const totalPages = ref(4)

// 搜索结果数据
const searchResults = ref([
  {
    type: 'topic',
    typeLabel: '议题',
    dateLabel: '更新于',
    date: '2023-12-15',
    title: '全面数字化转型战略规划与实施路径',
    tag: '重要',
    tagType: 'red',
    summary: '制定企业整体数字化转型路线图，包括技术架构升级、业务流程重组和数据治理体系建设。本议题通过对标行业最佳实践，结合公司实际情况，形成了分阶段、全方位的数字化转型战略...',
    link: '/meeting/topics/1',
    meta: [
      { icon: 'FileOutlined', text: '3次会议讨论' },
      { icon: 'BankOutlined', text: '战略规划部' },
      { icon: 'UserOutlined', text: '张国强' },
      { icon: 'CheckCircleOutlined', text: '已形成决议' }
    ]
  },
  {
    type: 'meeting',
    typeLabel: '会议',
    dateLabel: '会议日期',
    date: '2023-11-28',
    title: '数字化转型战略季度评审会议',
    summary: '本次会议对数字化转型战略第一阶段执行情况进行了全面评估，讨论了目前面临的技术挑战和资源配置问题。会议决定加速云基础设施建设，并重点推进数据中台建设进度...',
    link: '/meeting/detail/2',
    meta: [
      { icon: 'EnvironmentOutlined', text: '北京总部' },
      { icon: 'TeamOutlined', text: '15人参会' },
      { icon: 'FileOutlined', text: '3个议题' },
      { icon: 'CheckCircleOutlined', text: '4项决议' }
    ]
  },
  {
    type: 'task',
    typeLabel: '执行任务',
    dateLabel: '截止日期',
    date: '2024-03-15',
    title: '基础架构云化改造项目',
    tag: '执行中',
    tagType: 'blue',
    summary: '作为数字化转型战略的核心项目之一，本任务旨在将企业核心IT基础设施迁移至云平台，建立弹性可扩展的技术架构。目前已完成30%，主要挑战在于遗留系统的兼容性问题...',
    link: '/meeting/tasks/1',
    meta: [
      { icon: 'CalendarOutlined', text: '开始: 2023-10-01' },
      { icon: 'UserOutlined', text: '负责人: 李明' },
      { icon: 'TeamOutlined', text: '8人团队' },
      { icon: 'FileOutlined', text: '进度: 30%' }
    ]
  },
  {
    type: 'document',
    typeLabel: '文档',
    dateLabel: '更新日期',
    date: '2023-08-05',
    title: '《企业数字化转型白皮书(2023版)》',
    summary: '本白皮书详细阐述了公司数字化转型的战略意义、总体框架和关键举措。包括行业数字化趋势分析、企业现状评估、转型目标与规划、技术路线选择、组织能力建设等内容...',
    link: '/meeting/documents/1',
    meta: [
      { icon: 'FilePdfOutlined', text: 'PDF文档' },
      { icon: 'UserOutlined', text: '作者: 战略规划部' },
      { icon: 'EyeOutlined', text: '153次阅读' }
    ]
  }
])

// 处理函数
const handleSearch = () => {
  console.log('搜索关键词:', searchQuery.value)
}

const handleDateOption = (value) => {
  selectedDateOption.value = value
  // 根据选择更新日期范围
}

const resetFilters = () => {
  selectedDateOption.value = 'all'
  selectedDepartments.value = ['all']
  selectedTypes.value = ['all']
}

const applyFilters = () => {
  console.log('应用筛选条件')
}

const handleSort = (value) => {
  selectedSort.value = value
}

const handleView = (value) => {
  selectedView.value = value
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

body {
  background-color: #f0f2f5;
  color: #333333;
  line-height: 1.5;
}

/* 主内容布局 */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
}

/* 搜索区域 */
.search-section {
  background-color: #1a4b91;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.search-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  display: flex;
}

.search-box {
  flex: 1;
  padding: 18px 25px;
  border: none;
  border-radius: 12px 0 0 12px;
  font-size: 17px;
  background-color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.search-box:focus {
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  outline: none;
}

.search-btn {
  background-color: #1a4b91;
  color: white;
  border: none;
  border-radius: 0 12px 12px 0;
  padding: 0 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid white;
}

.search-btn:hover {
  background-color: #0e2c59;
}

.search-helper {
  color: rgba(255, 255, 255, 0.9);
  text-align: left;
  margin-top: 15px;
  font-size: 14px;
}

.result-count {
  font-weight: bold;
  font-size: 16px;
}

/* 结果页面布局 */
.results-layout {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

/* 左侧筛选面板 */
.filter-panel {
  flex: 0 0 280px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  height: fit-content;
}

.filter-section {
  margin-bottom: 25px;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 20px;
}

.filter-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.filter-title {
  font-size: 16px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 15px;
}

.filter-content {
  font-size: 14px;
}

/* 日期筛选器 */
.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.date-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}

.date-separator {
  color: #666666;
}

.date-quick-select {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.quick-date {
  padding: 5px 10px;
  background-color: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-date.active, .quick-date:hover {
  background-color: #1a4b91;
  color: white;
  border-color: #1a4b91;
}

/* 复选框筛选器 */
.checkbox-filter {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-more {
  margin-top: 10px;
  text-align: center;
}

.more-link-small {
  font-size: 12px;
  color: #1a4b91;
  text-decoration: none;
}

.more-link-small:hover {
  text-decoration: underline;
}

/* 筛选按钮 */
.filter-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.filter-btn {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  transition: all 0.3s;
}

.reset-btn {
  background-color: #f5f5f5;
  color: #333333;
}

.reset-btn:hover {
  background-color: #e0e0e0;
}

.apply-btn {
  background-color: #1a4b91;
  color: white;
}

.apply-btn:hover {
  background-color: #0e2c59;
}

/* 右侧结果面板 */
.results-panel {
  flex: 1;
}

/* 结果头部区域 */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e8e8e8;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 15px;
}

.sort-label {
  color: #666666;
  font-size: 14px;
}

.sort-option {
  color: #333333;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.sort-option:hover, .sort-option.active {
  color: #1a4b91;
  font-weight: bold;
}

.view-options {
  display: flex;
  gap: 10px;
}

.view-option {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  color: #666666;
  transition: all 0.3s;
}

.view-option:hover, .view-option.active {
  background-color: #1a4b91;
  color: white;
}

/* 结果列表 */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-item {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.result-item:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
}

.result-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 13px;
}

.result-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 15px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.topic-badge {
  background-color: #1a4b91;
}

.meeting-badge {
  background-color: #2f54eb;
}

.task-badge {
  background-color: #52c41a;
}

.resolution-badge {
  background-color: #f5222d;
}

.document-badge {
  background-color: #722ed1;
}

.result-date {
  color: #666666;
}

.result-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.result-title a {
  color: #1a4b91;
  text-decoration: none;
  transition: all 0.3s;
}

.result-title a:hover {
  color: #0e2c59;
}

.result-summary {
  font-size: 14px;
  color: #333333;
  line-height: 1.6;
  margin-bottom: 15px;
}

.highlight-text {
  background-color: rgba(255, 230, 0, 0.3);
  padding: 0 3px;
  font-weight: 600;
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: #666666;
  font-size: 13px;
  align-items: center;
}

.view-detail {
  margin-left: auto;
  color: #1a4b91;
  text-decoration: none;
  font-weight: bold;
  font-size: 13px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.view-detail:hover {
  color: #0e2c59;
}

/* 分页控件 */
.pagination-container {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 30px;
}

.pagination-btn {
  width: 38px;
  height: 38px;
  border: 1px solid #e8e8e8;
  background-color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled), .pagination-btn.active {
  background-color: #1a4b91;
  color: white;
  border-color: #1a4b91;
}

.pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
}

/* 底部区域 */
.footer-section {
  background-color: white;
  padding: 30px;
  margin-top: 50px;
  border-top: 1px solid #e8e8e8;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #1a4b91;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: #666666;
  text-decoration: none;
}

.footer-links a:hover {
  color: #1a4b91;
}

.footer-copyright {
  color: #666666;
  font-size: 14px;
}

/* 标签样式 */
.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: normal;
}

.tag-red {
  background-color: #fff1f0;
  color: #f5222d;
  border: 1px solid #ffa39e;
}

.tag-blue {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .results-layout {
    flex-direction: column;
  }

  .filter-panel {
    flex: none;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .sort-options {
    gap: 10px;
  }

  .sort-label {
    display: none;
  }

  .result-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .view-detail {
    margin-left: 0;
    margin-top: 10px;
  }
}

@media (max-width: 576px) {
  .results-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .view-options {
    align-self: flex-end;
  }
}
</style>
