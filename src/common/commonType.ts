export const rechargeType: Record<number, string> = {
  0: '銀聯充值',
  1: '添加金额',
  2: '减少金额',
  3: '減少金額',
  4: 'USDT充值',
}

export const rechargeStatusType: Record<number, string> = {
  1: '充值成功',
  2: '充值失敗',
  3: '等待付款',
}

export const withdrawStatusType: Record<number, string> = {
  1: '贖回成功',
  2: '贖回失敗',
  3: '申請中',
}

export const billStatusType: Record<number, string> = {
  1: '認購',
  2: '存入',
  3: '匹配成功',
  4: '贖回',
  5: '贖回退回',
  6: '調整添加餘額',
  7: '禮金贈送',
  8: '調整減少餘額',
  9: '定期轉入15天',
  10: '定期轉出',
  11: '定期轉入30天',
  12: '數字錢包',
}

export const terminalStatusType: Record<number, string> = {
  1: '凍結中',
  2: '已完成',
  3: '已贖回',
}

export const roomType: Record<number, string> = {
  5: '普通廳',
  4: '貴賓廳',
  3: 'VIP廳',
  2: '鑽石廳',
}

export const tradeStatusType: Record<number, string> = {
  1: '匹配成功',
  2: '匹配失敗',
  3: '匹配中',
}
