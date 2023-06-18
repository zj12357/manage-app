export const rechargeType: Record<number, string> = {
  0: '银联充值',
  1: '后台添加金额类型',
  2: '后台减少金额',
  3: '赠送彩金',
  4: 'USDT充值',
}

export const rechargeStatusType: Record<number, string> = {
  1: '充值成功',
  2: '充值失败',
  3: '等待付款',
}

export const billStatusType: Record<number, string> = {
  1: '认购',
  2: '存入',
  3: '匹配成功',
  4: '赎回',
  5: '赎回退回',
  6: '调整添加余额',
  7: '礼金赠送',
  8: '调整减少余额',
  9: '定期转出',
  12: '数字钱包',
}
