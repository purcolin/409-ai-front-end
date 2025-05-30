import request from '@/utils/request'

export function listTenants(query) {
  return request({
    url: '/tenant/list',
    method: 'get',
    params: query
  })
}

export function pageTenants(query) {
  return request({
    url: '/tenant/page',
    method: 'get',
    params: query
  })
}

export function createTenant(data) {
  return request({
    url: '/tenant/create',
    method: 'post',
    data: data
  })
}

export function updateTenant(data) {
  return request({
    url: '/tenant/update',
    method: 'put',
    data: data
  })
}

export function deleteTenantById(tenantId) {
  return request({
    url: '/tenant/delete-by-id',
    method: 'delete',
    data: tenantId
  })
}