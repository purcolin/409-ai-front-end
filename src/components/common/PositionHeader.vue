<template>
  <header class="position-header">
    <div class="header-container">
      <!-- Logo和标题 -->
      <div class="header-left">
        <router-link to="/hub" class="logo-link">
          <bank-outlined class="logo-icon" />
          <span class="logo-text">知识专题库</span>
        </router-link>
        <div class="header-title">
          <apartment-outlined />
          <span>岗位结构</span>
        </div>
      </div>


      <!-- 导航菜单 -->
      <div class="header-nav">
        <a-menu v-model:selectedKeys="currentMenu" mode="horizontal">
          <a-menu-item key="directory">
            <template #icon>
              <apartment-outlined />
            </template>
            <router-link to="/position">组织架构</router-link>
          </a-menu-item>
          <a-menu-item key="function">
            <template #icon>
              <branches-outlined />
            </template>
            <router-link to="/position/function">职能详情</router-link>
          </a-menu-item>
        </a-menu>
      </div>

      <!-- 用户信息 -->

    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import {
  BankOutlined,
  ApartmentOutlined,
  BranchesOutlined,
  TableOutlined,
  SearchOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'

const searchQuery = ref('')
const currentMenu = ref(['directory'])

const onSearch = (value) => {
  console.log('搜索:', value)
}
</script>

<style lang="less" scoped>
.position-header {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #1a4b91;
  font-size: 18px;
  font-weight: bold;
}

.logo-icon {
  font-size: 24px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #1a4b91;
  font-weight: 500;
}

.header-search {
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
}

.header-nav {
  flex: 1;
  max-width: 400px;
}

.header-user {
  margin-left: 20px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s;
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.user-icon {
  font-size: 16px;
}

.user-name {
  font-size: 14px;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .header-container {
    padding: 0 15px;
  }

  .header-search {
    display: none;
  }

  .header-nav {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .header-title {
    display: none;
  }

  .header-nav {
    display: none;
  }
}
</style>