<template>
  <div class="knowledge-hub">
    <div class="main-content">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-header">
          <h1 class="search-title">企业档案知识专题总库</h1>
          <p class="search-subtitle">汇聚企业核心知识资产，构建智慧档案管理体系</p>
        </div>
        <div class="search-container">
          <input type="text" class="search-box" placeholder="搜索知识专题..." v-model="searchQuery">
          <button class="search-btn" @click="handleSearch">
            <search-outlined />
            搜索
          </button>
        </div>
        <div class="search-helper">
          快速访问知识专题库，探索企业知识资产
        </div>
        <div class="search-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <file-text-outlined />
            </div>
            <div class="stat-info">
              <div class="stat-value">3,555</div>
              <div class="stat-label">知识文档</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <team-outlined />
            </div>
            <div class="stat-info">
              <div class="stat-value">913</div>
              <div class="stat-label">活跃用户</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <book-outlined />
            </div>
            <div class="stat-info">
              <div class="stat-value">4</div>
              <div class="stat-label">知识专题</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 知识专题卡片区域 -->
      <div class="knowledge-topics">
        <h2 class="section-title">知识专题</h2>
        <div class="topic-cards">
          <div class="topic-card" v-for="topic in topics" :key="topic.id">
            <div class="topic-header">
              <div class="topic-icon" :style="{ backgroundColor: topic.bgColor }">
                <component :is="topic.icon" />
              </div>
              <h3 class="topic-title">{{ topic.title }}</h3>
            </div>
            <div class="topic-info">
              <p class="topic-desc">{{ topic.description }}</p>
              <div class="topic-features">
                <div class="feature-item" v-for="feature in topic.features" :key="feature">
                  <check-circle-outlined />
                  <span>{{ feature }}</span>
                </div>
              </div>
              <div class="topic-stats">
                <span class="stat-item">
                  <file-outlined /> {{ topic.docCount }} 文档
                </span>
                <span class="stat-item">
                  <team-outlined /> {{ topic.userCount }} 用户
                </span>
                <span class="stat-item">
                  <clock-circle-outlined /> 最近更新：{{ topic.lastUpdate }}
                </span>
              </div>
            </div>
            <div class="topic-actions">
              <router-link :to="topic.link" class="topic-link">
                进入专题 <right-outlined />
              </router-link>
              <button class="topic-btn" @click="handlePreview(topic)">
                <eye-outlined />
                预览
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 通用知识卡片区域 -->
      <div class="common-knowledge">
        <h2 class="section-title">通用知识</h2>
        <div class="common-cards">
          <div class="common-card" v-for="item in commonItems" :key="item.id">
            <div class="common-icon" :style="{ backgroundColor: item.bgColor }">
              <component :is="item.icon" />
            </div>
            <div class="common-info">
              <h3 class="common-title">{{ item.title }}</h3>
              <p class="common-desc">{{ item.description }}</p>
              <div class="common-stats">
                <span class="stat-item">
                  <user-outlined /> {{ item.count }} 记录
                </span>
                <span class="stat-item">
                  <clock-circle-outlined /> 最近更新：{{ item.lastUpdate }}
                </span>
              </div>
            </div>
            <router-link :to="item.link" class="common-link">
              查看详情 <right-outlined />
            </router-link>
          </div>
        </div>
      </div>

      <!-- 最近更新区域 -->
      <div class="recent-updates">
        <h2 class="section-title">最近更新</h2>
        <div class="update-list">
          <div class="update-item" v-for="update in recentUpdates" :key="update.id">
            <div class="update-type" :class="update.type">
              <component :is="update.icon" />
            </div>
            <div class="update-content">
              <div class="update-title">{{ update.title }}</div>
              <div class="update-meta">
                <span class="update-time">{{ update.time }}</span>
                <span class="update-author">{{ update.author }}</span>
              </div>
            </div>
            <router-link :to="update.link" class="update-link">
              查看 <right-outlined />
            </router-link>
          </div>
        </div>
      </div>

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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  BankOutlined,
  SearchOutlined,
  RightOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
  TrophyOutlined,
  SolutionOutlined,
  BookOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined
} from '@ant-design/icons-vue'

// 搜索相关
const searchQuery = ref('')

// 知识专题数据
const topics = ref([
  {
    id: 1,
    title: '会议纪要',
    description: '企业重要会议记录、议题讨论和决策过程，包含会议议程、参会人员、讨论要点和决议事项等详细信息。',
    icon: FileTextOutlined,
    bgColor: '#1a4b91',
    docCount: 1280,
    userCount: 256,
    lastUpdate: '2023-12-15',
    features: [
      '会议议程管理',
      '参会人员记录',
      '决议事项追踪',
      '会议纪要归档'
    ],
    link: '/archive'
  },
  {
    id: 2,
    title: '奖励荣誉',
    description: '员工表彰、团队荣誉和重要奖项记录，包含获奖详情、评选标准和表彰仪式等信息。',
    icon: TrophyOutlined,
    bgColor: '#f5222d',
    docCount: 856,
    userCount: 189,
    lastUpdate: '2023-12-14',
    features: [
      '奖项分类管理',
      '评选标准记录',
      '表彰仪式安排',
      '荣誉档案管理'
    ],
    link: '/knowledge/rewards'
  },
  {
    id: 3,
    title: '职务任免',
    description: '人员任命、岗位调整和职责变更记录，包含任职文件、岗位说明和职责范围等信息。',
    icon: SolutionOutlined,
    bgColor: '#52c41a',
    docCount: 432,
    userCount: 156,
    lastUpdate: '2023-12-13',
    features: [
      '任职文件管理',
      '岗位说明记录',
      '职责范围说明',
      '变更历史追踪'
    ],
    link: '/knowledge/appointments'
  },
  {
    id: 4,
    title: '规章制度',
    description: '企业制度、流程规范和操作指南，包含制度文件、实施细则和操作手册等信息。',
    icon: BookOutlined,
    bgColor: '#722ed1',
    docCount: 987,
    userCount: 312,
    lastUpdate: '2023-12-12',
    features: [
      '制度分类管理',
      '实施细则记录',
      '操作手册维护',
      '版本更新追踪'
    ],
    link: '/knowledge/rules'
  }
])

// 通用知识数据
const commonItems = ref([
  {
    id: 1,
    title: '人员信息',
    description: '员工基本信息、任职经历和专业技能，包含个人档案、工作经历和技能认证等信息。',
    icon: UserOutlined,
    bgColor: '#1890ff',
    count: 1256,
    lastUpdate: '2023-12-15',
    link: '/personnel'
  },
  {
    id: 2,
    title: '部门信息',
    description: '组织架构、部门职责和团队信息，包含部门设置、职责说明和团队构成等信息。',
    icon: TeamOutlined,
    bgColor: '#13c2c2',
    count: 48,
    lastUpdate: '2023-12-14',
    link: '/department'
  },
  {
    id: 3,
    title: '岗位信息',
    description: '岗位职责、任职要求和晋升路径，包含岗位说明、任职资格和职业发展等信息。',
    icon: SolutionOutlined,
    bgColor: '#fa8c16',
    count: 156,
    lastUpdate: '2023-12-13',
    link: '/position'
  }
])

// 最近更新数据
const recentUpdates = ref([
  {
    id: 1,
    type: 'meeting',
    icon: FileTextOutlined,
    title: '数字化转型战略季度评审会议纪要',
    time: '2023-12-15 14:30',
    author: '张国强',
    link: '/archive/detail/123'
  },
  {
    id: 2,
    type: 'reward',
    icon: TrophyOutlined,
    title: '2023年度优秀员工表彰名单',
    time: '2023-12-14 09:00',
    author: '人力资源部',
    link: '/knowledge/rewards/456'
  },
  {
    id: 3,
    type: 'appointment',
    icon: SolutionOutlined,
    title: '技术研发部负责人任命通知',
    time: '2023-12-13 16:45',
    author: '人事部',
    link: '/knowledge/appointments/789'
  }
])

// 处理函数
const handleSearch = () => {
  console.log('搜索关键词:', searchQuery.value)
}

const handlePreview = (topic) => {
  console.log('预览专题:', topic.title)
}
</script>

<style lang="less" scoped>
.knowledge-hub {
  min-height: 100vh;
  background-color: #f0f2f5;
}

/* 主内容布局 */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
}

/* 搜索区域 */
.search-section {
  background: linear-gradient(135deg, #1a4b91 0%, #0e2c59 100%);
  padding: 60px 30px;
  border-radius: 16px;
  margin-bottom: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.search-header {
  text-align: center;
  margin-bottom: 40px;
}

.search-title {
  font-size: 36px;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
}

.search-container {
  max-width: 800px;
  margin: 0 auto 20px;
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
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
}

.search-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
}

.stat-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 180px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.stat-info {
  color: white;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

/* 知识专题卡片 */
.section-title {
  font-size: 28px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 30px;
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background-color: #1a4b91;
  border-radius: 2px;
}

.topic-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.topic-card {
  background-color: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.topic-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.topic-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.topic-icon {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  flex-shrink: 0;
}

.topic-title {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin: 0;
}

.topic-info {
  flex: 1;
}

.topic-desc {
  font-size: 15px;
  color: #666666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.topic-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1a4b91;
  font-size: 14px;
}

.topic-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: #666666;
  font-size: 13px;
  padding: 15px 0;
  border-top: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.topic-actions {
  display: flex;
  gap: 15px;
  margin-top: auto;
}

.topic-link {
  flex: 1;
  background-color: #1a4b91;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.topic-link:hover {
  background-color: #0e2c59;
  color: white;
}

.topic-btn {
  background-color: #f0f2f5;
  color: #1a4b91;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.topic-btn:hover {
  background-color: #e6e9f0;
}

/* 通用知识卡片 */
.common-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 50px;
}

.common-card {
  background-color: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.common-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.common-icon {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.common-info {
  flex: 1;
}

.common-title {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 12px;
}

.common-desc {
  font-size: 14px;
  color: #666666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.common-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: #666666;
  font-size: 13px;
  padding: 15px 0;
  border-top: 1px solid #f0f0f0;
}

.common-link {
  background-color: #1a4b91;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.common-link:hover {
  background-color: #0e2c59;
  color: white;
}

/* 最近更新列表 */
.update-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.update-item {
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 20px;
}

.update-item:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateX(5px);
}

.update-type {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  flex-shrink: 0;
}

.update-type.meeting {
  background-color: #1a4b91;
}

.update-type.reward {
  background-color: #f5222d;
}

.update-type.appointment {
  background-color: #52c41a;
}

.update-content {
  flex: 1;
}

.update-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
}

.update-meta {
  display: flex;
  gap: 20px;
  color: #666666;
  font-size: 13px;
}

.update-link {
  background-color: #f0f2f5;
  color: #1a4b91;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.update-link:hover {
  background-color: #e6e9f0;
  color: #0e2c59;
}

/* 底部区域 */
.footer-section {
  background-color: white;
  padding: 40px 30px;
  margin-top: 60px;
  border-top: 1px solid #e8e8e8;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  text-align: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: bold;
  color: #1a4b91;
}

.footer-links {
  display: flex;
  gap: 25px;
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
  .topic-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 992px) {
  .topic-cards, .common-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .topic-cards, .common-cards {
    grid-template-columns: 1fr;
  }
  
  .topic-features {
    grid-template-columns: 1fr;
  }
  
  .search-section {
    padding: 40px 20px;
  }
  
  .search-title {
    font-size: 28px;
  }
  
  .search-subtitle {
    font-size: 16px;
  }
  
  .search-stats {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .stat-card {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 576px) {
  .main-content {
    padding: 20px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .topic-card, .common-card {
    padding: 20px;
  }
  
  .topic-actions {
    flex-direction: column;
  }
  
  .update-item {
    flex-direction: column;
    text-align: center;
  }
  
  .update-meta {
    justify-content: center;
  }
}
</style> 