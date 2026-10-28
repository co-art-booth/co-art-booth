import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { TONE_BG, type Tone } from '@/lib/tone'

interface Props { icon: LucideIcon; tone?: Tone | 'glass'; size?: number; className?: string; glow?: boolean }

export function IconChip({ icon: Icon, tone = 'purple', size = 44, className, glow }: Props) {
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center text-white', tone === 'glass' ? 'bg-white/20' : TONE_BG[tone], glow && 'shadow-glow-purple', className)}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.32) }}
    >
      <Icon size={Math.round(size * 0.5)} />
    </span>
  )
}
