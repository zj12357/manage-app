import { cryptoDecrypt, cryptoEncrypt, isObject } from '../tools'
import type { StorageConfig, StorageType, StorageValue } from './types'
import { isDevMode } from '~/config/env'
import { CRYPTO_STORAGE_KEY } from '~/common/constants'

// 类型 window.localStorage,window.sessionStorage,
let config: StorageConfig = {
  prefix: 'app', // 名称前缀：项目名 + 项目版本
  expire: 60 * 60 * 24, // 过期时间 单位：秒,默认1天,页面没有任何操作就会过期
  isEncrypt: !isDevMode(), // 默认加密 为了调试方便, 开发过程中可以不加密
}

// 根据请求配置替换默认config
export function setStorageConfig(info: StorageConfig) {
  config = { ...config, ...info }
}

// 判断是否支持 Storage
export function isSupportStorage() {
  return typeof Storage !== 'undefined'
}

// 设置 setStorage
export function setStorage<T>(key: string,
  value: StorageValue<T>,
  expire = 0,
  type: StorageType = 'localStorage') {
  if (typeof window !== 'undefined') {
    if (value === null || value === undefined)
      value = null

    if (Number.isNaN(expire) || expire < 0)
      throw new Error('Expire 必须是数字')

    expire = (expire || config.expire) * 1000
    const data = {
      value, // 存储值
      time: Date.now(), // 存值时间戳
      expire, // 过期时间
    }

    const encryptString = config.isEncrypt
      ? encrypt(JSON.stringify(data))
      : JSON.stringify(data)

    window[type].setItem(autoAddPrefix(key), encryptString)
  }
}

// 获取 getStorage
export function getStorage<T>(key: string,
  type: StorageType = 'localStorage'): StorageValue<T> {
  if (typeof window !== 'undefined') {
    key = autoAddPrefix(key)
    // key 不存在判断
    if (
      !window[type].getItem(key)
            || JSON.stringify(window[type].getItem(key)) === 'null'
    )
      return null

    // 优化 持续使用中续期
    const storage = config.isEncrypt
      ? JSON.parse(decrypt(window[type].getItem(key) || ''))
      : JSON.parse(window[type].getItem(key) || '')

    const nowTime = Date.now()

    // 过期删除
    if (storage.expire < nowTime - storage.time) {
      removeStorage(key)
      return null
    }
    else {
      // 未过期期间被调用 则自动续期 进行保活
      setStorage(autoRemovePrefix(key), storage.value)
      return storage.value
    }
  }
}

// 是否存在 hasStorage
export function hasStorage(key: string): boolean {
  key = autoAddPrefix(key)
  const arr = getStorageAll()?.filter((item) => {
    return item.key === key
  })
  return !!arr?.length
}

// 获取所有key
export function getStorageKeys(): (string | null)[] {
  const items = getStorageAll() ?? []
  const keys = []
  for (let index = 0; index < items?.length; index++)
    keys.push(items[index].key)

  return keys
}

// 根据索引获取key
export function getStorageForIndex(index: number,
  type: StorageType = 'localStorage') {
  if (typeof window !== 'undefined')
    return window[type].key(index)
}

// 获取localStorage长度
export function getStorageLength(type: StorageType = 'localStorage') {
  if (typeof window !== 'undefined')
    return window[type].length
}

// 获取全部 getAllStorage
export function getStorageAll(type: StorageType = 'localStorage') {
  if (typeof window !== 'undefined') {
    const len = window[type].length // 获取长度
    const arr = [] // 定义数据集
    for (let i = 0; i < len; i++) {
      // 获取key 索引从0开始
      const getKey = window[type].key(i) || ''
      // 获取key对应的值
      const getVal = window[type].getItem(getKey)
      // 放进数组
      arr[i] = { key: getKey, val: getVal }
    }
    return arr
  }
}

// 删除 removeStorage
export function removeStorage(key: string,
  type: StorageType = 'localStorage') {
  if (typeof window !== 'undefined')
    window[type].removeItem(autoAddPrefix(key))
}

// 清空 clearStorage
export function clearStorage(type: StorageType = 'localStorage') {
  if (typeof window !== 'undefined')
    window[type].clear()
}

// 名称前自动添加前缀
function autoAddPrefix(key: string): string {
  const prefix = config.prefix ? `${config.prefix}_` : ''
  return prefix + key
}

// 移除已添加的前缀
function autoRemovePrefix(key: string) {
  const len = config.prefix ? config.prefix.length + 1 : 0
  return key.substring(len)
}

/** SessionStorage */

export function setSessionStorage<T>(key: string,
  value: StorageValue<T>,
  expire = 0) {
  return setStorage<T>(key, value, expire, 'sessionStorage')
}

export function getSessionStorage<T>(key: string): StorageValue<T> {
  return getStorage<T>(key, 'sessionStorage')
}

export function getSessionStorageForIndex(index: number) {
  return getStorageForIndex(index, 'sessionStorage')
}

export function getSessionStorageLength() {
  return getStorageLength('sessionStorage')
}

export function getSessionStorageAll() {
  return getStorageAll('sessionStorage')
}

export function removeSessionStorage(key: string) {
  return removeStorage(key, 'sessionStorage')
}

export function clearSessionStorage() {
  return clearStorage('sessionStorage')
}

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
function encrypt(data: string): string {
  if (isObject(data)) {
    try {
      data = JSON.stringify(data)
    }
    catch (error) {
      console.error('encrypt error:', error)
    }
  }
  return cryptoEncrypt(data, CRYPTO_STORAGE_KEY ?? 'mWpKgdkONewbRAtC')
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
function decrypt(data: string): string {
  return cryptoDecrypt(data, CRYPTO_STORAGE_KEY ?? 'mWpKgdkONewbRAtC')
}
