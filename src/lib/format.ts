export const baht = (n: number) => '฿' + Math.round(n).toLocaleString('en-US')
export const bahtFull = (n: number) =>
  '฿' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
