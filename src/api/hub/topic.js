import request from '@/utils/request'

// 专题列表（分页）
export function fetchFrontendTopicList(query) {
  return request({
    url: '/system/frontend-topic/page',
    method: 'get',
    params: query
  })
}

// 获取所有专题列表（不分页）
export function fetchAllFrontendTopics() {
  return request({
    url: '/system/frontend-topic/list',
    method: 'get'
  })
}

// 获取专题详情
export function getFrontendTopic(id) {
  return request({
    url: `/system/frontend-topic/${id}`,
    method: 'get'
  })
}

// 新增专题
export function createFrontendTopic(data) {
  return request({
    url: '/system/frontend-topic',
    method: 'post',
    data
  })
}

// 更新专题
export function updateFrontendTopic(data) {
  return request({
    url: '/system/frontend-topic',
    method: 'put',
    data
  })
}

// 删除专题
export function deleteFrontendTopic(id) {
  return request({
    url: `/system/frontend-topic/${id}`,
    method: 'delete'
  })
}