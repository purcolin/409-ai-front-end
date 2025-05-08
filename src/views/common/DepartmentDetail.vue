<template>
  <div class="department-detail">
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
        <router-link to="/department">
          <team-outlined />
          部门目录
        </router-link>
        <span class="separator">/</span>
        <span>部门详情</span>
      </div>

      <div class="department-info-container">
        <!-- 左侧部门基本信息 -->
        <div class="department-basic-info">
          <div class="department-header">
            <div class="department-icon">技</div>
            <div class="department-title">
              <h1>技术中心</h1>
              <div class="department-subtitle">
                <span class="badge badge-primary">业务部门</span>
                <span class="status-badge status-normal">正常</span>
              </div>
            </div>
          </div>

          <div class="department-stats">
            <div class="stat-item">
              <div class="stat-value">45</div>
              <div class="stat-label">员工人数</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">12</div>
              <div class="stat-label">会议次数</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">8</div>
              <div class="stat-label">项目数量</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">3</div>
              <div class="stat-label">子部门</div>
            </div>
          </div>

          <div class="department-contact">
            <div class="contact-item">
              <user-outlined />
              <span>负责人：李明</span>
            </div>
            <div class="contact-item">
              <phone-outlined />
              <span>联系电话：13800138000</span>
            </div>
            <div class="contact-item">
              <mail-outlined />
              <span>邮箱：tech@example.com</span>
            </div>
            <div class="contact-item">
              <environment-outlined />
              <span>办公地点：研发大厦3楼</span>
            </div>
          </div>
        </div>

        <!-- 右侧部门详情卡片 -->
        <div class="department-detail-cards">
          <!-- 部门职责卡片 -->
          <div class="detail-card">
            <div class="card-header">
              <book-outlined />
              <span>部门职责</span>
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

          <!-- 部门成员卡片 -->
          <div class="detail-card">
            <div class="card-header">
              <team-outlined />
              <span>部门成员</span>
            </div>
            <div class="card-content">
              <a-table
                :columns="memberColumns"
                :data-source="memberData"
                :pagination="false"
                size="small"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'avatar'">
                    <div class="member-avatar">{{ record.name.substring(0, 1) }}</div>
                  </template>
                  <template v-if="column.key === 'name'">
                    <div class="member-info">
                      <div class="member-name">{{ record.name }}</div>
                      <div class="member-position">{{ record.position }}</div>
                    </div>
                  </template>
                </template>
              </a-table>
            </div>
          </div>

          <!-- 最近会议卡片 -->
          <div class="detail-card">
            <div class="card-header">
              <calendar-outlined />
              <span>最近会议</span>
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

          <!-- 相关项目卡片 -->
          <div class="detail-card">
            <div class="card-header">
              <project-outlined />
              <span>相关项目</span>
            </div>
            <div class="card-content">
              <ul class="project-list">
                <li class="project-item">
                  <div class="project-title">新一代产品研发项目</div>
                  <div class="project-meta">
                    <span><calendar-outlined /> 2023-09-01 ~ 2024-03-31</span>
                    <span><team-outlined /> 参与人数: 15</span>
                  </div>
                </li>
                <li class="project-item">
                  <div class="project-title">系统架构优化项目</div>
                  <div class="project-meta">
                    <span><calendar-outlined /> 2023-08-15 ~ 2023-12-31</span>
                    <span><team-outlined /> 参与人数: 8</span>
                  </div>
                </li>
                <li class="project-item">
                  <div class="project-title">技术培训计划</div>
                  <div class="project-meta">
                    <span><calendar-outlined /> 2023-10-01 ~ 2023-12-31</span>
                    <span><team-outlined /> 参与人数: 30</span>
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
import { ref } from 'vue'
import DepartmentHeader from '@/components/common/DepartmentHeader.vue'
import {
  BankOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  BookOutlined,
  ProjectOutlined
} from '@ant-design/icons-vue'

// 部门成员表格列定义
const memberColumns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 60,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120,
  },
  {
    title: '职位',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: '入职时间',
    dataIndex: 'joinDate',
    key: 'joinDate',
    width: 120,
  }
]

// 部门成员数据
const memberData = ref([
  {
    key: '1',
    name: '李明',
    position: '技术总监',
    joinDate: '2020-01-15'
  },
  {
    key: '2',
    name: '王洪',
    position: '高级架构师',
    joinDate: '2020-03-20'
  },
  {
    key: '3',
    name: '张工',
    position: '研发经理',
    joinDate: '2020-06-10'
  },
  {
    key: '4',
    name: '刘工',
    position: '前端开发',
    joinDate: '2021-02-15'
  },
  {
    key: '5',
    name: '陈工',
    position: '后端开发',
    joinDate: '2021-03-20'
  }
])
</script>

<style lang="less" scoped>
.department-detail {
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

/* 部门信息容器 */
.department-info-container {
  display: flex;
  gap: 30px;
}

/* 部门基本信息 */
.department-basic-info {
  flex: 1;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.department-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.department-icon {
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
  box-shadow: 0 3px 8px rgba(26, 75, 145, 0.2);
}

.department-title h1 {
  margin: 0;
  font-size: 24px;
  color: #1a4b91;
}

.department-subtitle {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: normal;
}

.badge-primary {
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: normal;
}

.status-normal {
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

/* 部门统计 */
.department-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 30px;
}

.stat-item {
  background: rgba(26, 75, 145, 0.03);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666666;
}

/* 部门联系方式 */
.department-contact {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #666666;
}

/* 部门详情卡片 */
.department-detail-cards {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.card-header {
  background: #1a4b91;
  color: white;
  padding: 15px 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.card-content {
  padding: 20px;
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

/* 成员头像样式 */
.member-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.member-info {
  display: flex;
  flex-direction: column;
}

.member-name {
  font-weight: bold;
  color: #1a4b91;
}

.member-position {
  font-size: 12px;
  color: #666666;
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

/* 项目列表样式 */
.project-list {
  list-style: none;
}

.project-item {
  padding: 15px 0;
  border-bottom: 1px dashed #e8e8e8;
  transition: all 0.3s;
}

.project-item:hover {
  background-color: rgba(26, 75, 145, 0.02);
  padding-left: 10px;
}

.project-item:last-child {
  border-bottom: none;
}

.project-title {
  font-weight: bold;
  font-size: 15px;
  color: #1a4b91;
  margin-bottom: 8px;
}

.project-meta {
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
  .department-info-container {
    flex-direction: column;
  }
  
  .department-basic-info {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .department-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .department-header {
    flex-direction: column;
    text-align: center;
  }
  
  .department-subtitle {
    justify-content: center;
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
</style> 