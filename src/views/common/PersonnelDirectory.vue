<template>
  <div class="personnel-directory">
    <!-- 顶部导航栏 -->
    <person-header />

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/hub">
          <home-outlined />
          专题库首页
        </router-link>
        <span class="separator">/</span>
        <span>人员名录</span>
      </div>

      <div class="personnel-container">
        <div class="personnel-list-container">
          <div class="filter-container">
            <div class="filter-item">
              <span class="filter-label">部门:</span>
              <a-select
                v-model:value="departmentFilter"
                style="width: 120px"
                placeholder="全部"
              >
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">技术中心</a-select-option>
                <a-select-option value="2">产品中心</a-select-option>
                <a-select-option value="3">市场中心</a-select-option>
                <a-select-option value="4">财务部</a-select-option>
                <a-select-option value="5">人力资源部</a-select-option>
              </a-select>
            </div>
            <div class="filter-item">
              <span class="filter-label">职级:</span>
              <a-select
                v-model:value="levelFilter"
                style="width: 120px"
                placeholder="全部"
              >
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">高层管理</a-select-option>
                <a-select-option value="2">中层管理</a-select-option>
                <a-select-option value="3">基层员工</a-select-option>
              </a-select>
            </div>
            <div class="search-box">
              <a-input-search
                v-model:value="searchText"
                placeholder="搜索姓名、职位..."
                style="width: 200px"
                @search="onSearch"
              />
            </div>
          </div>
          
          <a-table
            :columns="columns"
            :data-source="personnelData"
            :pagination="pagination"
            :row-class-name="(record, index) => record.key === selectedKey ? 'ant-table-row-selected' : ''"
            @change="handleTableChange"
            @row-click="handleRowClick"
            :customRow="customRow"
            :scroll="{ x: 1200 }"
            size="middle"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'avatar'">
                <div class="person-avatar">{{ record.name.substring(0, 1) }}</div>
              </template>
              <template v-if="column.key === 'name'">
                <div class="person-info">
                  <div class="person-name">
                    {{ record.name }}
                    <span class="badge badge-primary">{{ record.title }}</span>
                  </div>
                  <div>{{ record.email }}</div>
                </div>
              </template>
              <template v-if="column.key === 'honors'">
                <div class="honors">
                  <span v-for="(honor, index) in record.honors" :key="index" class="honor-item">
                    {{ honor }}
                  </span>
                </div>
              </template>
              <template v-if="column.key === 'appointments'">
                <div class="appointments">
                  <span v-for="(appointment, index) in record.appointments" :key="index" class="appointment-item">
                    {{ appointment }}
                  </span>
                </div>
              </template>
            </template>
          </a-table>
        </div>
        
        <div class="personnel-detail-container">
          <div class="personnel-detail-card">
            <div class="card-header">
              <span>个人详情</span>
              <idcard-outlined />
            </div>
            <div class="card-content">
              <div class="detail-avatar">张</div>
              <div class="detail-info">
                <div class="detail-name" @click="goToPersonDetail">张国强</div>
                <div class="detail-title">董事长</div>
                <div class="detail-contact">
                  <span><phone-outlined /> 13800138000</span>
                  <span><mail-outlined /> zhangguoqiang@example.com</span>
                </div>
              </div>
              
              <div class="detail-stats">
                <div class="detail-stat-item">
                  <div class="detail-stat-value">15</div>
                  <div class="detail-stat-label">参与会议</div>
                </div>
                <div class="detail-stat-item">
                  <div class="detail-stat-value">8</div>
                  <div class="detail-stat-label">相关议题</div>
                </div>
                <div class="detail-stat-item">
                  <div class="detail-stat-value">12</div>
                  <div class="detail-stat-label">发言次数</div>
                </div>
                <div class="detail-stat-item">
                  <div class="detail-stat-value">6</div>
                  <div class="detail-stat-label">决策事项</div>
                </div>
                <div class="detail-stat-item">
                  <div class="detail-stat-value">2</div>
                  <div class="detail-stat-label">荣誉表彰</div>
                </div>
                <div class="detail-stat-item">
                  <div class="detail-stat-value">2</div>
                  <div class="detail-stat-label">职位任免</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="personnel-detail-card">
            <div class="card-header">
              <span>最近参与会议</span>
              <calendar-outlined />
            </div>
            <div class="card-content">
              <ul class="meeting-list">
                <li class="meeting-item">
                  <div class="meeting-title">2023年度工作规划会议</div>
                  <div class="meeting-meta">
                    <span><calendar-outlined /> 2023-01-15</span>
                    <span><message-outlined /> 发言 5 次</span>
                  </div>
                </li>
                <li class="meeting-item">
                  <div class="meeting-title">技术架构升级方案评审会议</div>
                  <div class="meeting-meta">
                    <span><calendar-outlined /> 2023-06-05</span>
                    <span><message-outlined /> 发言 4 次</span>
                  </div>
                </li>
                <li class="meeting-item">
                  <div class="meeting-title">半年度经营情况分析会议</div>
                  <div class="meeting-meta">
                    <span><calendar-outlined /> 2023-07-10</span>
                    <span><message-outlined /> 发言 3 次</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="personnel-detail-card">
            <div class="card-header">
              <span>会议发言统计</span>
              <bar-chart-outlined />
            </div>
            <div class="card-content">
              <div id="speech-chart" class="speech-chart"></div>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PersonHeader from '@/components/common/PersonHeader.vue'
import * as echarts from 'echarts'
import {
  BankOutlined,
  HomeOutlined,
  SearchOutlined,
  BarChartOutlined,
  SettingOutlined,
  IdcardOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  MessageOutlined,
  LeftOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  RightOutlined
} from '@ant-design/icons-vue'

const router = useRouter()

// 表格数据
const personnelData = ref([
  {
    key: '2',
    name: '张国强',
    title: '董事长',
    email: 'zhangguoqiang@example.com',
    employeeId: 'GQ001',
    department: '董事长办公室',
    meetings: 15,
    topics: 8,
    honors: ['2023年度优秀管理者', '数字化转型突出贡献奖'],
    appointments: ['2020.03-至今 董事长', '2018.01-2020.02 总经理']
  },
  {
    key: '2',
    name: '李明',
    title: '技术总监',
    email: 'liming@example.com',
    employeeId: 'LM002',
    department: '技术中心',
    meetings: 12,
    topics: 7,
    honors: ['2023年度技术创新奖', '专利发明人'],
    appointments: ['2021.06-至今 技术总监', '2019.01-2021.05 技术经理']
  },
  {
    key: '3',
    name: '王洪',
    title: '产品总监',
    email: 'wanghong@example.com',
    employeeId: 'WH003',
    department: '产品中心',
    meetings: 10,
    topics: 6,
    honors: ['2023年度最佳产品奖', '用户体验创新奖'],
    appointments: ['2022.01-至今 产品总监', '2020.06-2021.12 产品经理']
  },
  {
    key: '4',
    name: '刘晓',
    title: '设计经理',
    email: 'liuxiao@example.com',
    employeeId: 'LX004',
    department: '产品中心',
    meetings: 8,
    topics: 4,
    honors: ['2023年度设计创新奖', 'UI设计大赛金奖'],
    appointments: ['2021.03-至今 设计经理', '2019.07-2021.02 高级设计师']
  },
  {
    key: '5',
    name: '赵明',
    title: '市场总监',
    email: 'zhaoming@example.com',
    employeeId: 'ZM005',
    department: '市场中心',
    meetings: 7,
    topics: 3,
    honors: ['2023年度市场开拓奖', '品牌建设突出贡献奖'],
    appointments: ['2022.05-至今 市场总监', '2020.08-2022.04 市场经理']
  },
  {
    key: '6',
    name: '钱财',
    title: '财务总监',
    email: 'qiancai@example.com',
    employeeId: 'QC006',
    department: '财务部',
    meetings: 6,
    topics: 2,
    honors: ['2023年度财务管理奖', '成本控制优秀奖'],
    appointments: ['2021.09-至今 财务总监', '2019.03-2021.08 财务经理']
  },
  {
    key: '7',
    name: '周人力',
    title: '人力资源经理',
    email: 'zhourenli@example.com',
    employeeId: 'ZRL007',
    department: '人力资源部',
    meetings: 5,
    topics: 2,
    honors: ['2023年度人力资源管理奖', '人才发展贡献奖'],
    appointments: ['2022.03-至今 人力资源经理', '2020.06-2022.02 招聘主管']
  },
  {
    key: '8',
    name: '陈法务',
    title: '法务总监',
    email: 'chenfawu@example.com',
    employeeId: 'CFW008',
    department: '法务部',
    meetings: 4,
    topics: 2,
    honors: ['2023年度法务管理奖', '合规管理优秀奖'],
    appointments: ['2021.12-至今 法务总监', '2019.05-2021.11 法务经理']
  },
  {
    key: '9',
    name: '吴运营',
    title: '运营总监',
    email: 'wuyunying@example.com',
    employeeId: 'WYY009',
    department: '运营中心',
    meetings: 9,
    topics: 5,
    honors: ['2023年度运营创新奖', '用户增长贡献奖'],
    appointments: ['2022.08-至今 运营总监', '2020.11-2022.07 运营经理']
  },
  {
    key: '10',
    name: '郑客服',
    title: '客服总监',
    email: 'zhengkefu@example.com',
    employeeId: 'ZKF010',
    department: '客服中心',
    meetings: 3,
    topics: 1,
    honors: ['2023年度客户服务奖', '客户满意度提升奖'],
    appointments: ['2021.07-至今 客服总监', '2019.10-2021.06 客服经理']
  }
])

// 表格列定义
const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 80,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 180,
  },
  {
    title: '工号',
    dataIndex: 'employeeId',
    key: 'employeeId',
    width: 100,
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
    width: 120,
  },
  {
    title: '会议次数',
    dataIndex: 'meetings',
    key: 'meetings',
    width: 100,
    sorter: true,
  },
  {
    title: '相关议题',
    dataIndex: 'topics',
    key: 'topics',
    width: 100,
    sorter: true,
  },
  {
    title: '奖励荣誉',
    dataIndex: 'honors',
    key: 'honors',
    width: 200,
    ellipsis: true,
  },
  {
    title: '职务任免',
    dataIndex: 'appointments',
    key: 'appointments',
    width: 200,
    ellipsis: true,
  },
]

// 分页配置
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: personnelData.value.length,
  showSizeChanger: true,
  showQuickJumper: true,
})

// 筛选状态
const departmentFilter = ref('')
const levelFilter = ref('')
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
  document.querySelector('.detail-avatar').textContent = record.name.substring(0, 1)
  document.querySelector('.detail-name').textContent = record.name
  document.querySelector('.detail-title').textContent = record.title
  document.querySelector('.detail-contact span:last-child').innerHTML = `<mail-outlined /> ${record.email}`
  
  document.querySelector('.detail-stats .detail-stat-item:first-child .detail-stat-value').textContent = record.meetings
  document.querySelector('.detail-stats .detail-stat-item:nth-child(2) .detail-stat-value').textContent = record.topics
  document.querySelector('.detail-stats .detail-stat-item:nth-child(5) .detail-stat-value').textContent = record.honors.length
  document.querySelector('.detail-stats .detail-stat-item:nth-child(6) .detail-stat-value').textContent = record.appointments.length
  
  // 更新图表数据
  const newData = Array.from({length: 5}, () => Math.floor(Math.random() * 7) + 1)
  speechChart.setOption({
    series: [{
      data: newData
    }]
  })
}

let speechChart

onMounted(() => {
  // 初始化发言统计图表
  speechChart = echarts.init(document.getElementById('speech-chart'))
  
  // 发言统计数据
  const speechOption = {
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
    xAxis: [
      {
        type: 'category',
        data: ['规划会议', '架构评审', '半年度分析', '预算会议', '战略研讨'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          rotate: 30,
          fontSize: 10
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '发言次数',
        nameTextStyle: {
          fontSize: 10
        },
        axisLabel: {
          fontSize: 10
        }
      }
    ],
    series: [
      {
        name: '发言次数',
        type: 'bar',
        barWidth: '60%',
        data: [5, 4, 3, 2, 3],
        itemStyle: {
          color: '#12396f'
        }
      }
    ]
  }
  
  speechChart.setOption(speechOption)
  
  // 窗口大小变化时，重新调整图表大小
  window.addEventListener('resize', () => {
    speechChart.resize()
  })
})

// 跳转到人物详情页
const goToPersonDetail = () => {
  router.push('/person/detail')
}
</script>

<style lang="less" scoped>
.personnel-directory {
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

/* 人员名录布局 */
.personnel-container {
  display: flex;
  gap: 30px;
}

.personnel-list-container {
  flex: 2;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.personnel-list-container:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.personnel-detail-container {
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

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s;
}

.search-input:focus {
  border-color: #1a4b91;
  outline: none;
  box-shadow: 0 0 0 2px rgba(26, 75, 145, 0.1);
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666666;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  color: #666666;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  transition: all 0.3s;
}

.filter-select:focus {
  border-color: #1a4b91;
  outline: none;
  box-shadow: 0 0 0 2px rgba(26, 75, 145, 0.1);
}

/* 人员列表样式 */
.person-list-header {
  display: grid;
  grid-template-columns: 60px 1fr 120px 150px 120px 120px;
  padding: 15px 20px;
  background: rgba(26, 75, 145, 0.05);
  font-weight: bold;
  font-size: 14px;
  color: #1a4b91;
  border-bottom: 1px solid #e8e8e8;
}

.person-item {
  display: grid;
  grid-template-columns: 60px 1fr 120px 150px 120px 120px;
  padding: 15px 20px;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
}

.person-item:hover {
  background: rgba(26, 75, 145, 0.05);
  transform: translateY(-2px);
}

.person-item.active {
  background: rgba(26, 75, 145, 0.08);
  border-left: 3px solid #1a4b91;
}

.person-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 3px 8px rgba(26, 75, 145, 0.2);
}

.person-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.person-name {
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

/* 详情卡片样式 */
.personnel-detail-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  margin-bottom: 20px;
}

.personnel-detail-card:hover {
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

/* 个人详情样式 */
.detail-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
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

/* 会议列表样式 */
.meeting-list {
  list-style: none;
  padding: 0;
}

.meeting-item {
  padding: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.meeting-item:last-child {
  border-bottom: none;
}

.meeting-title {
  font-weight: 500;
  margin-bottom: 5px;
}

.meeting-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666666;
}

/* 发言统计图表 */
.speech-chart {
  height: 250px;
  width: 100%;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
  padding: 20px 0;
}

.page-item {
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.page-item:hover {
  border-color: #1a4b91;
  color: #1a4b91;
}

.page-item.active {
  background: #1a4b91;
  color: white;
  border-color: #1a4b91;
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
  .personnel-container {
    flex-direction: column;
  }
  
  .personnel-detail-container {
    min-width: unset;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .person-list-header, .person-item {
    grid-template-columns: 60px 1fr 120px;
  }
  
  .person-list-header > div:nth-child(n+4),
  .person-item > div:nth-child(n+4) {
    display: none;
  }
  
  .personnel-detail-container {
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

.honors, .appointments {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #666666;
}

.honor-item, .appointment-item {
  padding: 2px 6px;
  background: rgba(26, 75, 145, 0.05);
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1200px) {
  .person-list-header, .person-item {
    grid-template-columns: 60px 1fr 120px 150px 120px 120px;
  }
  
  .honors, .appointments {
    display: none;
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
  display: none;
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

:deep(.honors), :deep(.appointments) {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

:deep(.honor-item), :deep(.appointment-item) {
  padding: 2px 6px;
  background: rgba(26, 75, 145, 0.05);
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1200px) {
  :deep(.ant-table) {
    width: 100%;
    overflow-x: auto;
  }
  
  :deep(.ant-table-cell) {
    min-width: 100px;
  }
  
  :deep(.honors), :deep(.appointments) {
    min-width: 150px;
  }
}

@media (max-width: 768px) {
  :deep(.ant-table-cell) {
    min-width: 80px;
  }
  
  :deep(.honors), :deep(.appointments) {
    display: none;
  }
}
</style> 