import type { InputHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type FieldState = 'normal' | 'warning' | 'error' | 'success'
const BORDER: Record<FieldState, string> = {
  normal: 'border-line-strong focus-within:border-purple focus-within:ring-4 focus-within:ring-purple/20',
  warning: 'border-orange',
  error: 'border-bad',
  success: 'border-ok',
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: LucideIcon
  right?: ReactNode
  helper?: string
  state?: FieldState
}

export function TextField({ label, icon: Icon, right, helper, state = 'normal', className, ...input }: Props) {
  return (
    <label className={cn('flex flex-col gap-2', className)}>
      <span className="text-body font-medium">{label}</span>
      <span className={cn('flex h-[52px] items-center gap-2.5 rounded-[14px] border bg-canvas px-4 transition', BORDER[state])}>
        {Icon && <Icon size={18} className="shrink-0 text-purple" />}
        <input className="min-w-0 flex-1 bg-transparent text-body outline-none placeholder:text-ink-muted" {...input} />
        {right}
      </span>
      {helper && <span className={cn('text-small', state === 'error' ? 'text-bad' : state === 'warning' ? 'text-warn-text' : state === 'success' ? 'text-ok-text' : 'text-ink-muted')}>{helper}</span>}
    </label>
  )
}
