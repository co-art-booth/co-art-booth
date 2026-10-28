import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { TONE_HEX, type Tone } from '@/lib/tone'
import { IconChip } from './IconChip'
import { Sparkline } from '../charts/AreaChart'

interface Props { icon: LucideIcon; label: string; value: string; sub: string; tone?: Tone; hero?: boolean; spark?: number[] }

export function Metric({ icon, label, value, sub, tone = 'purple', hero, spark = [0.3, 0.5, 0.4, 0.7, 0.6, 0.9] }: Props) {
  return (
    <div className={cn('relative flex min-h-[132px] flex-col gap-1.5 overflow-hidden rounded-card p-5', hero ? 'bg-brand text-white shadow-glow-purple' : 'border border-line bg-white shadow-card')}>
      {hero && <span className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full bg-orange/40 blur-3xl" />}
      <div className="relative flex items-center gap-2.5">
        <IconChip icon={icon} size={34} tone={hero ? 'glass' : tone} />
        <span className={cn('text-body font-medium', hero ? 'text-white/90' : 'text-ink-gray')}>{label}</span>
      </div>
      <div className="relative text-[30px] font-bold leading-tight">{value}</div>
      <div className={cn('relative text-small', hero ? 'text-white/85' : 'text-ink-gray')}>{sub}</div>
      <Sparkline values={spark} color={hero ? '#ffffff' : TONE_HEX[tone]} className="absolute bottom-4 right-[18px] w-24" />
    </div>
  )
}
