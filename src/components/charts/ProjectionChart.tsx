import { smoothPath } from './AreaChart'

interface Props { actual: number[]; projected: number[]; width?: number; height?: number }

/** Solid line = actual, dashed pink line + soft band = forecast. Values are 0..1. */
export function ProjectionChart({ actual, projected, width = 360, height = 150 }: Props) {
  const total = actual.length + projected.length - 1
  const X = (i: number) => 4 + (i * (width - 8)) / (total - 1)
  const Y = (v: number) => height - 14 - v * (height - 30)
  const A = actual.map((v, i) => [X(i), Y(v)])
  const B = projected.map((v, i) => [X(i + actual.length - 1), Y(v)])
  const band = B.map((p) => `${p[0]} ${p[1] - 14}`).join(' L') + ' L' + [...B].reverse().map((p) => `${p[0]} ${p[1] + 14}`).join(' L')
  const split = X(actual.length - 1)
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="ยอดจริงและยอดคาดการณ์">
      <line x1={split} x2={split} y1="0" y2={height - 10} stroke="#DDD5FF" strokeDasharray="4 4" />
      <path d={`M${band} Z`} fill="#F062C0" opacity=".16" />
      <path d={smoothPath(A)} fill="none" stroke="#7C5CFF" strokeWidth="3" strokeLinecap="round" />
      <path d={smoothPath(B)} fill="none" stroke="#F062C0" strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" />
      <circle cx={split} cy={A[A.length - 1][1]} r="5" fill="#fff" stroke="#7C5CFF" strokeWidth="2.5" />
    </svg>
  )
}
