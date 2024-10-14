import request from '@/utils/request.js'

export function postAdminLogin({ username, password }) {
  return request.post('admin/login', { username, password })
}
export function postAdminRegister({ username, password, email, captcha }) {
  return request.post('admin/register', { username, password, email, captcha })
}
export const getAdminProfile = () => request.get('admin/profile')
