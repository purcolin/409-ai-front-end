<template>
  <div class="header">
    <div class="logo">
      <bank-outlined />
      企业档案知识专题库-人物知识库
    </div>
    <div class="nav-links">
      <router-link to="/personnel">
        <home-outlined />
        首页
      </router-link>
      <router-link to="/person-statistics">
        <bar-chart-outlined />
        统计
      </router-link>
      <router-link to="/person-settings">
        <setting-outlined />
        设置
      </router-link>
    </div>
  </div>
</template>

<script setup>
import {
  BankOutlined,
  HomeOutlined,
  SearchOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
</script>

<style lang="less" scoped>
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
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: var(--text-color);
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
  background-color: var(--primary-color);
  color: white;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .header {
    padding: 15px 20px;
  }

  .nav-links {
    gap: 10px;
  }

  .nav-links a {
    padding: 8px;
  }

  .nav-links a span {
    display: none;
  }
}
</style> 