import { useId } from 'react'
import { cn } from '@/lib/cn'

/** Catmull-Rom -> cubic Bezier path through the given points. */
export function smoothPath(pts: number[][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`
  }
  return d
}

interface Props { values: number[]; color?: string; width?: number; height?: number; grid?: boolean; strokeWidth?: number; className?: string; label?: string }

/** values are 0..1 */
export function AreaChart({ values, color = '#7C5CFF', width = 640, height = 140, grid, strokeWidth = 2.5, className, label = 'กราฟแนวโน้ม' }: Props) {
  const id = useId().replace(/:/g, '')
  const pts = values.map((v, i) => [(i / (values.length - 1)) * (width - 8) + 4, height - 4 - v * (height - 12)])
  const d = smoothPath(pts)
  const last = pts[pts.length - 1]
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn('h-auto w-full', className)} role="img" aria-label={label}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid && [0, 1, 2, 3].map((i) => {
        const y = 4 + (i * (height - 8)) / 3
        return <line key={i} x1="0" x2={width} y1={y} y2={y} stroke="#EBE7FB" strokeWidth="1" strokeDasharray={i < 3 ? '4 4' : undefined} />
      })}
      <path d={`${d} L${last[0]} ${height} L${pts[0][0]} ${height} Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill="#fff" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export function Sparkline({ values, color, className }: { values: number[]; color: string; className?: string }) {
  return <AreaChart values={values} color={color} width={96} height={36} strokeWidth={2} className={className} label="แนวโน้มย่อ" />
}
