<template>
  <div class="app">
    <a-config-provider :locale="zhCN" :theme="theme">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ref } from 'vue'

// 定制主题色配置
const theme = ref({
  token: {
    // 品牌主色 - 紫色
    colorPrimary: '#1a4b91',
    // 成功色 - 绿色
    colorSuccess: '#52c41a',
    // 警告色 - 橙色
    colorWarning: '#faad14',
    // 错误色 - 红色
    colorError: '#ff4d4f',
    // 信息色 - 紫色
    colorInfo: '#1a4b91',
    // 边框圆角
    borderRadius: 4,
    // 线框风格按钮悬停时的背景颜色
    wireframe: true,
    // 派生颜色 - 浅紫色(辅助色)
    colorPrimaryBg: '#6E92C8',
    // 派生颜色 - 深紫色(辅助色)
    colorPrimaryBgHover: '#082B5E',
    // 边框颜色(较浅)
    colorBorder: '#d9d9d9'
  },
  components: {
    Button: {
      colorPrimary: '#722ed1',
      colorPrimaryHover: '#9254de',
      algorithm: true
    },
    Table: {
      colorPrimary: '#722ed1',
      borderRadius: 8,
      colorBgContainer: '#fff',
      fontWeightStrong: 600
    },
    Menu: {
      colorPrimary: '#722ed1',
      colorItemBg: 'transparent',
      colorItemText: 'rgba(0, 0, 0, 0.88)',
      colorItemTextHover: '#722ed1',
      colorItemTextSelected: '#722ed1',
      colorBgContainer: '#fff'
    },
    Card: {
      colorBgContainer: '#fff',
      borderRadius: 8,
      boxShadow: '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)'
    },
    Layout: {
      colorBgHeader: '#001529',
      colorBgBody: '#f0f2f5',
      colorBgSider: '#001529'
    },
    Select: {
      colorPrimary: '#722ed1',
      colorPrimaryHover: '#9254de'
    },
    Input: {
      activeBorderColor: '#722ed1',
      hoverBorderColor: '#9254de'
    },
    Tabs: {
      inkBarColor: '#722ed1',
      itemSelectedColor: '#722ed1',
      itemHoverColor: '#9254de'
    },
    Radio: {
      colorPrimary: '#722ed1'
    }
  }
})
</script>

<style>
.app {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
}

/* 全局 CSS 变量覆盖 */
:root {
  --ant-primary-color: #722ed1;
  --ant-primary-color-hover: #9254de;
  --ant-primary-color-active: #531dab;
  --ant-primary-color-outline: rgba(114, 46, 209, 0.2);
  --ant-primary-1: #f9f0ff;
  --ant-primary-2: #efdbff;
  --ant-primary-3: #d3adf7;
  --ant-primary-4: #b37feb;
  --ant-primary-5: #9254de;
  --ant-primary-6: #722ed1;
  --ant-primary-7: #531dab;
  --ant-primary-8: #391085;
  --ant-primary-9: #22075e;
  --ant-primary-10: #120338;
  --ant-success-color: #52c41a;
  --ant-warning-color: #faad14;
  --ant-error-color: #ff4d4f;
  --ant-font-size-base: 14px;
  --ant-border-radius-base: 4px;
}
</style>