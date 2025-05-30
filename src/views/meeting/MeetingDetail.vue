<template>
  <div>
    <app-header />
    <div class="main-content">
      <!-- 返回按钮 -->
      <div class="back-link">
        <router-link to="/meeting/search-result">
          <left-outlined />
          返回检索结果
        </router-link>
      </div>

      <!-- 议题概览区域 -->
      <section class="topic-overview">
        <div class="topic-header">
          <div class="topic-title-section">
            <h1>全面数字化转型战略规划与实施路径</h1>
            <div class="topic-tags">
              <span class="tag tag-red">重要</span>
              <span class="tag tag-blue">战略议题</span>
              <span class="tag tag-green">进行中</span>
            </div>
          </div>
          <div class="topic-actions">
            <button class="action-btn">
              <star-outlined />
              关注议题
            </button>
            <button class="action-btn">
              <share-alt-outlined />
              分享
            </button>
            <button class="action-btn">
              <download-outlined />
              导出
            </button>
          </div>
        </div>

        <div class="topic-meta">
          <div class="meta-item">
            <calendar-outlined />
            <span>创建时间：2023-06-15</span>
          </div>
          <div class="meta-item">
            <bank-outlined />
            <span>主导部门：战略规划部</span>
          </div>
          <div class="meta-item">
            <user-outlined />
            <span>负责人：张国强</span>
          </div>
          <div class="meta-item">
            <team-outlined />
            <span>参与人数：32人</span>
          </div>
          <div class="meta-item">
            <file-text-outlined />
            <span>相关会议：8次</span>
          </div>
        </div>

        <div class="topic-summary">
          <h3>议题概述</h3>
          <p>本议题旨在制定企业整体数字化转型路线图，包括技术架构升级、业务流程重组和数据治理体系建设。通过对标行业最佳实践，结合公司实际情况，形成了分阶段、全方位的数字化转型战略规划。数字化转型将分为三个阶段实施：基础设施升级、业务流程数字化和数据驱动创新。</p>
        </div>
      </section>

      <!-- 时间轴与内容区域 -->
      <div class="timeline-content-layout">
        <!-- 左侧时间轴 -->
        <section class="timeline-section">
          <div class="timeline">
            <div class="timeline-item current">
              <div class="timeline-date">2023-12-15</div>
              <div class="timeline-content">
                <div class="timeline-title">
                  <h4>数字化转型战略季度评审会议</h4>
                  <span class="tag tag-blue">会议纪要</span>
                </div>
                <p>评估第一阶段执行情况，讨论技术挑战和资源配置问题。决定加速云基础设施建设。</p>
                <div class="timeline-meta">
                  <span><user-outlined /> 主持：张国强</span>
                  <span><team-outlined /> 15人参会</span>
                  <router-link :to="'/meeting/1'" class="view-detail">查看详情</router-link>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-date">2023-09-20</div>
              <div class="timeline-content">
                <div class="timeline-title">
                  <h4>基础设施规划专项会议</h4>
                  <span class="tag tag-green">决策会议</span>
                </div>
                <p>确定技术架构升级方案，通过云原生改造方案。</p>
                <div class="timeline-meta">
                  <span><user-outlined /> 主持：李明</span>
                  <span><team-outlined /> 12人参会</span>
                  <router-link :to="'/meeting/2'" class="view-detail">查看详情</router-link>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-date">2023-08-05</div>
              <div class="timeline-content">
                <div class="timeline-title">
                  <h4>《企业数字化转型白皮书》发布</h4>
                  <span class="tag tag-orange">重要文档</span>
                </div>
                <p>发布企业数字化转型整体规划与实施路径。</p>
                <div class="timeline-meta">
                  <span><file-pdf-outlined /> PDF文档</span>
                  <span><eye-outlined /> 153次阅读</span>
                  <router-link :to="'/meeting/3'" class="view-detail">查看文档</router-link>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-date">2023-06-15</div>
              <div class="timeline-content">
                <div class="timeline-title">
                  <h4>数字化转型启动会</h4>
                  <span class="tag tag-red">里程碑</span>
                </div>
                <p>正式启动数字化转型项目，确定总体目标和分阶段计划。</p>
                <div class="timeline-meta">
                  <span><user-outlined /> 主持：张国强</span>
                  <span><team-outlined /> 32人参会</span>
                  <router-link :to="'/meeting/4'" class="view-detail">查看详情</router-link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 右侧相关资源 -->
        <section class="resources-section">
          <!-- 关键人物 -->
          <div class="resource-card">
            <h3 class="card-title"><team-outlined /> 关键参与者</h3>
            <div class="key-personnel">
              <div class="personnel-item">
                <div class="personnel-avatar">张</div>
                <div class="personnel-info">
                  <div class="personnel-name">张国强</div>
                  <div class="personnel-role">总负责人</div>
                  <div class="personnel-stats">
                    <span>4次主持</span>
                    <span>12次参会</span>
                  </div>
                </div>
              </div>
              <div class="personnel-item">
                <div class="personnel-avatar">李</div>
                <div class="personnel-info">
                  <div class="personnel-name">李明</div>
                  <div class="personnel-role">技术负责人</div>
                  <div class="personnel-stats">
                    <span>3次主持</span>
                    <span>8次参会</span>
                  </div>
                </div>
              </div>
              <div class="personnel-item">
                <div class="personnel-avatar">王</div>
                <div class="personnel-info">
                  <div class="personnel-name">王洪</div>
                  <div class="personnel-role">产品负责人</div>
                  <div class="personnel-stats">
                    <span>2次主持</span>
                    <span>6次参会</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 相关部门 -->
          <div class="resource-card">
            <h3 class="card-title"><apartment-outlined /> 相关部门</h3>
            <div class="departments">
              <div class="department-item primary">
                <span class="department-name">战略规划部</span>
                <span class="department-role">牵头部门</span>
              </div>
              <div class="department-item">
                <span class="department-name">技术研发部</span>
                <span class="department-role">技术支持</span>
              </div>
              <div class="department-item">
                <span class="department-name">产品规划部</span>
                <span class="department-role">需求对接</span>
              </div>
              <div class="department-item">
                <span class="department-name">市场营销部</span>
                <span class="department-role">市场评估</span>
              </div>
            </div>
          </div>

          <!-- 关联图谱 -->
          <div class="resource-card">
            <h3 class="card-title"><project-outlined /> 关联图谱</h3>
            <div class="graph-container">
              <!-- 这里可以集成 ECharts 图表 -->
            </div>
          </div>

          <!-- 相关文档 -->
          <div class="resource-card">
            <h3 class="card-title"><file-text-outlined /> 相关文档</h3>
            <div class="documents">
              <router-link :to="'/meeting/1'" class="document-item">
                <file-pdf-outlined />
                <div class="document-info">
                  <div class="document-name">数字化转型白皮书.pdf</div>
                  <div class="document-meta">
                    <span>2023-08-05</span>
                    <span>153次阅读</span>
                  </div>
                </div>
              </router-link>
              <router-link :to="'/meeting/2'" class="document-item">
                <file-word-outlined />
                <div class="document-info">
                  <div class="document-name">技术架构规划方案.docx</div>
                  <div class="document-meta">
                    <span>2023-09-15</span>
                    <span>89次阅读</span>
                  </div>
                </div>
              </router-link>
              <router-link :to="'/meeting/3'" class="document-item">
                <file-ppt-outlined />
                <div class="document-info">
                  <div class="document-name">季度进展汇报.pptx</div>
                  <div class="document-meta">
                    <span>2023-12-15</span>
                    <span>42次阅读</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </section>
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
  UserOutlined,
  TeamOutlined,
  StarOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  LeftOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FilePptOutlined,
  EyeOutlined,
  ApartmentOutlined,
  ProjectOutlined
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

/* 顶部导航栏样式 */
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
  height: var(--header-height);
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
  font-size: 14px;
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

/* 返回按钮 */
.back-link {
  margin-bottom: 20px;
}

.back-link a {
  color: #1a4b91;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: all 0.3s;
}

.back-link a:hover {
  color: #f5222d;
}

/* 议题概览区域 */
.topic-overview {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.topic-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.topic-title-section h1 {
  font-size: 28px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 15px;
}

.topic-tags {
  display: flex;
  gap: 10px;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  color: white;
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

.topic-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #333333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s;
}

.action-btn:hover {
  background-color: #1a4b91;
  color: white;
}

.topic-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
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

.topic-summary {
  margin-top: 20px;
}

.topic-summary h3 {
  font-size: 18px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 15px;
}

.topic-summary p {
  line-height: 1.8;
  color: #333333;
}

/* 时间轴与内容布局 */
.timeline-content-layout {
  display: flex;
  gap: 30px;
}

/* 时间轴样式 */
.timeline-section {
  flex: 2;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.timeline-item {
  position: relative;
  padding-left: 30px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #e8e8e8;
}

.timeline-item.current::before {
  background-color: #1a4b91;
}

.timeline-item::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e8e8e8;
  transform: translateX(-5px);
}

.timeline-item.current::after {
  background-color: #1a4b91;
  box-shadow: 0 0 0 4px rgba(26, 75, 145, 0.2);
}

.timeline-date {
  font-size: 14px;
  color: #666666;
  margin-bottom: 10px;
}

.timeline-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.timeline-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.timeline-title h4 {
  font-size: 16px;
  font-weight: bold;
  color: #1a4b91;
}

.timeline-content p {
  margin-bottom: 15px;
  color: #333333;
  line-height: 1.6;
}

.timeline-meta {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #666666;
}

.timeline-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.view-detail {
  color: #1a4b91;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.view-detail:hover {
  color: #f5222d;
}

/* 右侧资源区域 */
.resources-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.resource-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 关键人物样式 */
.key-personnel {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.personnel-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.personnel-avatar {
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

.personnel-info {
  flex: 1;
}

.personnel-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.personnel-role {
  font-size: 12px;
  color: #666666;
  margin-bottom: 5px;
}

.personnel-stats {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #666666;
}

/* 相关部门样式 */
.departments {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.department-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.department-item.primary {
  background-color: rgba(26, 75, 145, 0.1);
}

.department-name {
  font-weight: bold;
}

.department-role {
  font-size: 12px;
  color: #666666;
}

/* 关联图谱样式 */
.graph-container {
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 相关文档样式 */
.documents {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-radius: 4px;
  background-color: #f5f5f5;
  text-decoration: none;
  color: #333333;
  transition: all 0.3s;
}

.document-item:hover {
  background-color: rgba(26, 75, 145, 0.1);
}

.document-info {
  flex: 1;
}

.document-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.document-meta {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #666666;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .main-content {
    padding: 20px;
  }

  .timeline-content-layout {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .topic-header {
    flex-direction: column;
    gap: 20px;
  }

  .topic-actions {
    width: 100%;
    justify-content: space-between;
  }

  .topic-meta {
    flex-direction: column;
    gap: 10px;
  }

  .timeline-item {
    padding-left: 20px;
  }
}

@media (max-width: 576px) {
  .header {
    padding: 10px 20px;
  }

  .nav-links {
    display: none;
  }

  .topic-title-section h1 {
    font-size: 24px;
  }
}
</style>
