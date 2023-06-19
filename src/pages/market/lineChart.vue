<script setup lang="ts">
import dayjs from 'dayjs'
import echarts from '~/utils/charts'

interface IData {
  labels: string[]
  values: number[]
}

function generateData() {
  const data: IData = {
    labels: [],
    values: [],
  }
  for (let i = 0; i < 30; i++) {
    const item = dayjs().subtract(i, 'day')
    const value = Math.random() * 5000 + 5000
    data.labels.unshift(`${dayjs(item).date()}日`)
    data.values.unshift(value)
  }
  return data
}
const chartData = generateData()
function initChart() {
  const chartDom = document.getElementById('container')
  const myChart = chartDom && echarts.init(chartDom)
  // #ffc58c   #ffeee2
  const option = {
    dataZoom: [{
      type: 'inside', // 1平移 缩放
      throttle: '50', // 设置触发视图刷新的频率。单位为毫秒（ms）。
      minValueSpan: 6, // 用于限制窗口大小的最小值,在类目轴上可以设置为 5 表示 5 个类目
      start: 50, // 数据窗口范围的起始百分比 范围是：0 ~ 100。表示 0% ~ 100%。
      end: 100, // 数据窗口范围的结束百分比。范围是：0 ~ 100。
      zoomLock: true, // 如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
    }],
    grid: {
      left: 0,
      right: 0,
      bottom: '10%',
    },
    xAxis: {
      type: 'category',
      data: chartData.labels,

    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#6DCBA2', // 坐标轴线线的颜色。
        },
      },
    },
    series: [
      {
        data: chartData.values,
        type: 'line',
        symbol: 'none',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#a5dfc6', // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(165,223,198,0.5)', // 100% 处的颜色
            }],
            global: false, // 缺省为 false
          },
        },
        lineStyle: {
          color: '#6DCBA2',
        },
      },
    ],
  }

  option && myChart && myChart.setOption(option)
}
onMounted(() => {
  initChart()
})
</script>

<template>
  <div class="w-full">
    <div id="container" class="h-[235px] w-full"></div>
  </div>
</template>

<style scoped></style>
