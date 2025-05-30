import axios from 'axios'
import { message } from 'ant-design-vue'
import config from '@/config'
import { getToken, getSiteToken } from '@/utils/token'

// 创建两个 axios 实例，一个用于真实后端API，一个用于mock
const realService = axios.create({
    baseURL: config.api.baseURL,
    timeout: config.api.timeout,
    headers: config.api.headers
})

const mockService = axios.create({
    baseURL: config.api.mockURL,
    timeout: config.api.timeout,
    headers: config.api.headers
})

// 统一的响应处理函数
const handleResponse = (response) => {
    const res = response.data
    if (res.code !== 200) {
        message.error(res.message || '请求失败')
        return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res
}

// 统一的错误处理函数
const handleError = (error) => {
    console.error('响应错误:', error)
    message.error(error.message || '网络错误')
    return Promise.reject(error)
}

// 创建混合服务
const service = async (config) => {
    try {
        // 根据 URL 路径判断是普通 API 还是站点 API
        const isSiteApi = config.url.startsWith('/publish/');

        // 获取相应的 token
        const token = isSiteApi ? getSiteToken() : getToken();

        if (token) {
            // 合并 headers，保留用户自定义的 headers
            config.headers = {
                'Authorization': `Bearer ${token}`,
                ...config.headers  // 确保自定义 headers 能覆盖默认值
            }
        }

        // 使用 realService 发送请求
        const response = await realService(config)
        return handleResponse(response)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // 如果后端API返回404，则尝试访问mock
            try {
                const mockResponse = await mockService(config)
                return handleResponse(mockResponse)
            } catch (mockError) {
                return handleError(mockError)
            }
        }
        return handleError(error)
    }
}

// 为了兼容性，同时支持 request.get 等方法
const methods = ['get', 'post', 'put', 'delete', 'patch']
methods.forEach(method => {
    service[method] = (url, data, config = {}) => {
        return service({
            url,
            method,
            ...(method === 'get' ? { params: data } : { data }),
            ...config
        })
    }
})

export default service