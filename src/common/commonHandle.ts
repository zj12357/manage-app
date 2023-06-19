export function handleMoneySymbol(val: string) {
  return +val > 0 ? `+${val}` : val
}
