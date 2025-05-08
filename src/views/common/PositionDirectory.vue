<template>
  <div class="position-directory">
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
        <span>组织架构</span>
      </div>

      <div class="directory-container">
        <!-- 视图切换 -->
        <div class="view-switch">
          <a-radio-group v-model:value="currentView" button-style="solid">
            <a-radio-button value="org">
              <template #icon><apartment-outlined /></template>
              组织架构
            </a-radio-button>
            <a-radio-button value="function">
              <template #icon><branches-outlined /></template>
              职能结构
            </a-radio-button>
            <a-radio-button value="matrix">
              <template #icon><table-outlined /></template>
              矩阵视图
            </a-radio-button>
          </a-radio-group>
        </div>

        <!-- 组织架构视图 -->
        <div v-if="currentView === 'org'" class="org-chart-container">
          <div class="org-chart">
            <div class="org-node root">
              <div class="node-content">
                <div class="node-icon">总</div>
                <div class="node-info">
                  <div class="node-title">总经理办公室</div>
                  <div class="node-stats">
                    <span><team-outlined /> 5个部门</span>
                    <span><user-outlined /> 12个岗位</span>
                  </div>
                </div>
              </div>
              <div class="node-children">
                <div class="org-node">
                  <div class="node-content">
                    <div class="node-icon">技</div>
                    <div class="node-info">
                      <div class="node-title">技术中心</div>
                      <div class="node-stats">
                        <span><team-outlined /> 3个团队</span>
                        <span><user-outlined /> 8个岗位</span>
                      </div>
                    </div>
                  </div>
                  <div class="node-children">
                    <div class="org-node" v-for="team in techTeams" :key="team.id">
                      <div class="node-content">
                        <div class="node-icon">{{ team.name[0] }}</div>
                        <div class="node-info">
                          <div class="node-title">{{ team.name }}</div>
                          <div class="node-stats">
                            <span><user-outlined /> {{ team.positionCount }}个岗位</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="org-node">
                  <div class="node-content">
                    <div class="node-icon">产</div>
                    <div class="node-info">
                      <div class="node-title">产品中心</div>
                      <div class="node-stats">
                        <span><team-outlined /> 2个团队</span>
                        <span><user-outlined /> 6个岗位</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="org-node">
                  <div class="node-content">
                    <div class="node-icon">设</div>
                    <div class="node-info">
                      <div class="node-title">设计中心</div>
                      <div class="node-stats">
                        <span><team-outlined /> 2个团队</span>
                        <span><user-outlined /> 5个岗位</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 职能结构视图 -->
        <div v-if="currentView === 'function'" class="function-tree">
          <div class="tree-container">
            <div class="tree-node root">
              <div class="node-content">
                <div class="node-title">企业职能</div>
              </div>
              <div class="tree-branches">
                <div class="tree-branch" v-for="({ id, name, items }) in functions" :key="id">
                  <div class="branch-header">
                    <div class="branch-icon">{{ name[0] }}</div>
                    <div class="branch-title">{{ name }}</div>
                  </div>
                  <div class="branch-content">
                    <div class="function-item" v-for="({ id: itemId, name: itemName, description }) in items" :key="itemId">
                      <div class="item-icon">{{ itemName[0] }}</div>
                      <div class="item-info">
                        <div class="item-title">{{ itemName }}</div>
                        <div class="item-desc">{{ description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 矩阵视图 -->
        <div v-if="currentView === 'matrix'" class="matrix-view">
          <div class="matrix-container">
            <div class="matrix-header">
              <div class="header-cell">部门</div>
              <div class="header-cell">岗位</div>
              <div class="header-cell">职能</div>
              <div class="header-cell">关联度</div>
            </div>
            <div class="matrix-body">
              <div class="matrix-row" v-for="item in matrixData" :key="item.id">
                <div class="matrix-cell">{{ item.department }}</div>
                <div class="matrix-cell">{{ item.position }}</div>
                <div class="matrix-cell">{{ item.function }}</div>
                <div class="matrix-cell">
                  <a-progress :percent="item.relevance" :show-info="false" />
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
  UserOutlined,
  ApartmentOutlined,
  BranchesOutlined,
  TableOutlined
} from '@ant-design/icons-vue'

const currentView = ref('org')

// 技术中心团队数据
const techTeams = ref([
  { id: 1, name: '前端开发团队', positionCount: 4 },
  { id: 2, name: '后端开发团队', positionCount: 3 },
  { id: 3, name: '测试团队', positionCount: 2 }
])

// 职能结构数据
const functions = ref([
  {
    id: 1,
    name: '技术研发',
    items: [
      { id: 1, name: '前端开发', description: '负责用户界面开发与优化' },
      { id: 2, name: '后端开发', description: '负责系统架构与核心功能开发' },
      { id: 3, name: '测试', description: '负责质量保证与测试管理' }
    ]
  },
  {
    id: 2,
    name: '产品管理',
    items: [
      { id: 4, name: '产品规划', description: '负责产品战略与规划' },
      { id: 5, name: '需求分析', description: '负责需求收集与分析' },
      { id: 6, name: '项目管理', description: '负责项目进度与资源管理' }
    ]
  },
  {
    id: 3,
    name: '设计创新',
    items: [
      { id: 7, name: 'UI设计', description: '负责界面设计与交互优化' },
      { id: 8, name: 'UX设计', description: '负责用户体验研究与设计' }
    ]
  }
])

// 矩阵视图数据
const matrixData = ref([
  { id: 1, department: '技术中心', position: '前端开发工程师', function: '技术研发', relevance: 90 },
  { id: 2, department: '技术中心', position: '后端开发工程师', function: '技术研发', relevance: 95 },
  { id: 3, department: '产品中心', position: '产品经理', function: '产品管理', relevance: 85 },
  { id: 4, department: '设计中心', position: 'UI设计师', function: '设计创新', relevance: 80 }
])
</script>

<style lang="less" scoped>
.position-directory {
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

/* 视图切换 */
.view-switch {
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 组织架构图 */
.org-chart-container {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.org-chart {
  display: flex;
  justify-content: center;
}

.org-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 20px 0;
}

.org-node.root {
  margin-top: 0;
}

.node-content {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.node-content:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.node-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.node-info {
  flex: 1;
}

.node-title {
  font-size: 16px;
  font-weight: bold;
  color: #1a4b91;
  margin-bottom: 5px;
}

.node-stats {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #666;
}

.node-children {
  display: flex;
  gap: 30px;
  margin-top: 20px;
  position: relative;
}

.node-children::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  width: 2px;
  height: 20px;
  background: #e8e8e8;
}

/* 职能树 */
.function-tree {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tree-container {
  display: flex;
  justify-content: center;
}

.tree-node {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tree-branches {
  display: flex;
  gap: 30px;
  margin-top: 30px;
}

.tree-branch {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  min-width: 250px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.branch-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}

.branch-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #1a4b91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.branch-title {
  font-size: 16px;
  font-weight: bold;
  color: #1a4b91;
}

.function-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 4px;
  transition: all 0.3s;
}

.function-item:hover {
  background: rgba(26, 75, 145, 0.05);
}

.item-icon {
  width: 30px;
  height: 30px;
  border-radius: 6px;
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
  margin-bottom: 2px;
}

.item-desc {
  font-size: 12px;
  color: #666;
}

/* 矩阵视图 */
.matrix-view {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.matrix-container {
  display: flex;
  flex-direction: column;
}

.matrix-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1px;
  background: #e8e8e8;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
}

.header-cell {
  background: #1a4b91;
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: bold;
}

.matrix-body {
  display: flex;
  flex-direction: column;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-radius: 0 0 4px 4px;
}

.matrix-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1px;
  background: #e8e8e8;
}

.matrix-row:not(:last-child) {
  margin-bottom: 1px;
}

.matrix-cell {
  background: white;
  padding: 12px;
  text-align: center;
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
  .org-chart {
    flex-direction: column;
    align-items: center;
  }
  
  .node-children {
    flex-direction: column;
    align-items: center;
  }
  
  .tree-branches {
    flex-direction: column;
    align-items: center;
  }
  
  .matrix-header,
  .matrix-row {
    grid-template-columns: 1fr;
  }
}
</style> 