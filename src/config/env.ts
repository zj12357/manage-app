export const devMode = 'development'
export const prodMode = 'production'

/**
 * @description: 开发模式
 */
export function isDevMode(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * @description:生产模式
 */
export function isProdMode(): boolean {
  return process.env.NODE_ENV === 'production'
}
