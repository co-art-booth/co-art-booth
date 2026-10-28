import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { TONE_BG, type Tone } from '@/lib/tone'

export function TaskRow({ n, tone = 'purple', text, right }: { n: number; tone?: Tone; text: string; right?: ReactNode }) {
  return (
    <div className="flex min-h-16 items-center gap-3.5 rounded-2xl border border-line bg-canvas py-3 pl-3.5 pr-4">
      <span className={cn('grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl text-h2 text-white', TONE_BG[tone])}>{n}</span>
      <span className="flex-1 text-body font-medium">{text}</span>
      {right}
      <ChevronRight size={16} className="text-ink-muted" />
    </div>
  )
}
