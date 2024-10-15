import CryptoJS from 'crypto-js'

const secretKey = '1a58dbee9d9b173057e8203288152d6f60566f9ef18c75aae6db17ddf1202fe882b1da3a610a02156e32b6613858716541cd7ecadbc85146e7c16c2504faf36c'

export function encrypt(password) {
  return CryptoJS.AES.encrypt(password, secretKey).toString()
}

export function decrypt(encryptedPassword) {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}
