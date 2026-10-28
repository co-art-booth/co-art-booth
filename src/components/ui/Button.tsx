import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-cta text-navy shadow-glow-orange hover:bg-cta-hover active:bg-cta-press active:shadow-none',
  secondary: 'border border-line-strong bg-white text-purple-deep hover:border-purple hover:bg-mist active:bg-[#E3DCFF]',
  ghost: 'bg-mist text-purple-deep hover:bg-[#E3DCFF] active:bg-[#D6CCFF]',
  danger: 'bg-g-red text-white hover:brightness-110 active:brightness-90',
}
const SIZE = { sm: 'h-[34px] rounded-[10px] px-3.5', md: 'h-11 rounded-xl px-5', lg: 'h-14 rounded-2xl px-7' }
const DISABLED =
  'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-[#ECEAF5] disabled:bg-none disabled:text-ink-muted disabled:shadow-none'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: keyof typeof SIZE
  icon?: LucideIcon
  iconRight?: LucideIcon
  to?: string
  block?: boolean
  children?: ReactNode
}

export function Button({ variant = 'primary', size = 'md', icon: Icon, iconRight: IconRight, to, block, className, children, ...rest }: Props) {
  const cls = cn('inline-flex items-center justify-center gap-2 text-[13px] font-semibold transition-all', VARIANT[variant], SIZE[size], DISABLED, block && 'w-full', className)
  const content = (
    <>
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      {children}
      {IconRight && <IconRight size={16} />}
    </>
  )
  if (to) return <Link to={to} className={cls}>{content}</Link>
  return <button type="button" className={cls} {...rest}>{content}</button>
}
