import request from '@/utils/request'

export function getPublishToken(siteCode) {
  return request({
    url: '/publish/auth/token',
    method: 'get',
    params: { siteCode }
  })
}
