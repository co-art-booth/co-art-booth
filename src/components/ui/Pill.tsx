import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type PillTone = 'ok' | 'warn' | 'bad' | 'info' | 'neutral'

const TONE: Record<PillTone, { box: string; dot: string }> = {
  ok: { box: 'bg-ok-tint text-ok-text', dot: 'bg-ok' },
  warn: { box: 'bg-peach text-warn-text', dot: 'bg-orange' },
  bad: { box: 'bg-bad-tint text-bad-text', dot: 'bg-bad' },
  info: { box: 'bg-mist text-purple-deep', dot: 'bg-purple' },
  neutral: { box: 'bg-[#F1F2F6] text-ink-gray', dot: 'bg-ink-muted' },
}

export function Pill({ tone = 'info', children, className }: { tone?: PillTone; children: ReactNode; className?: string }) {
  const t = TONE[tone]
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-[11px] py-[5px] text-micro', t.box, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', t.dot)} />
      {children}
    </span>
  )
}
