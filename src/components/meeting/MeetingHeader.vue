<template>
  <div class="header">
    <div class="logo">
      <bank-outlined />
      会议纪要档案知识专题
    </div>
    <div class="nav-links">
      <router-link
        to="/meeting"
        :class="{ active: isActive('/meeting') }"
        exact
      >
        <file-text-outlined />
        首页
      </router-link>
      <router-link
        to="/meeting/search"
        :class="{ active: isActive('/meeting/search') }"
      >
        <search-outlined />
        搜索
      </router-link>
      <router-link
        to="/meeting/statistics"
        :class="{ active: isActive('/meeting/statistics') }"
      >
        <bar-chart-outlined />
        统计
      </router-link>
      <router-link
        to="/hub"
        :class="{ active: isActive('/hub') }"
      >
        <setting-outlined />
        返回总库
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {
  BankOutlined,
  FileTextOutlined,
  SearchOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'

const route = useRoute()

// 判断当前路由是否激活
const isActive = (path) => {
  if (path === '/meeting') {
    // 对于首页，需要精确匹配
    return route.path === '/meeting' || route.path === '/meeting/'
  }
  // 对于其他页面，使用 startsWith 来匹配子路由
  return route.path.startsWith(path)
}
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

.nav-links a:hover {
  background-color: rgba(26, 75, 145, 0.1);
  color: #1a4b91;
}

.nav-links a.active {
  background-color: #1a4b91;
  color: white;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .header {
    padding: 10px 20px;
  }

  .logo {
    font-size: 16px;
  }

  .nav-links {
    gap: 10px;
  }

  .nav-links a {
    padding: 6px 10px;
    font-size: 12px;
  }
}

@media (max-width: 576px) {
  .nav-links span {
    display: none;
  }

  .nav-links a {
    padding: 8px;
  }
}
</style>
