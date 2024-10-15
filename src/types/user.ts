export interface LoginRecord {
  username: string
  password: string
}

export interface User {
  id: number
  username: string
  password: string
  email: string
  phone: string
}

export interface Register {
  username: string
  password: string
  email: string
  captcha: string
}
