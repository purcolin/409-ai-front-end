<template>
  <div class="position-detail">
    <!-- 顶部导航栏 -->
    <position-header />

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/hub">
          <home-outlined />
          专题库首页
        </router-link>
        <span class="separator">/</span>
        <router-link to="/position">
          组织架构
        </router-link>
        <span class="separator">/</span>
        <span>岗位详情</span>
      </div>

      <div class="position-container">
        <!-- 基本信息卡片 -->
        <div class="basic-info-card">
          <div class="card-header">
            <div class="position-icon">高</div>
            <div class="position-info">
              <h1>高级前端开发工程师</h1>
              <div class="position-tags">
                <span class="tag tag-type">技术岗</span>
                <span class="tag tag-level">高级</span>
                <span class="tag tag-status">正常</span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="info-section">
              <div class="section-title">
                <team-outlined />
                <span>组织信息</span>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">所属部门</span>
                  <span class="value">技术中心</span>
                </div>
                <div class="info-item">
                  <span class="label">所属团队</span>
                  <span class="value">前端开发团队</span>
                </div>
                <div class="info-item">
                  <span class="label">直接上级</span>
                  <span class="value">技术总监</span>
                </div>
                <div class="info-item">
                  <span class="label">同级岗位</span>
                  <span class="value">3个</span>
                </div>
              </div>
            </div>
            <div class="info-section">
              <div class="section-title">
                <apartment-outlined />
                <span>职能关联</span>
              </div>
              <div class="function-chart">
                <div class="chart-item" v-for="(item, index) in functionData" :key="index">
                  <div class="chart-label">{{ item.name }}</div>
                  <a-progress :percent="item.value" :show-info="false" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 职能结构卡片 -->
        <div class="function-structure-card">
          <div class="card-header">
            <branches-outlined />
            <span>职能结构</span>
          </div>
          <div class="card-content">
            <div class="structure-tree">
              <div class="tree-node root">
                <div class="node-content">
                  <div class="node-title">技术研发</div>
                  <div class="node-desc">负责技术研发相关工作</div>
                </div>
                <div class="tree-branches">
                  <div class="tree-branch" v-for="branch in structureData" :key="branch.id">
                    <div class="branch-header">
                      <div class="branch-icon">{{ branch.name[0] }}</div>
                      <div class="branch-title">{{ branch.name }}</div>
                    </div>
                    <div class="branch-content">
                      <div class="function-item" v-for="item in branch.items" :key="item.id">
                        <div class="item-icon">{{ item.name[0] }}</div>
                        <div class="item-info">
                          <div class="item-title">{{ item.name }}</div>
                          <div class="item-desc">{{ item.description }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 协作关系卡片 -->
        <div class="collaboration-card">
          <div class="card-header">
            <team-outlined />
            <span>协作关系</span>
          </div>
          <div class="card-content">
            <div class="collaboration-graph">
              <div class="graph-node center">
                <div class="node-content">
                  <div class="node-icon">高</div>
                  <div class="node-title">高级前端开发工程师</div>
                </div>
              </div>
              <div class="graph-connections">
                <div class="connection" v-for="(conn, index) in collaborationData" :key="index">
                  <div class="connection-node">
                    <div class="node-icon">{{ conn.name[0] }}</div>
                    <div class="node-title">{{ conn.name }}</div>
                  </div>
                  <div class="connection-line"></div>
                </div>
              </div>
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
import PositionHeader from '@/components/common/PositionHeader.vue'
import {
  BankOutlined,
  HomeOutlined,
  TeamOutlined,
  ApartmentOutlined,
  BranchesOutlined
} from '@ant-design/icons-vue'

// 职能数据
const functionData = ref([
  { name: '技术研发', value: 90 },
  { name: '产品设计', value: 60 },
  { name: '项目管理', value: 40 },
  { name: '团队管理', value: 30 }
])

// 结构数据
const structureData = ref([
  {
    id: 1,
    name: '前端开发',
    items: [
      { id: 1, name: '界面开发', description: '负责用户界面开发与优化' },
      { id: 2, name: '性能优化', description: '负责前端性能优化' },
      { id: 3, name: '组件开发', description: '负责通用组件开发' }
    ]
  },
  {
    id: 2,
    name: '技术架构',
    items: [
      { id: 4, name: '架构设计', description: '负责技术架构设计' },
      { id: 5, name: '技术选型', description: '负责技术栈选型' },
      { id: 6, name: '规范制定', description: '负责技术规范制定' }
    ]
  }
])

// 协作关系数据
const collaborationData = ref([
  { name: '产品经理', type: '业务' },
  { name: 'UI设计师', type: '设计' },
  { name: '后端开发', type: '技术' },
  { name: '测试工程师', type: '技术' }
])
</script>

<style lang="less" scoped>
.position-detail {
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
  background: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
  color: #d9d9d9;
}

/* 岗位容器 */
.position-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* 基本信息卡片 */
.basic-info-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  grid-column: 1 / -1;
  transition: all 0.3s;
}

.basic-info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.card-header {
  background: linear-gradient(135deg, #1a4b91 0%, #2c6cb0 100%);
  color: white;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.position-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: white;
  color: #1a4b91;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.position-info {
  flex: 1;
}

.position-info h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
  color: white;
}

.position-tags {
  display: flex;
  gap: 12px;
}

.tag {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s;
}

.tag:hover {
  transform: translateY(-1px);
}

.tag-type {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.tag-level {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.tag-status {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.card-content {
  padding: 24px;
}

.info-section {
  margin-bottom: 24px;
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: white;
  border-radius: 6px;
  transition: all 0.3s;
}

.info-item:hover {
  background: #f0f7ff;
  transform: translateX(4px);
}

.label {
  font-size: 12px;
  color: #666;
}

.value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.function-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: white;
  border-radius: 6px;
  transition: all 0.3s;
}

.chart-item:hover {
  background: #f0f7ff;
}

.chart-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

/* 职能结构卡片 */
.function-structure-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.function-structure-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.structure-tree {
  padding: 24px;
}

.tree-node {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-content {
  text-align: center;
  margin-bottom: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
}

.node-title {
  font-size: 18px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 8px;
}

.node-desc {
  font-size: 14px;
  color: #666;
}

.tree-branches {
  display: flex;
  gap: 24px;
}

.tree-branch {
  flex: 1;
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s;
}

.tree-branch:hover {
  background: #f0f7ff;
  transform: translateY(-2px);
}

.branch-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.branch-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
}

.branch-title {
  font-size: 16px;
  font-weight: bold;
  color: #1a4b91;
}

.function-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  transition: all 0.3s;
  margin-bottom: 8px;
}

.function-item:hover {
  background: white;
  transform: translateX(4px);
}

.item-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(26, 75, 145, 0.1);
  color: #1a4b91;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.item-desc {
  font-size: 12px;
  color: #666;
}

/* 协作关系卡片 */
.collaboration-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.collaboration-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.collaboration-graph {
  padding: 30px;
  position: relative;
  min-height: 400px;
  background: #fafafa;
  border-radius: 8px;
  margin: 20px;
}

.graph-node {
  position: absolute;
  text-align: center;
}

.graph-node.center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.node-content {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.node-content:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.node-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  margin: 0 auto 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.node-title {
  font-size: 14px;
  font-weight: bold;
  color: #1a4b91;
}

.graph-connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.connection {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
}

.connection-node {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.connection-node:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.connection-line {
  width: 60px;
  height: 2px;
  background: #e8e8e8;
  position: relative;
}

.connection-line::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1a4b91;
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
  .position-container {
    grid-template-columns: 1fr;
  }
  
  .tree-branches {
    flex-direction: column;
  }
  
  .collaboration-graph {
    min-height: 600px;
  }
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
  }
  
  .position-tags {
    justify-content: center;
  }
  
  .position-icon {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
}
</style> 