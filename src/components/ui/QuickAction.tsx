import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { IconChip } from './IconChip'

export function QuickAction({ to, label, desc, icon, primary }: { to: string; label: string; desc: string; icon: LucideIcon; primary?: boolean }) {
  return (
    <Link to={to} className={cn('flex h-[84px] items-center gap-3.5 rounded-card pl-[18px] pr-[22px] transition hover:-translate-y-0.5', primary ? 'bg-brand text-white shadow-glow-purple' : 'border border-line bg-white shadow-card')}>
      <IconChip icon={icon} size={46} tone={primary ? 'glass' : 'purple'} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-h2">{label}</span>
        <span className={cn('text-small', primary ? 'text-white/85' : 'text-ink-gray')}>{desc}</span>
      </span>
      <ArrowRight size={18} className={primary ? 'text-white' : 'text-purple'} />
    </Link>
  )
}
