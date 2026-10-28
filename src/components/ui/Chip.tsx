import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

const TONE = {
  purple: 'bg-mist text-purple-deep',
  pink: 'bg-blush text-pink-dark',
  peach: 'bg-peach text-warn-text',
  plain: 'bg-canvas text-purple-dark',
  dark: 'bg-navy text-white',
  red: 'bg-bad-tint text-bad-text',
} as const

export function Chip({ tone = 'purple', icon: Icon, children, className }: { tone?: keyof typeof TONE; icon?: LucideIcon; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-[9px] py-[5px] pl-2 pr-2.5 text-micro', TONE[tone], className)}>
      {Icon && <Icon size={13} />}
      {children}
    </span>
  )
}
