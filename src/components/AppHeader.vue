<template>
  <div class="header">
    <div class="logo">
      <bank-outlined />
      会议纪要档案知识专题
    </div>
    <div class="nav-links">
      <router-link to="/archive" >
        <file-text-outlined />
        首页
      </router-link>
      <router-link to="/search">
        <search-outlined />
        搜索
      </router-link>
      <router-link to="/statistics" class="active">
        <bar-chart-outlined />
        统计
      </router-link>
      <router-link to="/settings">
        <setting-outlined />
        设置
      </router-link>
    </div>
  </div>
</template>

<script setup>
import {
  BankOutlined,
  FileTextOutlined,
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
</style> 