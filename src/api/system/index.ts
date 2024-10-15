import request from '@/utils/request'

export function getAdminList() {
  return request.post('admin/user_list')
}

export function getCustomerList() {
  return request.get('weixin/customer_list')
}

export function postAdminRegister({ username, password, email, captcha }) {
  return request.post('admin/register', { username, password, email, captcha })
}

export function getRoleList() {
  return request.get('admin/role_list')
}
