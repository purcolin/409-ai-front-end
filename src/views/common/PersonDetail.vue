<template>
  <div class="common-knowledge-detail">
    <!-- 顶部导航栏 -->
    <person-header />

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/knowledge">
          <home-outlined />
          首页
        </router-link>
        <span class="separator">/</span>
        <router-link to="/knowledge/common">
          <user-outlined />
          人员目录
        </router-link>
        <span class="separator">/</span>
        <span>{{ person.name }}</span>
      </div>

      <!-- 人物信息概览 -->
      <section class="person-overview">
        <div class="person-header">
          <div class="person-avatar-section">
            <div class="person-avatar large">{{ person.name.charAt(0) }}</div>
            <div class="person-historical-badge" v-if="person.isHistorical">历史人物</div>
          </div>
          <div class="person-info-section">
            <div class="person-title">
              <h1>{{ person.name }}</h1>
              <div class="person-tags">
                <span class="tag tag-blue" v-for="tag in person.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
            <Row :gutter="[16, 16]" class="person-meta">
              <Col :span="12">
                <div class="meta-item">
                  <bank-outlined />
                  <span>所属部门：{{ person.department }}</span>
                </div>
              </Col>
              <Col :span="12">
                <div class="meta-item">
                  <solution-outlined />
                  <span>职务：{{ person.position }}</span>
                </div>
              </Col>
              <Col :span="12">
                <div class="meta-item">
                  <clock-circle-outlined />
                  <span>任职时间：{{ person.tenure }}</span>
                </div>
              </Col>
              <Col :span="12">
                <div class="meta-item">
                  <read-outlined />
                  <span>背景：{{ person.background }}</span>
                </div>
              </Col>
            </Row>
          </div>
          <div class="person-actions">
            <button class="action-btn">
              <file-text-outlined />
              查看相关档案
            </button>
            <button class="action-btn">
              <project-outlined />
              查看关系网络
            </button>
            <button class="action-btn">
              <star-outlined />
              收藏人物
            </button>
          </div>
        </div>

        <!-- 统计数据 -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ person.stats.meetings }}</div>
            <div class="stat-label">参与会议</div>
            <div class="stat-trend up">
              <arrow-up-outlined />
              <span>历史排名第{{ person.stats.meetingRank }}位</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ person.stats.chairMeetings }}</div>
            <div class="stat-label">主持会议</div>
            <div class="stat-trend up">
              <arrow-up-outlined />
              <span>历史排名第{{ person.stats.chairRank }}位</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ person.stats.topics }}</div>
            <div class="stat-label">参与议题</div>
            <div class="stat-trend up">
              <arrow-up-outlined />
              <span>关键议题占比{{ person.stats.keyTopicRatio }}%</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ person.stats.views }}</div>
            <div class="stat-label">发表观点</div>
            <div class="stat-trend up">
              <arrow-up-outlined />
              <span>影响力指数{{ person.stats.influenceIndex }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 主要内容区域 -->
      <div class="content-layout">
        <!-- 左侧主要内容 -->
        <div class="main-section">
          <!-- 人物简介 -->
          <section class="biography-section">
            <h2 class="section-title">人物简介</h2>
            <div class="biography-content">
              <p v-for="(paragraph, index) in person.biography" :key="index">{{ paragraph }}</p>
            </div>
          </section>

          <!-- 奖励荣誉 -->
          <section class="honors-section">
            <h2 class="section-title">奖励荣誉</h2>
            <div class="honors-grid">
              <div class="honor-card" v-for="honor in person.honors" :key="honor.id">
                <div class="honor-header">
                  <div class="honor-title">{{ honor.title }}</div>
                  <div class="honor-date">{{ honor.date }}</div>
                </div>
                <div class="honor-content">
                  <p>{{ honor.description }}</p>
                </div>
                <div class="honor-footer">
                  <span class="honor-issuer">{{ honor.issuer }}</span>
                  <a href="#" class="view-certificate">查看证书</a>
                </div>
              </div>
            </div>
          </section>

          <!-- 职务任免 -->
          <section class="appointments-section">
            <h2 class="section-title">职务任免</h2>
            <div class="appointments-timeline">
              <div class="appointment-item" v-for="appointment in person.appointments" :key="appointment.id">
                <div class="appointment-time">
                  <div class="date">{{ appointment.startDate }} - {{ appointment.endDate || '至今' }}</div>
                </div>
                <div class="appointment-content">
                  <div class="appointment-header">
                    <h3>{{ appointment.position }}</h3>
                    <span class="tag" :class="appointment.tagClass">{{ appointment.department }}</span>
                  </div>
                  <p class="appointment-summary">{{ appointment.summary }}</p>
                  <div class="appointment-meta">
                    <span><file-text-outlined /> {{ appointment.documentNumber }}</span>
                    <a href="#" class="view-document">查看任免文件</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 活动时间轴 -->
          <section class="activity-section">
            <h2 class="section-title">重要活动记录</h2>
            <div class="activity-timeline">
              <div class="activity-item" v-for="activity in person.activities" :key="activity.id">
                <div class="activity-time">
                  <div class="date">{{ activity.date }}</div>
                  <div class="time">{{ activity.time }}</div>
                </div>
                <div class="activity-content">
                  <div class="activity-header">
                    <h3>{{ activity.title }}</h3>
                    <span class="tag" :class="activity.tagClass">{{ activity.role }}</span>
                  </div>
                  <p class="activity-summary">{{ activity.summary }}</p>
                  <div class="activity-meta">
                    <span><team-outlined /> {{ activity.participants }}人参会</span>
                    <span><message-outlined /> {{ activity.comments }}条发言</span>
                    <span><check-circle-outlined /> {{ activity.resolutions }}项决议</span>
                    <a href="#" class="view-detail">查看档案详情</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 重要观点 -->
          <section class="insights-section">
            <h2 class="section-title">重要观点与思想</h2>
            <div class="insights-grid">
              <div class="insight-card" v-for="insight in person.insights" :key="insight.id">
                <div class="insight-header">
                  <div class="insight-meta">
                    <span class="insight-date">{{ insight.date }}</span>
                    <span class="insight-topic">{{ insight.topic }}</span>
                  </div>
                  <div class="insight-stats">
                    <span><bulb-outlined /> {{ insight.type }}</span>
                  </div>
                </div>
                <div class="insight-content">
                  <p>{{ insight.content }}</p>
                </div>
                <div class="insight-footer">
                  <span class="meeting-ref">来自：{{ insight.source }}</span>
                  <a href="#" class="view-context">查看原文档案</a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- 右侧边栏 -->
        <aside class="sidebar-section">
          <!-- 主导议题 -->
          <div class="sidebar-card">
            <h3 class="card-title">
              <star-outlined />
              主导议题
            </h3>
            <div class="topic-list">
              <a href="#" class="topic-item" v-for="topic in person.topics" :key="topic.id">
                <span class="topic-name">{{ topic.name }}</span>
                <span class="topic-status">{{ topic.status }}</span>
              </a>
            </div>
          </div>

          <!-- 关键人物关系 -->
          <div class="sidebar-card">
            <h3 class="card-title">
              <team-outlined />
              关键人物关系
            </h3>
            <div class="collaborator-list">
              <a href="#" class="collaborator-item" v-for="collaborator in person.collaborators" :key="collaborator.id">
                <div class="collaborator-avatar">{{ collaborator.name.charAt(0) }}</div>
                <div class="collaborator-info">
                  <div class="collaborator-name">{{ collaborator.name }}</div>
                  <div class="collaborator-role">{{ collaborator.role }}</div>
                </div>
                <div class="collaboration-count">
                  <span>{{ collaborator.relation }}</span>
                </div>
              </a>
            </div>
          </div>

          <!-- 相关历史文献 -->
          <div class="sidebar-card">
            <h3 class="card-title">
              <book-outlined />
              相关历史文献
            </h3>
            <div class="document-list">
              <a href="#" class="document-item" v-for="doc in person.documents" :key="doc.id">
                <div class="document-icon">
                  <component :is="doc.icon" />
                </div>
                <div class="document-info">
                  <div class="document-title">{{ doc.title }}</div>
                  <div class="document-meta">{{ doc.year }} | {{ doc.role }}</div>
                </div>
              </a>
            </div>
          </div>
        </aside>
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
import { ref } from 'vue'
import { Row, Col } from 'ant-design-vue'
import PersonHeader from '@/components/common/PersonHeader.vue'
import {
  BankOutlined,
  HomeOutlined,
  SearchOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  StarOutlined,
  ArrowUpOutlined,
  TeamOutlined,
  BookOutlined,
  SolutionOutlined,
  ReadOutlined,
  ProjectOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  BulbOutlined
} from '@ant-design/icons-vue'

// 人物数据
const person = ref({
  name: '张国强',
  isHistorical: true,
  tags: ['董事长', '战略决策委员会', '高管团队'],
  department: '战略规划部',
  position: '董事长',
  tenure: '2018年3月至今',
  background: '哈佛商学院MBA',
  biography: [
    '张国强，男，1968年生，现任公司董事长兼战略规划部负责人。哈佛商学院MBA，曾任职于多家世界500强企业，拥有超过25年的企业管理经验。',
    '2018年3月加入公司担任董事长一职，主导了公司数字化转型战略的制定与实施，推动公司市值在三年内增长超过200%。在其领导下，公司成功拓展了国际市场，建立了完善的研发创新体系。',
    '张国强董事长以其前瞻性的战略眼光和果断的决策风格著称，是公司数字化转型和全球化战略的核心推动者。'
  ],
  stats: {
    meetings: 126,
    meetingRank: 3,
    chairMeetings: 45,
    chairRank: 2,
    topics: 89,
    keyTopicRatio: 78,
    views: 234,
    influenceIndex: 92
  },
  activities: [
    {
      id: 1,
      date: '2023-12-15',
      time: '14:30',
      title: '数字化转型战略季度评审会议',
      role: '主持人',
      tagClass: 'tag-blue',
      summary: '主持季度评审会议，评估数字化转型第一阶段执行情况，讨论技术挑战和资源配置问题。',
      participants: 15,
      comments: 8,
      resolutions: 4
    },
    {
      id: 2,
      date: '2023-12-10',
      time: '10:00',
      title: '高管团队周例会',
      role: '参会人',
      tagClass: 'tag-green',
      summary: '参与周例会讨论，重点关注市场拓展策略和新产品研发进展。提出加强与战略客户合作的建议。',
      participants: 8,
      comments: 3,
      resolutions: 2
    }
  ],
  insights: [
    {
      id: 1,
      date: '2023-12-15',
      topic: '数字化转型',
      type: '核心思想',
      content: '"我们需要加快云基础设施建设进度，这是支撑后续业务创新的关键。建议在明年Q1完成核心系统上云。"',
      source: '数字化转型战略季度评审会议'
    },
    {
      id: 2,
      date: '2023-12-10',
      topic: '市场战略',
      type: '战略思想',
      content: '"建议将重点客户服务前置，组建专门的客户成功团队，提升客户满意度和续约率。"',
      source: '高管团队周例会'
    }
  ],
  topics: [
    {
      id: 1,
      name: '数字化转型战略规划',
      status: '核心议题'
    },
    {
      id: 2,
      name: '新产品研发计划',
      status: '重要议题'
    },
    {
      id: 3,
      name: '市场拓展战略',
      status: '长期议题'
    }
  ],
  collaborators: [
    {
      id: 1,
      name: '李明',
      role: '技术总监',
      relation: '核心合作伙伴'
    },
    {
      id: 2,
      name: '王洪',
      role: '产品总监',
      relation: '重要合作者'
    }
  ],
  documents: [
    {
      id: 1,
      title: '《数字化转型白皮书》',
      year: '2022年',
      role: '主要撰写人',
      icon: 'FileTextOutlined'
    },
    {
      id: 2,
      title: '《公司五年发展规划》',
      year: '2021年',
      role: '核心制定者',
      icon: 'FileTextOutlined'
    },
    {
      id: 3,
      title: '《全球化战略演讲稿》',
      year: '2020年',
      role: '演讲者',
      icon: 'FileTextOutlined'
    }
  ],
  honors: [
    {
      id: 1,
      title: '2023年度优秀管理者',
      date: '2023-12-20',
      description: '在数字化转型战略实施过程中表现突出，带领团队取得显著成果。',
      issuer: '公司董事会',
      certificateUrl: '#'
    },
    {
      id: 2,
      title: '数字化转型突出贡献奖',
      date: '2022-06-15',
      description: '在推动公司数字化转型过程中做出重要贡献，实现业务创新和效率提升。',
      issuer: '公司战略委员会',
      certificateUrl: '#'
    }
  ],
  appointments: [
    {
      id: 1,
      position: '董事长',
      department: '董事长办公室',
      startDate: '2020-03-01',
      endDate: null,
      summary: '全面负责公司战略规划和重大决策，推动公司数字化转型和国际化发展。',
      documentNumber: '任字[2020]001号',
      tagClass: 'tag-blue'
    },
    {
      id: 2,
      position: '总经理',
      department: '总经理办公室',
      startDate: '2018-01-15',
      endDate: '2020-02-29',
      summary: '负责公司日常运营管理，推动业务创新和团队建设。',
      documentNumber: '任字[2018]002号',
      tagClass: 'tag-green'
    }
  ]
})
</script>

<style lang="less" scoped>
.common-knowledge-detail {
  min-height: 100vh;
  background-color: #f0f2f5;
}

/* 导航栏样式 */
.header {
  background-color: white;
  padding: 15px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #1a4b91;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #333333;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav-links a:hover, .nav-links a.active {
  background-color: #1a4b91;
  color: white;
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

/* 人物概览区域 */
.person-overview {
  background: white;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.person-overview:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* 标签样式 */
.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: normal;
}

.tag-blue {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.tag-green {
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.tag-orange {
  background-color: #fff7e6;
  color: #fa8c16;
  border: 1px solid #ffd591;
}

/* 人物头像和徽章 */
.person-avatar.large {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.person-historical-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #f5222d;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 5px;
}

.stat-label {
  color: #666666;
  margin-bottom: 10px;
}

.stat-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #52c41a;
}

/* 内容布局 */
.content-layout {
  display: flex;
  gap: 30px;
  margin-top: 30px;
}

.main-section {
  flex: 2;
}

.sidebar-section {
  flex: 1;
  min-width: 300px;
}

/* 主要内容区块 */
.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 活动时间轴 */
.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.activity-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.activity-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.activity-time {
  min-width: 100px;
}

.activity-time .date {
  font-weight: bold;
  color: #1a4b91;
}

.activity-time .time {
  color: #666666;
  font-size: 12px;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.activity-header h3 {
  font-size: 16px;
  margin: 0;
}

.activity-summary {
  color: #666666;
  margin-bottom: 10px;
}

.activity-meta {
  display: flex;
  gap: 15px;
  color: #666666;
  font-size: 13px;
}

.view-detail {
  color: #1a4b91;
  text-decoration: none;
  margin-left: auto;
}

/* 观点卡片 */
.insights-grid {
  display: grid;
  gap: 20px;
}

.insight-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.insight-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.insight-meta {
  display: flex;
  gap: 15px;
  color: #666666;
  font-size: 13px;
}

.insight-content {
  color: #333333;
  margin-bottom: 15px;
}

.insight-footer {
  display: flex;
  justify-content: space-between;
  color: #666666;
  font-size: 12px;
}

/* 侧边栏卡片 */
.sidebar-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #1a4b91;
  display: flex;
  align-items: center;
  gap: 8px;
}

.topic-list, .collaborator-list, .document-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.topic-item, .collaborator-item, .document-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 6px;
  text-decoration: none;
  color: #333333;
  transition: all 0.3s;
}

.topic-item:hover, .collaborator-item:hover, .document-item:hover {
  background: rgba(26, 75, 145, 0.1);
}

.collaborator-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.collaborator-info {
  flex: 1;
  margin-left: 10px;
}

.collaborator-name {
  font-weight: bold;
}

.collaborator-role {
  font-size: 12px;
  color: #666666;
}

.document-icon {
  font-size: 20px;
  color: #1a4b91;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.document-info {
  flex: 1;
}

.document-title {
  font-weight: 500;
  margin-bottom: 3px;
}

.document-meta {
  font-size: 12px;
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

/* 响应式调整 */
@media (max-width: 1200px) {
  .content-layout {
    flex-direction: column;
  }
  
  .sidebar-section {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .person-header {
    flex-direction: column;
    gap: 20px;
  }

  .person-actions {
    flex-direction: column;
    width: 100%;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .person-meta {
    flex-direction: column;
    gap: 10px;
  }
}

/* 人物元信息样式 */
.person-meta {
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  padding: 8px 0;
}

.meta-item :deep(.anticon) {
  color: var(--primary-color);
  font-size: 16px;
}

/* 人物标题样式 */
.person-title {
  margin-bottom: 20px;
}

.person-title h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: var(--primary-color);
}

.person-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 操作按钮样式 */
.person-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.action-btn {
  padding: 12px 24px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: white;
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 14px;
  min-width: 160px;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(26, 75, 145, 0.05), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.action-btn:hover {
  background: var(--bg-light);
  color: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.action-btn:hover::before {
  transform: translateX(100%);
}

.action-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-btn :deep(.anticon) {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.action-btn:hover :deep(.anticon) {
  transform: scale(1.1);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .action-btn {
    min-width: 140px;
  }
}

@media (max-width: 576px) {
  .action-btn {
    width: 100%;
    min-width: auto;
  }
}

/* 人物头部布局 */
.person-header {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  position: relative;
}

.person-avatar-section {
  position: relative;
  flex-shrink: 0;
}

.person-info-section {
  flex: 1;
  min-width: 0;
}

.person-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-shrink: 0;
  margin-left: auto;
}

.action-btn {
  padding: 12px 24px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: white;
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 14px;
  min-width: 160px;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(26, 75, 145, 0.05), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.action-btn:hover {
  background: var(--bg-light);
  color: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.action-btn:hover::before {
  transform: translateX(100%);
}

.action-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-btn :deep(.anticon) {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.action-btn:hover :deep(.anticon) {
  transform: scale(1.1);
}

/* 第一个按钮特殊样式 */
.action-btn:first-child {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.action-btn:first-child:hover {
  background: #0e2c59;
  color: white;
  border-color: #0e2c59;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .person-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .person-actions {
    flex-direction: row;
    width: 100%;
    margin-left: 0;
  }

  .action-btn {
    flex: 1;
  }
}

@media (max-width: 576px) {
  .person-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}

/* 奖励荣誉样式 */
.honors-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.honor-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.honor-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.honor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.honor-title {
  font-size: 16px;
  font-weight: bold;
  color: #1a4b91;
}

.honor-date {
  font-size: 12px;
  color: #666666;
}

.honor-content {
  color: #666666;
  margin-bottom: 15px;
}

.honor-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.honor-issuer {
  color: #666666;
}

.view-certificate {
  color: #1a4b91;
  text-decoration: none;
}

/* 职务任免样式 */
.appointments-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.appointment-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.appointment-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.appointment-time {
  min-width: 100px;
}

.appointment-time .date {
  font-weight: bold;
  color: #1a4b91;
}

.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.appointment-header h3 {
  font-size: 16px;
  margin: 0;
}

.appointment-summary {
  color: #666666;
  margin-bottom: 10px;
}

.appointment-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666666;
  font-size: 12px;
}

.view-document {
  color: #1a4b91;
  text-decoration: none;
}
</style> 