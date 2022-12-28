import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

export function getCompanyInfo(companyid) {
  return request({
    url: `/company/${companyid}`,
    method: 'GET'
  })
}

export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}

export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role/',
    method: 'POST',
    data
  })
}

export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
