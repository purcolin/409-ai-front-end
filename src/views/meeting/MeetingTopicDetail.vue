<template>
  <div>
    <app-header />
    <div class="main-container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/meeting">档案管理</router-link>
        <span class="separator">/</span>
        <router-link to="/meeting">会议列表</router-link>
        <span class="separator">/</span>
        <span>会议详情</span>
      </div>

      <!-- 会议详情头部 -->
      <div class="meeting-header">
        <div class="meeting-title">
          <span>2023年度工作总结暨2024年规划会议</span>
          <span class="meeting-status status-completed">已完成</span>
        </div>
        <div class="meeting-meta">
          <div class="meta-item">
            <calendar-outlined />
            <span>2023-12-15 14:00</span>
          </div>
          <div class="meta-item">
            <environment-outlined />
            <span>北京总部会议室</span>
          </div>
          <div class="meta-item">
            <team-outlined />
            <span>15人参会</span>
          </div>
          <div class="meta-item">
            <user-outlined />
            <span>张国强（主持人）</span>
          </div>
        </div>
        <div class="meeting-tags">
          <span class="tag">年度会议</span>
          <span class="tag">工作总结</span>
          <span class="tag">规划会议</span>
          <span class="tag">重要</span>
        </div>
      </div>

      <!-- 会议内容布局 -->
      <div class="meeting-content">
        <!-- 主要内容区域 -->
        <div class="content-main">
          <!-- 会议议程 -->
          <div class="card">
            <div class="card-header">
              <span>会议议程</span>
              <clock-circle-outlined />
            </div>
            <div class="card-content">
              <div class="agenda-list">
                <div class="agenda-item">
                  <div class="agenda-time">14:00 - 14:10</div>
                  <div class="agenda-content">
                    <div class="agenda-title">开场致辞</div>
                    <div class="agenda-speaker">张国强</div>
                  </div>
                </div>
                <div class="agenda-item">
                  <div class="agenda-time">14:10 - 15:00</div>
                  <div class="agenda-content">
                    <div class="agenda-title">2023年度工作总结</div>
                    <div class="agenda-speaker">李明</div>
                  </div>
                </div>
                <div class="agenda-item">
                  <div class="agenda-time">15:00 - 16:00</div>
                  <div class="agenda-content">
                    <div class="agenda-title">2024年发展规划</div>
                    <div class="agenda-speaker">王洪</div>
                  </div>
                </div>
                <div class="agenda-item">
                  <div class="agenda-time">16:00 - 16:30</div>
                  <div class="agenda-content">
                    <div class="agenda-title">讨论与总结</div>
                    <div class="agenda-speaker">全体参会人员</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 会议纪要 -->
          <div class="card">
            <div class="card-header">
              <span>会议纪要</span>
              <file-text-outlined />
            </div>
            <div class="card-content">
              <div class="minutes-section">
                <h3>开场致辞</h3>
                <p>张国强董事长首先对2023年的工作进行了简要回顾，强调了公司在数字化转型、产品创新和市场拓展方面取得的显著成绩。</p>
              </div>
              <div class="minutes-section">
                <h3>2023年度工作总结</h3>
                <p>李明技术总监详细汇报了2023年的技术成果，包括：</p>
                <ul>
                  <li>完成核心系统微服务改造</li>
                  <li>实现数据中台建设</li>
                  <li>优化研发流程，提升交付效率</li>
                </ul>
              </div>
              <div class="minutes-section">
                <h3>2024年发展规划</h3>
                <p>王洪产品总监提出了2024年的发展规划，重点包括：</p>
                <ul>
                  <li>推出新一代智能产品线</li>
                  <li>加强市场拓展力度</li>
                  <li>优化客户服务体系</li>
                </ul>
              </div>
              <div class="minutes-section">
                <h3>讨论与总结</h3>
                <p>与会人员就各项议题进行了深入讨论，达成了以下共识：</p>
                <ul>
                  <li>继续推进数字化转型战略</li>
                  <li>加强技术创新和人才培养</li>
                  <li>优化组织结构和流程</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 会议决议 -->
          <div class="card">
            <div class="card-header">
              <span>会议决议</span>
              <check-circle-outlined />
            </div>
            <div class="card-content">
              <div class="resolution-list">
                <div class="resolution-item">
                  <div class="resolution-title">数字化转型战略</div>
                  <div class="resolution-content">
                    <p>通过2024年数字化转型战略规划，计划投入5000万元用于技术升级和系统改造。</p>
                  </div>
                  <div class="resolution-meta">
                    <span class="resolution-status status-completed">已执行</span>
                    <span class="resolution-deadline">2024-12-31</span>
                  </div>
                </div>
                <div class="resolution-item">
                  <div class="resolution-title">新产品线开发</div>
                  <div class="resolution-content">
                    <p>启动新一代智能产品线开发项目，预计2024年Q3完成首款产品发布。</p>
                  </div>
                  <div class="resolution-meta">
                    <span class="resolution-status status-pending">进行中</span>
                    <span class="resolution-deadline">2024-09-30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="content-sidebar">
          <!-- 参会人员 -->
          <div class="card">
            <div class="card-header">
              <span>参会人员</span>
              <team-outlined />
            </div>
            <div class="card-content">
              <div class="attendee-list">
                <div class="attendee-item">
                  <div class="attendee-avatar">张</div>
                  <div class="attendee-info">
                    <div class="attendee-name">张国强</div>
                    <div class="attendee-position">董事长</div>
                  </div>
                </div>
                <div class="attendee-item">
                  <div class="attendee-avatar">李</div>
                  <div class="attendee-info">
                    <div class="attendee-name">李明</div>
                    <div class="attendee-position">技术总监</div>
                  </div>
                </div>
                <div class="attendee-item">
                  <div class="attendee-avatar">王</div>
                  <div class="attendee-info">
                    <div class="attendee-name">王洪</div>
                    <div class="attendee-position">产品总监</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 相关文档 -->
          <div class="card">
            <div class="card-header">
              <span>相关文档</span>
              <folder-outlined />
            </div>
            <div class="card-content">
              <div class="document-list">
                <div class="document-item">
                  <file-outlined />
                  <div class="document-info">
                    <div class="document-name">2023年度工作总结报告.pdf</div>
                    <div class="document-meta">2.5MB · 2023-12-10</div>
                  </div>
                </div>
                <div class="document-item">
                  <file-outlined />
                  <div class="document-info">
                    <div class="document-name">2024年发展规划方案.docx</div>
                    <div class="document-meta">1.8MB · 2023-12-12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 相关会议 -->
          <div class="card">
            <div class="card-header">
              <span>相关会议</span>
              <calendar-outlined />
            </div>
            <div class="card-content">
              <div class="related-meetings">
                <div class="related-meeting-item">
                  <div class="meeting-date">2023-09-20</div>
                  <div class="meeting-title">三季度工作总结会议</div>
                </div>
                <div class="related-meeting-item">
                  <div class="meeting-date">2023-06-15</div>
                  <div class="meeting-title">年中工作总结会议</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  BankOutlined,
  FileTextOutlined,
  SearchOutlined,
  BarChartOutlined,
  SettingOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  FolderOutlined,
  FileOutlined
} from '@ant-design/icons-vue'
import AppHeader from '@/components/meeting/MeetingHeader.vue'
</script>

<style lang="less" scoped>
/* 基础样式变量 */
:root {
  --primary-color: #1a4b91;
  --secondary-color: #f5222d;
  --text-color: #333333;
  --text-secondary: #666666;
  --border-color: #e8e8e8;
  --bg-light: #f5f5f5;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #f5222d;
  --header-height: 60px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

body {
  background-color: #f0f2f5;
  color: #333333;
  line-height: 1.6;
}

/* 主内容布局 */
.main-container {
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
  color: #1a4b91;
  text-decoration: none;
  transition: all 0.3s;
}

.breadcrumb a:hover {
  color: #f5222d;
}

.breadcrumb .separator {
  margin: 0 8px;
  color: #666666;
}

/* 会议详情头部 */
.meeting-header {
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.meeting-header:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.meeting-title {
  font-size: 24px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.meeting-status {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: normal;
}

.status-completed {
  background-color: rgba(82, 196, 26, 0.1);
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status-pending {
  background-color: rgba(250, 173, 20, 0.1);
  color: #faad14;
  border: 1px solid #ffd591;
}

.meeting-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666666;
}

.meta-item i {
  color: #1a4b91;
  font-size: 16px;
}

.meeting-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  background-color: rgba(26, 75, 145, 0.1);
  color: #1a4b91;
  border: 1px solid rgba(26, 75, 145, 0.2);
  transition: all 0.3s;
}

.tag:hover {
  background-color: rgba(26, 75, 145, 0.15);
}

/* 会议内容布局 */
.meeting-content {
  display: flex;
  gap: 20px;
}

.content-main {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 卡片通用样式 */
.card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #1a4b91;
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

/* 议程列表样式 */
.agenda-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.agenda-item {
  display: flex;
  gap: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.agenda-time {
  min-width: 100px;
  font-weight: bold;
  color: #1a4b91;
}

.agenda-content {
  flex: 1;
}

.agenda-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.agenda-speaker {
  font-size: 12px;
  color: #666666;
}

/* 会议纪要样式 */
.minutes-section {
  margin-bottom: 20px;
}

.minutes-section h3 {
  color: #1a4b91;
  margin-bottom: 10px;
  font-size: 16px;
}

.minutes-section p {
  margin-bottom: 10px;
  line-height: 1.6;
}

.minutes-section ul {
  padding-left: 20px;
  margin-bottom: 10px;
}

.minutes-section li {
  margin-bottom: 5px;
}

/* 会议决议样式 */
.resolution-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.resolution-item {
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.resolution-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #1a4b91;
}

.resolution-content {
  margin-bottom: 10px;
}

.resolution-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.resolution-deadline {
  color: #666666;
}

/* 参会人员样式 */
.attendee-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.attendee-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.attendee-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.attendee-info {
  flex: 1;
}

.attendee-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.attendee-position {
  font-size: 12px;
  color: #666666;
}

/* 文档列表样式 */
.document-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.document-info {
  flex: 1;
}

.document-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.document-meta {
  font-size: 12px;
  color: #666666;
}

/* 相关会议样式 */
.related-meetings {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.related-meeting-item {
  padding: 10px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.meeting-date {
  font-size: 12px;
  color: #666666;
  margin-bottom: 5px;
}

.meeting-title {
  font-weight: bold;
  color: #1a4b91;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .main-container {
    padding: 20px;
  }
}

@media (max-width: 992px) {
  .meeting-content {
    flex-direction: column;
  }

  .content-main, .content-sidebar {
    flex: none;
  }
}

@media (max-width: 768px) {
  .meeting-meta {
    flex-direction: column;
    gap: 10px;
  }

  .meeting-title {
    font-size: 20px;
  }
}

@media (max-width: 576px) {
  .header {
    padding: 10px 20px;
  }

  .nav-links {
    display: none;
  }
}
</style>
