<template>
  <a-layout class="layout">
    <!-- <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="archive">
          <router-link to="/archive">
            <file-outlined />
            <span>会议纪要</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="awards">
          <router-link to="/awards">
            <trophy-outlined />
            <span>奖励荣誉</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="appointments">
          <router-link to="/appointments">
            <team-outlined />
            <span>职务任免</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider> -->
    <a-layout>
      <!-- <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header> -->
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileOutlined,
  TrophyOutlined,
  TeamOutlined
} from '@ant-design/icons-vue'

const collapsed = ref(false)
const selectedKeys = ref(['archive'])
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.trigger {
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style> 