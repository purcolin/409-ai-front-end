<template>
  <div>
    <app-header />
    <div class="main-content">
      <!-- 搜索区域 -->
      <div class="hero-section">
        <h1 class="hero-title">会议纪要档案知识专题</h1>
        <p class="hero-subtitle">高效管理、检索和分析所有会议档案的知识</p>
        <div class="search-container">
          <input type="text" class="search-box" placeholder="搜索会议档案关键词...">
          <button class="search-btn">
            <search-outlined />
            搜索
          </button>
        </div>

        <!-- 添加搜索说明文字 -->
        <div class="search-helper">
          请输入会议名称、议题关键词或相关人员姓名进行搜索
        </div>

        <!-- 热门标签样式 -->
        <div class="hot-tags">
          <span class="hot-tag">数字化转型</span>
          <span class="hot-tag">新产品开发</span>
          <span class="hot-tag">技术架构升级</span>
          <span class="hot-tag">数据治理</span>
          <span class="hot-tag">系统迁移</span>
        </div>
      </div>

      <!-- 统计指标区域 -->
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-value">230</div>
          <div class="stat-label">会议总数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">458</div>
          <div class="stat-label">议题总数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">594</div>
          <div class="stat-label">成员总数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">45</div>
          <div class="stat-label">部门总数</div>
        </div>
      </div>

      <!-- 分类导航区域 -->
      <section class="category-section">
        <h2 class="section-title">档案分类导航</h2>
        <div class="category-grid">
          <router-link to="/meeting" class="category-card">
            <div class="category-icon">
              <calendar-outlined />
            </div>
            <div class="category-name">按时间浏览</div>
            <div class="category-desc">按年度、季度、月份查看会议纪要档案</div>
          </router-link>
          <router-link to="/department" class="category-card">
            <div class="category-icon">
              <bank-outlined />
            </div>
            <div class="category-name">按部门浏览</div>
            <div class="category-desc">查看各部门相关的会议纪要档案</div>
          </router-link>
          <router-link to="/meeting" class="category-card">
            <div class="category-icon">
              <project-outlined />
            </div>
            <div class="category-name">按项目浏览</div>
            <div class="category-desc">查看与特定项目相关的会议纪要</div>
          </router-link>
          <router-link to="/meeting" class="category-card">
            <div class="category-icon">
              <tags-outlined />
            </div>
            <div class="category-name">按主题浏览</div>
            <div class="category-desc">按议题主题分类浏览会议纪要</div>
          </router-link>
        </div>
      </section>

      <!-- 重点议题模块 -->
      <section class="topics-section">
        <h2 class="section-title">重点议题</h2>
        <div class="featured-topics">
          <div class="featured-topic-card">
            <div class="topic-header">
              <span>数字化转型战略</span>
              <span class="tag tag-red">重要</span>
            </div>
            <div class="topic-content">
              <div class="topic-summary">
                制定企业整体数字化转型路线图，包括技术架构升级、业务流程重组和数据治理体系建设
              </div>
              <div class="topic-meta">
                <span><file-text-outlined /> 3次会议</span>
                <span><user-outlined /> 张国强</span>
                <span><check-circle-outlined /> 已形成决议</span>
              </div>
            </div>
            <div class="topic-footer">
              <router-link to="/meeting/topics/1" class="topic-link">查看详情</router-link>
            </div>
          </div>

          <div class="featured-topic-card">
            <div class="topic-header">
              <span>新产品线开发计划</span>
              <span class="tag tag-orange">进行中</span>
            </div>
            <div class="topic-content">
              <div class="topic-summary">
                针对市场需求变化，规划新产品线开发方向、资源配置与上市时间表
              </div>
              <div class="topic-meta">
                <span><file-text-outlined /> 2次会议</span>
                <span><user-outlined /> 王洪</span>
                <span><sync-outlined /> 讨论中</span>
              </div>
            </div>
            <div class="topic-footer">
              <router-link to="/meeting/topics/2" class="topic-link">查看详情</router-link>
            </div>
          </div>

          <div class="featured-topic-card">
            <div class="topic-header">
              <span>技术架构升级</span>
              <span class="tag tag-blue">执行中</span>
            </div>
            <div class="topic-content">
              <div class="topic-summary">
                评估微服务改造与云原生架构的可行性与实施路径，制定技术架构升级计划
              </div>
              <div class="topic-meta">
                <span><file-text-outlined /> 1次会议</span>
                <span><user-outlined /> 李明</span>
                <span><hourglass-outlined /> 执行中</span>
              </div>
            </div>
            <div class="topic-footer">
              <router-link to="/meeting/topics/3" class="topic-link">查看详情</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- 最新会议模块 -->
      <section class="recent-section">
        <h2 class="section-title">最新会议</h2>
        <div class="recent-meetings">
          <div class="recent-meeting-card">
            <div class="meeting-date">2023-12-15</div>
            <div class="meeting-content">
              <div class="meeting-title">年度工作总结暨2024年规划会议</div>
              <div class="meeting-meta">
                <span><environment-outlined /> 北京总部</span>
                <span><team-outlined /> 15人参会</span>
                <span><user-outlined /> 张国强</span>
              </div>
            </div>
            <router-link :to="'/meeting/detail/' + 1" class="meeting-link">
              <right-outlined />
            </router-link>
          </div>

          <div class="recent-meeting-card">
            <div class="meeting-date">2023-09-20</div>
            <div class="meeting-content">
              <div class="meeting-title">新版UI设计规范评审会议</div>
              <div class="meeting-meta">
                <span><environment-outlined /> 设计中心</span>
                <span><team-outlined /> 8人参会</span>
                <span><user-outlined /> 刘晓</span>
              </div>
            </div>
            <router-link :to="'/meeting/detail/' + 2" class="meeting-link">
              <right-outlined />
            </router-link>
          </div>

          <div class="recent-meeting-card">
            <div class="meeting-date">2023-06-05</div>
            <div class="meeting-content">
              <div class="meeting-title">技术架构升级方案讨论</div>
              <div class="meeting-meta">
                <span><environment-outlined /> 技术中心</span>
                <span><team-outlined /> 12人参会</span>
                <span><user-outlined /> 李明</span>
              </div>
            </div>
            <router-link :to="'/meeting/detail/' + 3" class="meeting-link">
              <right-outlined />
            </router-link>
          </div>
        </div>
        <div class="more-link-container">
          <router-link to="/meeting/list" class="more-link">查看所有会议 <right-outlined /></router-link>
        </div>
      </section>

      <!-- 关键参会人员卡片区域 -->
      <section class="topics-section">
        <h2 class="section-title">关键参会人员</h2>
        <div class="personnel-grid">
          <div class="personnel-card">
            <div class="personnel-avatar">张</div>
            <div class="personnel-info">
              <div class="personnel-name">张国强</div>
              <div class="personnel-position">董事长</div>
              <div class="personnel-stats">
                <span><file-text-outlined /> 12次会议</span>
                <span><check-circle-outlined /> 5个议题</span>
              </div>
            </div>
          </div>

          <div class="personnel-card">
            <div class="personnel-avatar">李</div>
            <div class="personnel-info">
              <div class="personnel-name">李明</div>
              <div class="personnel-position">技术总监</div>
              <div class="personnel-stats">
                <span><file-text-outlined /> 9次会议</span>
                <span><check-circle-outlined /> 3个议题</span>
              </div>
            </div>
          </div>

          <div class="personnel-card">
            <div class="personnel-avatar">王</div>
            <div class="personnel-info">
              <div class="personnel-name">王洪</div>
              <div class="personnel-position">产品总监</div>
              <div class="personnel-stats">
                <span><file-text-outlined /> 7次会议</span>
                <span><check-circle-outlined /> 4个议题</span>
              </div>
            </div>
          </div>

          <div class="personnel-card">
            <div class="personnel-avatar">刘</div>
            <div class="personnel-info">
              <div class="personnel-name">刘晓</div>
              <div class="personnel-position">设计经理</div>
              <div class="personnel-stats">
                <span><file-text-outlined /> 5次会议</span>
                <span><check-circle-outlined /> 2个议题</span>
              </div>
            </div>
          </div>
        </div>
        <div class="more-link-container">
          <router-link to="/personnel" class="more-link">查看更多参会人员 <right-outlined /></router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/meeting/MeetingHeader.vue'
import {
  SearchOutlined,
  CalendarOutlined,
  BankOutlined,
  ProjectOutlined,
  TagsOutlined,
  FileTextOutlined,
  UserOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  HourglassOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  RightOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
</script>

<style lang="less" scoped>
/* 基础样式 */
:root {
  --primary-color: #1a4b91; /* 主蓝色 */
  --secondary-color: #f5222d; /* 辅助红色 */
  --text-color: #333333;
  --text-secondary: #666666;
  --border-color: #e8e8e8;
  --bg-light: #f0f2f5;
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
  line-height: 1.5;
}

/* 主内容布局 */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
}

/* 英雄区域 */
.hero-section {
  text-align: center;
  padding: 60px 0 30px;
  background-color: #1a4b91;
  border-radius: 10px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(26, 75, 145, 0.8) 0%, rgba(26, 75, 145, 0.6) 100%);
  z-index: 1;
}

.hero-title {
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
}

.hero-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

/* 搜索框样式 */
.search-container {
  margin: 0 auto 20px;
  max-width: 800px;
  position: relative;
  display: flex;
  z-index: 2;
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

/* 添加搜索说明文字 */
.search-helper {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 15px;
  font-size: 14px;
  position: relative;
  z-index: 2;
}

/* 热门标签样式 */
.hot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
  position: relative;
  z-index: 2;
}

.hot-tag {
  padding: 6px 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.hot-tag:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* 统计指标区域 */
.stats-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  flex: 1;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 5px;
}

.stat-label {
  color: #666666;
  font-size: 14px;
}

/* 分类导航区域 */
.category-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #1a4b91;
  padding-left: 15px;
  border-left: 4px solid #f5222d;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.category-card {
  background-color: white;
  border-radius: 10px;
  padding: 30px 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
  text-decoration: none;
  color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.category-icon {
  font-size: 30px;
  color: #1a4b91;
  margin-bottom: 15px;
  width: 70px;
  height: 70px;
  background-color: rgba(26, 75, 145, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.category-desc {
  font-size: 13px;
  color: #666666;
}

/* 专题模块样式 */
.topics-section, .recent-section {
  margin-bottom: 40px;
}

/* 重点议题卡片 */
.featured-topics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.featured-topic-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.featured-topic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.featured-topic-card .topic-header {
  background-color: #1a4b91;
  color: white;
  padding: 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.featured-topic-card .topic-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.featured-topic-card .topic-summary {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
  flex: 1;
}

.featured-topic-card .topic-meta {
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #666666;
}

.featured-topic-card .topic-footer {
  padding: 15px;
  border-top: 1px solid #e8e8e8;
  text-align: right;
}

.featured-topic-card .topic-link {
  color: #1a4b91;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  display: inline-block;
  transition: all 0.3s ease;
}

.featured-topic-card .topic-link:hover {
  color: #0e2c59;
}

/* 最新会议卡片 */
.recent-meetings {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.recent-meeting-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
}

.recent-meeting-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.recent-meeting-card .meeting-date {
  background-color: #1a4b91;
  color: white;
  width: 90px;
  padding: 20px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
}

.recent-meeting-card .meeting-content {
  padding: 15px;
  flex: 1;
}

.recent-meeting-card .meeting-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #1a4b91;
}

.recent-meeting-card .meeting-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  color: #666666;
}

.recent-meeting-card .meeting-link {
  background-color: #f5f5f5;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a4b91;
  transition: all 0.3s ease;
}

.recent-meeting-card .meeting-link:hover {
  background-color: #1a4b91;
  color: white;
}

/* 更多链接 */
.more-link-container {
  text-align: center;
  margin-top: 20px;
}

.more-link {
  color: #1a4b91;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: rgba(26, 75, 145, 0.08);
  transition: all 0.3s ease;
}

.more-link:hover {
  background-color: rgba(26, 75, 145, 0.15);
}

/* 人员卡片样式 */
.personnel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.personnel-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.personnel-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.personnel-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  margin-right: 15px;
}

.personnel-info {
  flex: 1;
}

.personnel-name {
  font-weight: bold;
  font-size: 16px;
}

.personnel-position {
  color: #666666;
  margin-bottom: 5px;
}

.personnel-stats {
  display: flex;
  gap: 10px;
  font-size: 12px;
}

/* 标签样式 */
.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 5px;
  color: white;
  font-weight: normal;
}

.tag-red {
  background-color: #f5222d;
}

.tag-blue {
  background-color: #1a4b91;
}

.tag-green {
  background-color: #52c41a;
}

.tag-orange {
  background-color: #fa8c16;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .main-content {
    padding: 30px 20px;
  }
}

@media (max-width: 992px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .featured-topics {
    grid-template-columns: repeat(2, 1fr);
  }

  .recent-meetings {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 26px;
  }

  .search-container {
    flex-direction: column;
  }

  .search-box {
    border-radius: 12px;
    margin-bottom: 10px;
  }

  .search-btn {
    border-radius: 12px;
    padding: 12px;
    justify-content: center;
  }

  .stats-container {
    flex-wrap: wrap;
  }

  .stat-card {
    flex-basis: calc(50% - 10px);
  }

  .featured-topics {
    grid-template-columns: 1fr;
  }

  .recent-meetings {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
