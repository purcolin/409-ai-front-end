<template>
  <div class="department-directory">
    <!-- 顶部导航栏 -->
    <department-header />

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/hub">
          <home-outlined />
          专题库首页
        </router-link>
        <span class="separator">/</span>
        <span>部门目录</span>
      </div>

      <div class="department-container">
        <div class="department-list-container">
          <div class="filter-container">
            <div class="filter-item">
              <span class="filter-label">部门类型:</span>
              <a-select
                v-model:value="typeFilter"
                style="width: 120px"
                placeholder="全部"
              >
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">业务部门</a-select-option>
                <a-select-option value="2">职能部门</a-select-option>
                <a-select-option value="3">支持部门</a-select-option>
              </a-select>
            </div>
            <div class="filter-item">
              <span class="filter-label">状态:</span>
              <a-select
                v-model:value="statusFilter"
                style="width: 120px"
                placeholder="全部"
              >
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">正常</a-select-option>
                <a-select-option value="2">调整中</a-select-option>
                <a-select-option value="3">已撤销</a-select-option>
              </a-select>
            </div>
            <div class="search-box">
              <a-input-search
                v-model:value="searchText"
                placeholder="搜索部门名称、负责人..."
                style="width: 200px"
                @search="onSearch"
              />
            </div>
          </div>
          
          <a-table
            :columns="columns"
            :data-source="departmentData"
            :pagination="pagination"
            :row-class-name="(record, index) => record.key === selectedKey ? 'ant-table-row-selected' : ''"
            @change="handleTableChange"
            @row-click="handleRowClick"
            :customRow="customRow"
            :scroll="{ x: 1200 }"
            size="middle"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'icon'">
                <div class="dept-icon">{{ record.name.substring(0, 1) }}</div>
              </template>
              <template v-if="column.key === 'name'">
                <div class="dept-info">
                  <div class="dept-name">
                    {{ record.name }}
                    <span class="badge badge-primary">{{ record.type }}</span>
                  </div>
                  <div>{{ record.manager }}</div>
                </div>
              </template>
              <template v-if="column.key === 'stats'">
                <div class="dept-stats">
                  <span class="stat-item">
                    <team-outlined /> {{ record.employeeCount }}人
                  </span>
                  <span class="stat-item">
                    <file-text-outlined /> {{ record.meetingCount }}会议
                  </span>
                  <span class="stat-item">
                    <project-outlined /> {{ record.projectCount }}项目
                  </span>
                </div>
              </template>
            </template>
          </a-table>
        </div>
        
        <div class="department-detail-container">
          <div class="department-detail-card">
            <div class="card-header">
              <span>部门详情</span>
              <idcard-outlined />
            </div>
            <div class="card-content">
              <div class="detail-icon">技</div>
              <div class="detail-info">
                <div class="detail-name">技术中心</div>
                <div class="detail-title">业务部门</div>
                <div class="detail-contact">
                  <span><user-outlined /> 负责人: 李明</span>
                  <span><phone-outlined /> 联系电话: 13800138000</span>
                </div>
              </div>
              
              <div class="detail-stats">
                <div class="detail-stat-item">
                  <div class="detail-stat-value">45</div>
                  <div class="detail-stat-label">员工人数</div>
                </div>
                <div class="detail-stat-item">
                  <div class="detail-stat-value">12</div>
                  <div class="detail-stat-label">会议次数</div>
                </div>
                <div class="detail-stat-item">
                  <div class="detail-stat-value">8</div>
                  <div class="detail-stat-label">项目数量</div>
                </div>
                <div class="detail-stat-item">
                  <div class="detail-stat-value">3</div>
                  <div class="detail-stat-label">子部门</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="department-detail-card">
            <div class="card-header">
              <span>部门职责</span>
              <book-outlined />
            </div>
            <div class="card-content">
              <ul class="responsibility-list">
                <li class="responsibility-item">负责公司技术战略规划与实施</li>
                <li class="responsibility-item">负责产品技术方案设计与开发</li>
                <li class="responsibility-item">负责技术架构优化与系统升级</li>
                <li class="responsibility-item">负责技术团队建设与管理</li>
                <li class="responsibility-item">负责技术创新与研发</li>
                <li class="responsibility-item">负责系统运维与技术支持</li>
              </ul>
            </div>
          </div>
          
          <div class="department-detail-card">
            <div class="card-header">
              <span>最近会议</span>
              <calendar-outlined />
            </div>
            <div class="card-content">
              <ul class="meeting-list">
                <li class="meeting-item">
                  <div class="meeting-title">技术中心季度工作会议</div>
                  <div class="meeting-meta">
                    <span><calendar-outlined /> 2023-10-15</span>
                    <span><user-outlined /> 主持: 李明</span>
                  </div>
                </li>
                <li class="meeting-item">
                  <div class="meeting-title">技术架构升级方案评审会</div>
                  <div class="meeting-meta">
                    <span><calendar-outlined /> 2023-10-12</span>
                    <span><user-outlined /> 主持: 王洪</span>
                  </div>
                </li>
                <li class="meeting-item">
                  <div class="meeting-title">研发团队周例会</div>
                  <div class="meeting-meta">
                    <span><calendar-outlined /> 2023-10-08</span>
                    <span><user-outlined /> 主持: 张工</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部区域 -->
    <footer class="footer-section">
      <div class="footer-content">
        <div class="footer-logo">
          <bank-outlined />
          知识专题库
        </div>
        <div class="footer-links">
          <a href="#">关于系统</a>
          <a href="#">帮助中心</a>
          <a href="#">联系我们</a>
        </div>
        <div class="footer-copyright">
          © 2023 知识专题库 版权所有
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DepartmentHeader from '@/components/common/DepartmentHeader.vue'
import {
  BankOutlined,
  HomeOutlined,
  SearchOutlined,
  BarChartOutlined,
  SettingOutlined,
  IdcardOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
  ProjectOutlined,
  BookOutlined
} from '@ant-design/icons-vue'

// 表格数据
const departmentData = ref([
  {
    key: '11',
    name: '技术中心',
    type: '业务部门',
    manager: '李明',
    employeeCount: 45,
    meetingCount: 12,
    projectCount: 8,
    status: '正常'
  },
  {
    key: '2',
    name: '产品中心',
    type: '业务部门',
    manager: '王洪',
    employeeCount: 32,
    meetingCount: 9,
    projectCount: 7,
    status: '正常'
  },
  {
    key: '3',
    name: '市场中心',
    type: '业务部门',
    manager: '赵明',
    employeeCount: 28,
    meetingCount: 7,
    projectCount: 5,
    status: '正常'
  },
  {
    key: '4',
    name: '财务部',
    type: '职能部门',
    manager: '钱总',
    employeeCount: 15,
    meetingCount: 5,
    projectCount: 3,
    status: '正常'
  },
  {
    key: '5',
    name: '人力资源部',
    type: '职能部门',
    manager: '周经理',
    employeeCount: 12,
    meetingCount: 6,
    projectCount: 4,
    status: '正常'
  }
])

// 表格列定义
const columns = [
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    width: 80,
    fixed: 'left',
  },
  {
    title: '部门名称',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    fixed: 'left',
  },
  {
    title: '部门类型',
    dataIndex: 'type',
    key: 'type',
    width: 120,
  },
  {
    title: '负责人',
    dataIndex: 'manager',
    key: 'manager',
    width: 120,
  },
  {
    title: '部门统计',
    dataIndex: 'stats',
    key: 'stats',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  }
]

// 分页配置
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: departmentData.value.length,
  showSizeChanger: true,
  showQuickJumper: true,
})

// 筛选状态
const typeFilter = ref('')
const statusFilter = ref('')
const searchText = ref('')
const selectedKey = ref('1')

// 表格事件处理
const handleTableChange = (pag, filters, sorter) => {
  pagination.value.current = pag.current
  pagination.value.pageSize = pag.pageSize
}

const handleRowClick = (record) => {
  selectedKey.value = record.key
  // 更新右侧详情面板
  updateDetailPanel(record)
}

const customRow = (record) => {
  return {
    onClick: () => handleRowClick(record),
  }
}

const onSearch = (value) => {
  console.log('search:', value)
}

// 更新详情面板
const updateDetailPanel = (record) => {
  document.querySelector('.detail-icon').textContent = record.name.substring(0, 1)
  document.querySelector('.detail-name').textContent = record.name
  document.querySelector('.detail-title').textContent = record.type
  document.querySelector('.detail-contact span:first-child').innerHTML = `<user-outlined /> 负责人: ${record.manager}`
  
  document.querySelector('.detail-stats .detail-stat-item:first-child .detail-stat-value').textContent = record.employeeCount
  document.querySelector('.detail-stats .detail-stat-item:nth-child(2) .detail-stat-value').textContent = record.meetingCount
  document.querySelector('.detail-stats .detail-stat-item:nth-child(3) .detail-stat-value').textContent = record.projectCount
}
</script>

<style lang="less" scoped>
.department-directory {
  min-height: 100vh;
  background-color: #f0f2f5;
}

/* 主内容布局 */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
}

/* 面包屑导航 */
.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666666;
}

.breadcrumb a {
  color: #666666;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s;
}

.breadcrumb a:hover {
  color: #1a4b91;
}

.breadcrumb .separator {
  margin: 0 8px;
}

/* 部门目录布局 */
.department-container {
  display: flex;
  gap: 30px;
}

.department-list-container {
  flex: 2;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.department-list-container:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.department-detail-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 380px;
}

/* 搜索和过滤区域 */
.filter-container {
  padding: 20px;
  background: rgba(26, 75, 145, 0.03);
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-box {
  flex: 1;
  position: relative;
}

/* 部门图标样式 */
.dept-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 3px 8px rgba(26, 75, 145, 0.2);
}

.dept-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dept-name {
  font-weight: bold;
  color: #1a4b91;
  font-size: 15px;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: normal;
  margin-left: 8px;
}

.badge-primary {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.dept-stats {
  display: flex;
  gap: 15px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666666;
  font-size: 13px;
}

/* 详情卡片样式 */
.department-detail-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  margin-bottom: 20px;
}

.department-detail-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: #1a4b91;
  color: white;
  padding: 15px 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}

.card-content {
  padding: 20px;
}

/* 部门详情样式 */
.detail-icon {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 32px;
  margin: 0 auto 20px;
  box-shadow: 0 3px 8px rgba(26, 75, 145, 0.2);
}

.detail-info {
  text-align: center;
  margin-bottom: 20px;
}

.detail-name {
  font-size: 20px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 5px;
}

.detail-title {
  font-size: 16px;
  color: #666666;
  margin-bottom: 10px;
}

.detail-contact {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  color: #666666;
}

.detail-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.detail-stat-item {
  background: rgba(26, 75, 145, 0.03);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.detail-stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #1a4b91;
}

.detail-stat-label {
  font-size: 12px;
  color: #666666;
}

/* 职责列表样式 */
.responsibility-list {
  list-style: none;
  counter-reset: item;
}

.responsibility-item {
  position: relative;
  padding: 12px 0 12px 30px;
  border-bottom: 1px dashed #e8e8e8;
  font-size: 14px;
  transition: all 0.3s;
}

.responsibility-item:hover {
  background-color: rgba(26, 75, 145, 0.02);
  padding-left: 35px;
}

.responsibility-item:last-child {
  border-bottom: none;
}

.responsibility-item:before {
  counter-increment: item;
  content: counter(item) ".";
  position: absolute;
  left: 0;
  top: 12px;
  font-weight: bold;
  color: #1a4b91;
  font-size: 15px;
}

/* 会议列表样式 */
.meeting-list {
  list-style: none;
}

.meeting-item {
  padding: 15px 0;
  border-bottom: 1px dashed #e8e8e8;
  transition: all 0.3s;
}

.meeting-item:hover {
  background-color: rgba(26, 75, 145, 0.02);
  padding-left: 10px;
}

.meeting-item:last-child {
  border-bottom: none;
}

.meeting-title {
  font-weight: bold;
  font-size: 15px;
  color: #1a4b91;
  margin-bottom: 8px;
}

.meeting-meta {
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #666666;
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
  font-size: 20px;
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
  transition: all 0.3s;
}

.footer-links a:hover {
  color: #1a4b91;
}

.footer-copyright {
  color: #666666;
  font-size: 14px;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .department-container {
    flex-direction: column;
  }
  
  .department-detail-container {
    min-width: unset;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .department-detail-container {
    grid-template-columns: 1fr;
  }
  
  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-item {
    width: 100%;
  }
  
  .filter-select {
    width: 100%;
  }
}

/* 表格样式覆盖 */
:deep(.ant-table) {
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

:deep(.ant-table-thead > tr > th) {
  background: rgba(26, 75, 145, 0.05);
  color: #1a4b91;
  font-weight: bold;
  font-size: 14px;
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
  white-space: nowrap;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background: rgba(26, 75, 145, 0.05);
}

:deep(.ant-table-row-selected td) {
  background: rgba(26, 75, 145, 0.08);
}

:deep(.ant-table-row-selected::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #1a4b91;
}

:deep(.ant-pagination) {
  margin: 20px 0;
  padding: 0 20px;
}

:deep(.ant-select) {
  width: 120px;
}

:deep(.ant-input-search) {
  width: 200px;
}

:deep(.ant-table-cell) {
  white-space: nowrap;
}
</style> 