export const devMode = 'development'
export const prodMode = 'production'

/**
 * @description: 开发模式
 */
export function isDevMode(): boolean {
  return import.meta.env.MODE === 'development'
}

/**
 * @description:生产模式
 */
export function isProdMode(): boolean {
  return import.meta.env.MODE === 'production'
}
