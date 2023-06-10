import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      // 添加您需要使用的颜色
      white: '#fff',
      primary: '#ffa900',
      assist1: '#333',
      assist2: '#7e5400',
      assist3: '#222',
    },
    fontSize: {
      xs: '20px',
      lg: '18px',
      md: '16px',
      sm: '12px',
      base: '14px',
    },
  },
  shortcuts: [
    ['bg-base', 'bg-top bg-no-repeat bg-cover'],
    ['flex-center', 'flex justify-center items-center'],
    ['flex-between-center', 'flex items-center justify-between'],
    ['flex-col-center', 'flex flex-col justify-center items-center'],

  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: 'prose m-auto text-left'.split(' '),
})
