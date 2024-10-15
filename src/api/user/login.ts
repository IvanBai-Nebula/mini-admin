import request from '@/utils/request'

export function postAdminLogin({ username, password }) {
  return request.post('admin/login', { username, password })
}
export function postAdminRegister({ username, password, email, captcha }) {
  return request.post('admin/register', { username, password, email, captcha })
}
