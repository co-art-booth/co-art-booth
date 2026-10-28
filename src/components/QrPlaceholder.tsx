/** Decorative QR-like pattern. Replace with a real PromptPay payload (e.g. `promptpay-qr` + `qrcode`) in phase 3. */
export function QrPlaceholder({ size = 156 }: { size?: number }) {
  const n = 25
  const c = size / n
  let seed = 7
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
  const cells: { x: number; y: number }[] = []
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if ((x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16)) continue
    if (rnd() > 0.52) cells.push({ x, y })
  }
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x * c} y={y * c} width={7 * c} height={7 * c} rx={c} fill="#0B0F4F" />
      <rect x={(x + 1) * c} y={(y + 1) * c} width={5 * c} height={5 * c} rx={c * 0.6} fill="#fff" />
      <rect x={(x + 2) * c} y={(y + 2) * c} width={3 * c} height={3 * c} rx={c * 0.5} fill="#0B0F4F" />
    </g>
  )
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="QR PromptPay (ตัวอย่าง)">
      <rect width={size} height={size} fill="#fff" />
      {finder(0, 0)}{finder(18, 0)}{finder(0, 18)}
      {cells.map((p) => <rect key={`${p.x}-${p.y}`} x={p.x * c} y={p.y * c} width={c - 0.6} height={c - 0.6} rx="1.2" fill="#0B0F4F" />)}
    </svg>
  )
}
