import { VIEWPORTWIDTH } from '~/common/constants'

export function pxToVw(px: number) {
  return `${((px / Number(VIEWPORTWIDTH ?? 375)) * 100).toFixed(3)}vw`
}
