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
      // 添加需要使用的颜色
      white: '#fff',
      primary: '#ffa900',
      assist1: '#333',
      assist2: '#7e5400',
      assist3: '#222',
      assist4: '#666',
      assist5: '#6c6c6c',
      assist6: '#5d5d5d',
    },
    fontSize: {
      xs: '20px',
      lg: '18px',
      md: '16px',
      sm: '12px',
      base: '14px',
    },
    boxShadow: {
      base: '0 4px 8px 4px rgba(0,0,0,0.06)',
    },
  },
  shortcuts: [
    ['bg-center-cover', 'bg-no-repeat bg-cover bg-center'],
    ['bg-top-cover', 'bg-top bg-no-repeat bg-cover'],
    ['flex-center', 'flex justify-center items-center'],
    ['flex-start-center', 'flex justify-start items-center'],
    ['flex-between-center', 'flex items-center justify-between'],
    ['flex-col-center', 'flex flex-col justify-center items-center'],
    ['flex-col-top-center', 'flex flex-col justify-start items-center'],
    ['flex-start-center-warp', 'flex  justify-start items-center  flex-wrap'],
    ['img-cover', 'w-full h-full object-cover'],
    ['text-nowrap-ellipsis', 'overflow-hidden whitespace-nowrap text-ellipsis'],
    ['text-wrap-ellipsis', 'overflow-hidden  text-ellipsis break-words break-all'],
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
