// 获取环境变量，带默认值
const getEnvValue = (key, defaultValue) => {
  return import.meta.env[key] || defaultValue
}

// 获取当前环境
const getEnv = () => {
  return import.meta.env.MODE || 'development'
}

const isDev = getEnv() === 'development'
const isProd = getEnv() === 'production'
const isTest = getEnv() === 'test'

// 获取API基础URL
const getBaseApiUrl = () => {
  return getEnvValue('VITE_API_BASE_URL', '/api')
}

// 获取后端API URL
const getBackendUrl = () => {
  return getEnvValue('VITE_API_BACKEND_URL', 'http://localhost:9856')
}

// 导出环境变量工具函数，方便在其他地方使用
export const envUtils = {
  getEnvValue,
  getEnv,
  isDev,
  isProd,
  isTest,
  getBaseApiUrl,
  getBackendUrl
}

export default {
  // 项目基础配置
  project: {
    name: getEnvValue('VITE_APP_NAME', 'AIKG企业文档知识展示平台'),
    version: getEnvValue('VITE_APP_VERSION', '1.0.0'),
  },

  // 服务器配置
  server: {
    host: getEnvValue('VITE_SERVER_HOST', 'localhost'),
    port: parseInt(getEnvValue('VITE_SERVER_PORT', 3000)),
    baseURL: getEnvValue('VITE_SERVER_BASE_URL', 'http://localhost:3000')
  },

  // API配置
  api: {
    backendURL: getBackendUrl(),
    baseURL: getBaseApiUrl(),
    timeout: parseInt(getEnvValue('VITE_API_TIMEOUT', 600000)),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}