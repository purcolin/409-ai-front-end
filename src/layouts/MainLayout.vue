<template>
  <div class="main-layout">
    <a-layout>
          <router-view />
    </a-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  FileTextOutlined,
  TrophyOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons-vue'

const route = useRoute()
const collapsed = ref(false)
const selectedKeys = ref([route.name])
</script>

<style lang="less" scoped>
.main-layout {
  height: 100vh;
  
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  .header {
    background: #fff;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
      
      &:hover {
        color: #1890ff;
      }
    }
    
    .user-info {
      padding-right: 24px;
    }
  }
  
  .content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }
}
</style> 